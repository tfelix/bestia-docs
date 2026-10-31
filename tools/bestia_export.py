#!/usr/bin/env python3
"""Writes the bestia data of these docs into a bestia-behemoth checkout.

    python3 tools/bestia_export.py skills <bestia-behemoth>
    python3 tools/bestia_export.py mobs <bestia-behemoth>

`skills` turns every bestia attack of data/attacks.yaml into a row of zone-server's skills.yml, between the
generated-block markers. The numbers come from the archetypes in data/bestia_blueprint.yaml, so the server
casts what the Bestia Blueprint calculator balanced against.

`mobs` runs the calculator (static/js/bestia-blueprint-core.js, needs node) on every species of
data/bestias.yaml and writes its mob YAML, the GM bestia's learnset, and the placeholder look into the client's
bestia .tres. Run `./gradlew :zone-server:syncBestiaDb` before it, so every .tres exists.
"""
import json
import re
import subprocess
import sys
from pathlib import Path

import yaml

DOCS = Path(__file__).resolve().parent.parent
SKILLS_YML = "zone-server/src/main/resources/skills.yml"
BEGIN = "  # BEGIN generated from bestia-docs data/attacks.yaml by tools/bestia_export.py - do not edit by hand\n"
END = "  # END generated bestia skills\n"

SCRIPT_BY_ARCHETYPE = {
    "strike": "BestiaPhysicalSkill",
    "power_strike": "BestiaPhysicalSkill",
    "shot": "BestiaPhysicalSkill",
    "bolt": "BestiaMagicSkill",
    "ultimate": "BestiaMagicSkill",
    "aoe": "BestiaAreaSkill",
    "dot": "BestiaDotSkill",
    "heal": "BestiaHealSkill",
    "buff": "BestiaBuffSkill",
    "debuff": "BestiaDebuffSkill",
}
TARGET_BY_KIND = {"heal": "FRIENDLY", "buff": "FRIENDLY"}
AOE_RADIUS = {"aoe": 2.0, "dot": 1.0}
# A utility skill aimed at the ground reaches as far as a bolt; one aimed at a friend as far as a heal would.
UTILITY_RANGE = {"GROUND": 6, "FRIENDLY": 5}


def load(name):
    with open(DOCS / "data" / name) as f:
        return yaml.safe_load(f)


def plain_text(markdown):
    """skills.yml text ends up in the client, which knows no markdown links or code spans."""
    text = re.sub(r"\[([^\]]+)\]\([^)]*\)", r"\1", markdown)
    return text.replace("`", "").strip()


def attack_row(attack, archetypes):
    archetype = archetypes[attack["archetype"]]
    target = "AOE_GROUND" if attack["archetype"] in AOE_RADIUS else TARGET_BY_KIND.get(archetype["kind"], "ENEMY")
    row = {
        "id": attack["skillId"],
        "identifier": attack["skill"],
        "name": attack["name"],
        "script": SCRIPT_BY_ARCHETYPE[attack["archetype"]],
        "archetype": attack["archetype"].upper(),
        "element": attack["element"],
        "power": archetype.get("coef", 1.0),
        "cooldown": archetype["cooldown"],
        "castTime": archetype["castTime"],
        "targetType": target,
        "range": archetype["range"],
        "needsLineOfSight": archetype["range"] > 1,
        "manaCost": attack["mana"],
    }
    if target == "AOE_GROUND":
        row["aoeRadius"] = AOE_RADIUS[attack["archetype"]]
    return row


def utility_row(attack):
    target = attack.get("target", "FRIENDLY")
    row = {
        "id": attack["skillId"],
        "identifier": attack["skill"],
        "name": attack["name"],
        "script": attack["script"],
        "archetype": "UTILITY",
        "cooldown": attack["cooldown"],
        "targetType": target,
        "range": UTILITY_RANGE[target],
        "manaCost": attack["mana"],
    }
    if "status" in attack:
        row["status"] = attack["status"]
    if "yields" in attack:
        row["yields"] = attack["yields"]
    if "lines" in attack:
        row["lines"] = attack["lines"]
    return row


def skill_rows():
    archetypes = {a["id"]: a for a in load("bestia_blueprint.yaml")["archetypes"]}
    rows = []
    for attack in load("attacks.yaml"):
        # Ember keeps its own hand-written row and script.
        if attack.get("bestia") is False or attack["id"] == "ember":
            continue
        row = utility_row(attack) if attack["archetype"] == "utility" else attack_row(attack, archetypes)
        row["description"] = plain_text(attack["description"])
        rows.append(row)
    return sorted(rows, key=lambda r: r["id"])


