#!/usr/bin/env python3
"""Writes the bestia data of these docs into a bestia-behemoth checkout.

    python3 tools/bestia_export.py skills <bestia-behemoth>

`skills` turns every bestia attack of data/attacks.yaml into a row of zone-server's skills.yml, between the
generated-block markers. The numbers come from the archetypes in data/bestia_blueprint.yaml, so the server
casts what the Bestia Blueprint calculator balanced against.
"""
import re
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


def main():
    if len(sys.argv) != 3 or sys.argv[1] not in ("skills",):
        sys.exit(__doc__)
    game = Path(sys.argv[2])
    rows = skill_rows()
    write_block(game / SKILLS_YML, rows)
    print(f"wrote {len(rows)} skills")


if __name__ == "__main__":
    main()