def render_row(row):
    text = yaml.safe_dump([row], sort_keys=False, allow_unicode=True, width=110, default_style=None)
    return "".join("  " + line + "\n" for line in text.splitlines()) + "\n"


def write_block(path, rows):
    content = path.read_text()
    block = BEGIN + "".join(render_row(r) for r in rows) + END
    if BEGIN in content:
        start = content.index(BEGIN)
        end = content.index(END) + len(END)
        content = content[:start] + block + content[end:]
    else:
        # First run: right before the guild skills, after the hand-written bestia rows.
        anchor = "\n# GUILD SKILLS"
        at = content.index(anchor)
        content = content[:at] + "\n" + block + content[at:]
    path.write_text(content)


MOB_DIR = "zone-server/src/main/resources/mob"
TRES_DIR = "bestia-client/src/Game/Bestia/DB"
CALCULATOR = DOCS / "static" / "js" / "bestia-blueprint-core.js"

# A rough comfort window per biome, in degrees Celsius. A species gets the widest window of its biomes; the
# spawner only thins a den outside it, it never empties one.
BIOME_TEMPERATURE = {
    "OCEAN": (-10, 35), "LAKE": (-10, 35), "ICE_SHEET": (-40, -5), "TUNDRA": (-30, 5), "TAIGA": (-25, 15),
    "COLD_DESERT": (-20, 20), "ALPINE": (-25, 12), "TEMPERATE_FOREST": (-5, 28), "TEMPERATE_RAINFOREST": (-2, 25),
    "GRASSLAND": (-5, 30), "DRYLAND": (0, 38), "DESERT": (8, 48), "TROPICAL_SEASONAL_FOREST": (15, 40),
    "TROPICAL_RAINFOREST": (18, 40), "BOG": (-10, 18), "SWAMP": (10, 38), "RIPARIAN": (-5, 40), "BEACH": (-5, 38),
    "BADLANDS": (0, 42), "VOLCANIC_FIELD": (5, 60), "GEOTHERMAL_BASIN": (0, 50),
}
SHAPE_BY_KIND = {
    "BEAST": "CAPSULE", "BIRD": "PRISM", "REPTILE": "CYLINDER", "AQUATIC": "TORUS", "INSECT": "BOX",
    "PLANT": "CYLINDER", "FORMLESS": "SPHERE", "ELEMENTAL": "BOX", "HUMANOID": "CAPSULE", "UNDEAD": "CAPSULE",
    "DEMON": "PRISM", "DRAGON": "PRISM",
}
# The client's BestiaResource.PlaceholderShape, in order.
SHAPES = ["SPHERE", "CAPSULE", "BOX", "CYLINDER", "PRISM", "TORUS"]
SCALE_BY_SIZE = {"SMALL": 0.6, "MEDIUM": 1.0, "BIG": 1.6}
BOSS_SCALE = 1.5
BOSS_GLOW = 0.6
SPAWN_WEIGHT_BY_TIER = {"critter": 100, "normal": 100, "elite": 30, "boss": 100}

NODE_BRIDGE = """
const core = require(process.argv[1]);
const { data, inputs } = JSON.parse(require('fs').readFileSync(0, 'utf8'));
const out = inputs.map((input) => {
  const bp = core.build(data, input);
  return {
    identifier: input.identifier, level: bp.level, elementLevel: bp.elementLevel, hp: bp.hp, mana: bp.mana,
    attributes: bp.attributes, attackPower: bp.attackPower, experience: bp.exp.experience,
    defaultAttack: bp.defaultAttack, warnings: bp.warnings,
    learnset: bp.learnset.map((a) => ({ slot: a.slot, level: a.level, skill: a.identifier, archetype: a.archetype })),
    active: bp.active.map((a) => a.slot),
  };
});
process.stdout.write(JSON.stringify(out));
"""


def calculator_data():
    data = load("bestia_blueprint.yaml")
    data["attacks"] = load("attacks.yaml")
    data["items"] = load("items.yaml")
    return data


def run_calculator(data, inputs):
    payload = json.dumps({"data": data, "inputs": inputs})
    result = subprocess.run(["node", "-e", NODE_BRIDGE, str(CALCULATOR)], input=payload, capture_output=True,
                            text=True, check=True)
    return {bp["identifier"]: bp for bp in json.loads(result.stdout)}


def temperature_of(habitat):
    if not habitat:
        return None
    lows, highs = zip(*(BIOME_TEMPERATURE[b] for b in habitat))
    return min(lows), max(highs)


def calculator_input(species, presets, active_slots=None):
    preset = presets[species["kind"]]
    temperature = temperature_of(species["habitat"])
    return {
        "identifier": species["identifier"], "name": species["name"], "description": species["description"],
        "kind": species["kind"], "level": species["level"], "tier": species["tier"], "role": species["role"],
        "element": species["element"], "size": species["size"], "ai": species["ai"],
        "habitat": species["habitat"], "equipSlots": preset["slots"], "armorTypes": preset["armorTypes"],
        "temperatureMin": temperature[0] if temperature else None,
        "temperatureMax": temperature[1] if temperature else None,
        "loot": species.get("loot", []), "activeSlots": active_slots,
    }


def edited_learnset(species, bp):
    """The role's learnset with this species' own changes. Slots in the YAML count from 1, the calculator's from 0."""
    edits = species.get("learnset", {})
    slot_levels = load("bestia_blueprint.yaml")["learnset"]["levels"]
    by_slot = {a["slot"]: dict(a) for a in bp["learnset"]}
    for slot in edits.get("drop", []):
        by_slot.pop(slot - 1, None)
    for change in edits.get("replace", []):
        slot = change["slot"] - 1
        by_slot[slot] = {"slot": slot, "level": slot_levels[slot], "skill": change["skill"], "archetype": "utility"}
    learned = sorted(by_slot.values(), key=lambda a: (a["level"], a["slot"]))
    for added in edits.get("add", []):
        learned.append({"slot": None, "level": added["level"], "skill": added["skill"], "archetype": "utility"})
    return sorted(learned, key=lambda a: a["level"])


def active_slots(species, learned, tiers):
    """The docs rule (defaultActiveSlots): the newest known attack of each archetype, as many as the tier allows."""
    count = tiers[species["tier"]]["activeAttacks"]
    picked = []
    for attack in reversed([a for a in learned if a["level"] <= species["level"] and a["archetype"] != "utility"]):
        if len(picked) >= count:
            break
        if all(p["archetype"] != attack["archetype"] for p in picked):
            picked.append(attack)
    return sorted(a["slot"] for a in picked)


def element_name(element, level):
    return element if level == 1 else f"{element}_{level}"


def mob_yaml(species, bp, learned, active):
    i = species
    a = bp["attributes"]
    temperature = temperature_of(i["habitat"])
    presets = {p["kind"]: p for p in load("bestia_blueprint.yaml")["equipment"]["presets"]}
    lines = [
        "# Generated from bestia-docs data/bestias.yaml by tools/bestia_export.py. Change it there.",
        f"id: {i['id']}",
        f"identifier: {i['identifier']}",
        f"level: {bp['level']}",
        f"name: {json.dumps(i['name'])}",
        "description: >-",
        *("  " + line for line in wrap(i["description"])),
        f"kind: {i['kind']}",
        f"element: {element_name(i['element'], bp['elementLevel'])}",
        f"size: {i['size']}",
        f"default-attack: {bp['defaultAttack']['kind'].upper()}",
        f"aspd: {bp['defaultAttack']['aspd']}",
        f"ai: {i['ai']}",
        f"attack-power: {bp['attackPower']}",
        f"health: {bp['hp']}",
        f"mana: {bp['mana']}",
        f"experience: {bp['experience']}",
        "attributes: { strength: %d, intelligence: %d, vitality: %d, dexterity: %d, willpower: %d, agility: %d }"
        % (a["str"], a["int"], a["vit"], a["dex"], a["wil"], a["agi"]),
        "learnset:",
        *learnset_lines(learned, active),
        f"habitat: [{', '.join(i['habitat'])}]",
    ]
    if temperature:
        lines += [f"temperature-min: {temperature[0]}", f"temperature-max: {temperature[1]}"]
    lines.append(f"spawn-weight: {SPAWN_WEIGHT_BY_TIER[i['tier']]}")
    if i["tier"] == "boss":
        lines.append("boss: true")
    if i["tier"] == "critter":
        lines.append("non-combatant: true")
    if i.get("eventOnly"):
        lines.append("event-only: true")
    if i.get("corruptedOnly"):
        lines.append("corrupted-only: true")
    preset = presets[i["kind"]]
    lines += [f"equip-slots: [{', '.join(preset['slots'])}]", f"armor-types: [{', '.join(preset['armorTypes'])}]"]
    lines.append("loot:")
    lines += [f"  - {{ item: {row['item']}, chance: {max(1, round(row['chance'] * 100))} }}" for row in i["loot"]]
    return "\n".join(lines) + "\n"


def learnset_lines(learned, active):
    lines = []
    for attack in learned:
        flag = ", active: true" if attack["slot"] in active and attack["archetype"] != "utility" else ""
        lines.append(f"  - {{ skill: {attack['skill']}, level: {attack['level']}{flag} }}")
    return lines


def wrap(text, width=110):
    words, lines, line = text.split(), [], ""
    for word in words:
        if line and len(line) + len(word) + 1 > width:
            lines.append(line)
            line = word
        else:
            line = f"{line} {word}" if line else word
    return lines + ([line] if line else [])


def replace_learnset(path, learned):
    """A hand-tuned mob keeps its numbers; only its learnset block is written."""
    content = path.read_text()
    block = "learnset:\n" + "\n".join(learnset_lines(learned, active=[])) + "\n"
    if re.search(r"(?m)^learnset:", content):
        content = re.sub(r"(?m)^learnset:\n(?:  .*\n)*", block, content)
    else:
        content = content.replace("\nhabitat:", "\n" + block + "habitat:", 1)
    path.write_text(content)


def write_gm_learnset(game, skills):
    """The GM bestia knows every bestia skill, so a GM can try any of them (GmBestiaSpeciesTest)."""
    path = game / MOB_DIR / "gm-bestia.yml"
    learned = [{"slot": None, "level": 1, "skill": skill, "archetype": "utility"} for skill in skills]
    replace_learnset(path, learned)


def write_look(game, species):
    tres = next((game / TRES_DIR).glob(f"{species['id']}_*.tres"), None)
    if tres is None:
        print(f"  no .tres for {species['identifier']}; run syncBestiaDb first")
        return
    look = species["look"]
    boss = species["tier"] == "boss"
    shape = look.get("shape", SHAPE_BY_KIND[species["kind"]])
    scale = SCALE_BY_SIZE[species["size"]] * (BOSS_SCALE if boss else 1)
    glow = look.get("glow", BOSS_GLOW if boss else 0.0)
    r, g, b = (int(look["colour"][k:k + 2], 16) / 255 for k in (1, 3, 5))
    fields = {
        "placeholder_shape": str(SHAPES.index(shape)),
        "placeholder_colour": f"Color({r:.4g}, {g:.4g}, {b:.4g}, 1)",
        "placeholder_scale": f"{scale:.4g}",
        "placeholder_glow": f"{glow:.4g}",
    }
    content = re.sub(r"(?m)^placeholder_\w+ = .*\n", "", tres.read_text())
    content = content.rstrip("\n") + "\n" + "".join(f"{k} = {v}\n" for k, v in fields.items())
    tres.write_text(content)


def export_mobs(game):
    blueprint = load("bestia_blueprint.yaml")
    presets = {p["kind"]: p for p in blueprint["equipment"]["presets"]}
    tiers = {t["id"]: t for t in blueprint["tiers"]}
    species = load("bestias.yaml")
    data = calculator_data()

    first = run_calculator(data, [calculator_input(s, presets) for s in species])
    learned = {s["identifier"]: edited_learnset(s, first[s["identifier"]]) for s in species}
    active = {s["identifier"]: active_slots(s, learned[s["identifier"]], tiers) for s in species}
    # Again with the active attacks that are left, so the fit counts what the AI will really use.
    final = run_calculator(data, [calculator_input(s, presets, active[s["identifier"]]) for s in species])

    for s in species:
        ident = s["identifier"]
        path = game / MOB_DIR / f"{ident.replace('_', '-')}.yml"
        if s.get("handTuned"):
            replace_learnset(path, learned[ident])
        else:
            path.write_text(mob_yaml(s, final[ident], learned[ident], active[ident]))
        for warning in final[ident]["warnings"]:
            print(f"  {ident}: {warning}")
        if s["identifier"] != "doom_master_of_doom":
            write_look(game, s)

    write_gm_learnset(game, ["ember"] + [row["identifier"] for row in skill_rows()])
    print(f"wrote {len(species)} species")


def main():
    if len(sys.argv) != 3 or sys.argv[1] not in ("skills", "mobs"):
        sys.exit(__doc__)
    game = Path(sys.argv[2])
    if sys.argv[1] == "skills":
        rows = skill_rows()
        write_block(game / SKILLS_YML, rows)
        print(f"wrote {len(rows)} skills")
    else:
        export_mobs(game)


if __name__ == "__main__":
    main()
