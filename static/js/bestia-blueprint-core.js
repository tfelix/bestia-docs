/*
 * The calculation behind the Bestia Blueprint Calculator. No DOM in here, so node can load it
 * for checks. The method is described on /docs/mechanics/bestia-design/ and every number comes
 * from data/bestia_blueprint.yaml.
 *
 * Fights are simulated with expected values instead of dice: every swing deals its average damage
 * times its hit chance. That keeps a blueprint reproducible, and the averages are what balance is
 * about anyway.
 */
(function (root) {
  "use strict";

  const ATTRIBUTES = ["str", "vit", "int", "agi", "dex", "wil"];
  // Attributes the basic-attack fit scales. The others stay as the role split them, so a caster
  // keeps its INT; its spells are tuned through the attack power instead.
  const OFFENSE_ATTRIBUTES = ["str", "dex"];
  const FACTOR_RANGE = { min: 0.001, max: 100 };
  const MANA_REGEN_SECONDS = 8;
  const SIM_STEP = 0.05;
  const MAX_FIGHT_SECONDS = 600;
  const WILD_IV = 50;

  // Kotlin Int division, which the server formulas rely on.
  const idiv = (a, b) => Math.trunc(a / b);
  const clamp = (v, lo, hi) => Math.min(hi, Math.max(lo, v));
  const byId = (list, id) => list.find((e) => e.id === id);

  // --- Status values (DerivedStatusValues.kt, DefenseValues.kt) -------------------------------

  function combatant(level, attrs, extra = {}) {
    const a = attrs;
    return {
      level,
      attrs: a,
      atk: idiv(level, 4) + a.str + idiv(a.dex, 5) + idiv(a.wil, 3),
      ratk: idiv(level, 4) + a.dex + idiv(a.str, 5) + idiv(a.wil, 3),
      matk: idiv(level, 4) + a.int + idiv(a.wil, 5),
      hit: 175 + level + a.dex + idiv(a.wil, 3),
      flee: 100 + level + a.agi + idiv(a.wil, 5),
      crit: idiv(a.wil, 3),
      def: a.vit + idiv(a.str, 5) + idiv(a.agi, 5) + idiv(level, 4),
      mdef: a.int + idiv(a.vit, 5) + idiv(a.dex, 5) + idiv(level, 4),
      element: "NORMAL",
      elementLevel: 1,
      hardDefense: 0,
      weaponAtk: 0,
      ...extra,
    };
  }

  function attackInterval(data, baseMotionMs, attrs) {
    const s = data.server;
    const reduced = baseMotionMs - idiv(baseMotionMs * (4 * attrs.agi + attrs.dex), 1000);
    const motion = clamp(reduced, s.motionMs.min, s.motionMs.max);
    return { motionMs: motion, seconds: (2 * motion) / 1000, aspd: idiv(2000 - motion, 10) };
  }

  // The docs' HP and mana formulas. A master uses the server's shared base values and no IV.
  function poolSize(base, baseValue, iv, level, attr) {
    return Math.floor((base + ((baseValue * 2 + iv) * level) / 100 + level) * (1 + attr * 0.01));
  }

  // --- Reference master ------------------------------------------------------------------------

  const stepCost = (next) => Math.max(1, idiv(next, 3));

  function statusPointsUpTo(data, level) {
    let points = data.server.creationEffortPoints;
    for (let reached = 2; reached <= level; reached++) points += 5 + idiv(reached, 2);
    return points;
  }

  // Spends every point the way a player with the given build would: always into the attribute
  // that lags furthest behind its weight.
  function spendPoints(points, weights) {
    const attrs = Object.fromEntries(ATTRIBUTES.map((k) => [k, 0]));
    const live = ATTRIBUTES.filter((k) => weights[k] > 0);
    for (;;) {
      const affordable = live.filter((k) => stepCost(attrs[k] + 1) <= points);
      if (affordable.length === 0) break;
      const next = affordable.reduce((best, k) =>
        attrs[k] / weights[k] < attrs[best] / weights[best] ? k : best
      );
      points -= stepCost(attrs[next] + 1);
      attrs[next] += 1;
    }
    return attrs;
  }

  function referenceMaster(data, level) {
    const rm = data.referenceMaster;
    const attrs = spendPoints(statusPointsUpTo(data, level), rm.build);
    const master = combatant(level, attrs, {
      weaponAtk: Math.round(rm.weaponAtk.base + rm.weaponAtk.perLevel * (level - 1)),
      hardDefense: Math.round(rm.hardDefense.base + rm.hardDefense.perLevel * (level - 1)),
    });
    master.hp = poolSize(15, data.server.masterBaseValue.hp, 0, level, attrs.vit);
    master.interval = attackInterval(data, data.server.bareHandedMotionMs, attrs);
    return master;
  }

  // --- Damage (BaseDamageCalculator.kt and the skill scripts) -----------------------------------

  function elementMod(data, attackElement, defender) {
    const column = data.elements.indexOf(attackElement);
    return data.elementTable[defender.element][defender.elementLevel - 1][column] / 100;
  }

  function hardDefenseFactor(hardDefense) {
    return clamp((100 - hardDefense) / 100, 0.05, 4);
  }

  // Expected damage of one physical swing, misses and crits included.
  function physicalPerSwing(data, attacker, defender, opts = {}) {
    const s = data.server;
    const statusAtk = opts.ranged ? attacker.ratk : attacker.atk;
    const coef = opts.coef ?? 1;
    const element = opts.element ?? "NORMAL";
    let baseAtk =
      s.statusAttackWeight * statusAtk * coef * (1 - s.attackVariance / 2) +
      attacker.weaponAtk * (1 - s.weaponVariance / 2);
    baseAtk = Math.max(1, baseAtk * elementMod(data, element, defender));

    const hardDef = hardDefenseFactor(defender.hardDefense);
    let softDef = defender.def;
    if (opts.ranged) softDef += defender.attrs.vit / 2 + defender.attrs.str / 6;
    const normal = Math.max(s.minDamage, Math.floor(baseAtk * hardDef) - softDef);
    const crit = Math.max(s.minDamage, Math.floor(baseAtk * s.critDamage * Math.max(1, hardDef)));

    const hitChance = clamp((s.hitWeight * attacker.hit) / defender.flee, s.hitChance.min, s.hitChance.max);
    const critChance = clamp(
      (attacker.crit - defender.crit / s.critShieldDivisor) / 100,
      s.critChance.min,
      s.critChance.max
    );
    return { hitChance, normal, crit, expected: hitChance * ((1 - critChance) * normal + critChance * crit) };
  }

  // Firebolt.kt's (lv/4 + INT)·skillLv + MATK − SoftMDEF, with the coefficient on the whole attack
  // side. On Firebolt's MATK term alone a high-INT caster could not be tuned down. Magic never misses.
  function magicPerCast(data, attacker, defender, coef, skillLevel, element) {
    const attack = ((idiv(attacker.level, 4) + attacker.attrs.int) * skillLevel + attacker.matk) * coef;
    const raw = (attack - defender.mdef) * elementMod(data, element, defender);
    return Math.max(data.server.minDamage, Math.floor(raw));
  }

  // Ember.kt: (lv/8 + INT/2 + MATK/4)·skillLv per tick, past every defence.
  function dotPerTick(data, attacker, defender, coef, skillLevel, element) {
    const base = idiv(attacker.level, 8) + idiv(attacker.attrs.int, 2) + idiv(attacker.matk, 4);
    return Math.max(1, Math.floor(base * skillLevel * coef * elementMod(data, element, defender)));
  }

  function healPerCast(attacker, coef, skillLevel) {
    return Math.floor(idiv(attacker.level + attacker.attrs.int, 8) * (4 + 8 * skillLevel) * coef);
  }

  function manaCost(archetype, skillLevel) {
    return Math.round(archetype.mana.base + archetype.mana.perSkillLevel * skillLevel);
  }

  // --- Learnset ---------------------------------------------------------------------------------

  const DAMAGE_KINDS = ["magic", "dot"];
  const isDamaging = (attack) => attack.kind === "physical" || DAMAGE_KINDS.includes(attack.kind);

  // A damaging attack must have the species element or none; a heal is a heal.
  function fitsElement(attack, archetype, element) {
    if (archetype.kind !== "physical" && !DAMAGE_KINDS.includes(archetype.kind)) return true;
    return attack.element === element || attack.element === "NORMAL";
  }

  // The strongest attack from the Attack List that fits the slot and is not taken yet. One of the
  // species' own element comes first.
  function listedAttackFor(data, archetype, element, slotLevel, taken) {
    const fits = (attack) =>
      attack.bestia !== false &&
      attack.archetype === archetype.id &&
      fitsElement(attack, archetype, element) &&
      attack.level <= slotLevel &&
      !taken.has(attack.id);
    const ownElementFirst = (x, y) => (y.element === element) - (x.element === element) || y.level - x.level;
    return (data.attacks || []).filter(fits).sort(ownElementFirst)[0];
  }

  // Up to 20 attacks a species learns from Lv 1 to 100, all from the Attack List. A slot the list has
  // no attack for stays empty.
  function learnset(data, roleId, element) {
    const role = byId(data.roles, roleId);
    const ls = data.learnset;
    const taken = new Set();
    return role.learnPattern
      .map((archetypeId, slot) => {
        const archetype = byId(data.archetypes, archetypeId);
        const level = ls.levels[slot];
        const attack = listedAttackFor(data, archetype, element, level, taken);
        if (!attack) return null;
        taken.add(attack.id);
        return {
          slot,
          level,
          archetype: archetypeId,
          kind: archetype.kind,
          element: attack.element,
          skillLevel: Math.min(ls.maxSkillLevel, 1 + idiv(level, ls.skillLevelEvery)),
          name: attack.name,
          identifier: attack.id,
          skillId: attack.skillId ?? null,
          skill: attack.skill ?? null,
          listedMana: attack.mana ?? null,
        };
      })
      .filter(Boolean);
  }

  // The newest attacks it knows, one per archetype: what a wild one of this level would use.
  function defaultActiveSlots(data, input, known) {
    const count = byId(data.tiers, input.tier).activeAttacks;
    const picked = [];
    for (const attack of [...known].reverse()) {
      if (picked.length >= count) break;
      if (!picked.some((p) => p.archetype === attack.archetype)) picked.push(attack);
    }
    return picked.map((a) => a.slot).sort((a, b) => a - b);
  }

  // --- Fight simulation ---------------------------------------------------------------------------

  // Plays the bestia's rotation against the master for `seconds`, or until one side drops when
  // `untilDeath` is set. Returns what happened, in expected values.
  function simulate(data, bestia, master, attacks, opts) {
    const basic = bestia.basic;
    const regen = 1 + idiv(bestia.mana, 100) + idiv(bestia.attrs.int, 6);
    const ready = attacks.map(() => 0);
    const dots = [];
    const dealtBy = { basic: 0 };
    attacks.forEach((a) => (dealtBy[a.identifier] = 0));

    let mana = bestia.mana;
    let hp = bestia.hp;
    let dealt = 0;
    let buffUntil = -1;
    let debuffUntil = -1;
    let bestiaFreeAt = 0;
    let masterNextSwing = 0;
    let swings = 0;
    let nextRegen = MANA_REGEN_SECONDS;
    let t = 0;
    const playerSwing = physicalPerSwing(data, master, bestia).expected;

    const hurt = (amount, source) => {
      const boosted = t < buffUntil ? amount * (1 + bestia.buffEffect) : amount;
      dealt += boosted;
      dealtBy[source] += boosted;
    };

    for (; t < (opts.untilDeath ? MAX_FIGHT_SECONDS : opts.seconds); t += SIM_STEP) {
      if (t >= nextRegen) {
        mana = Math.min(bestia.mana, mana + regen);
        nextRegen += MANA_REGEN_SECONDS;
      }
      for (const d of dots) {
        while (d.ticksLeft > 0 && t >= d.nextTick) {
          hurt(d.perTick, d.source);
          d.ticksLeft--;
          d.nextTick += data.server.dotTickSeconds;
        }
      }

      if (opts.untilDeath && t >= masterNextSwing) {
        const factor = t < debuffUntil ? 1 - bestia.debuffEffect : 1;
        const hit = playerSwing * factor;
        swings += hp > hit ? 1 : hp / hit;
        hp -= hit;
        masterNextSwing += master.interval.seconds;
        if (hp <= 0) break;
      }

      if (t < bestiaFreeAt) continue;
      const choice = chooseAttack(attacks, ready, mana, t, hp / bestia.hp, buffUntil, debuffUntil);
      if (choice === null) {
        hurt(physicalPerSwing(data, bestia, master, { ranged: basic.ranged }).expected, "basic");
        bestiaFreeAt = t + bestia.interval.seconds;
        continue;
      }
      const a = attacks[choice];
      const arch = a.archetypeData;
      mana -= a.mana;
      ready[choice] = t + arch.castTime + arch.cooldown;
      bestiaFreeAt = t + Math.max(arch.castTime, bestia.interval.seconds);
      if (a.kind === "physical") {
        hurt(physicalPerSwing(data, bestia, master, { coef: a.coef, ranged: arch.ranged }).expected, a.identifier);
      } else if (a.kind === "magic") {
        hurt(magicPerCast(data, bestia, master, a.coef, a.skillLevel, a.element), a.identifier);
      } else if (a.kind === "dot") {
        const perTick = dotPerTick(data, bestia, master, a.coef, a.skillLevel, a.element) * arch.uptime;
        dots.push({ perTick, ticksLeft: data.server.dotTicks, nextTick: t + arch.castTime, source: a.identifier });
      } else if (a.kind === "heal") {
        hp = Math.min(bestia.hp, hp + healPerCast(bestia, arch.coef, a.skillLevel));
      } else if (a.kind === "buff") {
        buffUntil = t + arch.castTime + arch.duration;
      } else if (a.kind === "debuff") {
        debuffUntil = t + arch.castTime + arch.duration;
      }
    }
    return { seconds: t, swings, dealt, dealtBy, manaLeft: mana };
  }

  // Heal when hurt, keep buff and debuff up, otherwise the hardest hitter that is ready.
  function chooseAttack(attacks, ready, mana, t, hpShare, buffUntil, debuffUntil) {
    let best = null;
    let bestScore = -1;
    attacks.forEach((a, i) => {
      if (t < ready[i] || mana < a.mana) return;
      let score;
      if (a.kind === "heal") score = hpShare < 0.5 ? 1000 : -1;
      else if (a.kind === "buff") score = t >= buffUntil ? 900 : -1;
      else if (a.kind === "debuff") score = t >= debuffUntil ? 800 : -1;
      else score = a.power;
      if (score > bestScore) {
        best = i;
        bestScore = score;
      }
    });
    return best;
  }

  // --- Building a bestia ----------------------------------------------------------------------------

  function suggestedElementLevel(data, level, tier) {
    const base = data.elementLevels.find((e) => level <= e.upTo).level;
    return Math.min(4, base + (tier === "boss" ? 1 : 0));
  }

  function splitBudget(budget, weights) {
    const total = ATTRIBUTES.reduce((sum, k) => sum + weights[k], 0);
    return Object.fromEntries(ATTRIBUTES.map((k) => [k, Math.max(1, Math.round((budget * weights[k]) / total))]));
  }

  function scaleOffense(attrs, factor) {
    const scaled = { ...attrs };
    OFFENSE_ATTRIBUTES.forEach((k) => (scaled[k] = Math.max(1, Math.round(attrs[k] * factor))));
    return scaled;
  }

  function makeBestia(data, input, attrs, hp, ctx) {
    const b = combatant(input.level, attrs, { element: input.element, elementLevel: ctx.elementLevel });
    b.hp = hp;
    b.mana = ctx.manaFor(attrs);
    b.interval = attackInterval(data, data.server.bareHandedMotionMs, attrs);
    b.basic = { ranged: ctx.role.basicAttack === "ranged" };
    const buff = ctx.active.find((a) => a.kind === "buff");
    const debuff = ctx.active.find((a) => a.kind === "debuff");
    b.buffEffect = buff ? buff.archetypeData.effect : 0;
    b.debuffEffect = debuff ? debuff.archetypeData.effect : 0;
    return b;
  }

  // What one use of each attack deals, so the rotation can fire the hardest hitter first.
  function withPower(data, bestia, master, active) {
    active.forEach((a) => {
      const arch = a.archetypeData;
      if (a.kind === "physical") a.power = physicalPerSwing(data, bestia, master, { coef: a.coef, ranged: arch.ranged }).expected;
      else if (a.kind === "magic") a.power = magicPerCast(data, bestia, master, a.coef, a.skillLevel, a.element);
      else if (a.kind === "dot") a.power = dotPerTick(data, bestia, master, a.coef, a.skillLevel, a.element) * data.server.dotTicks * arch.uptime;
      else a.power = 0;
    });
  }

  function offenseDps(data, input, attrs, master, ctx) {
    const bestia = makeBestia(data, input, attrs, 1, ctx);
    withPower(data, bestia, master, ctx.active);
    return simulate(data, bestia, master, ctx.active, { seconds: ctx.window }).dealt / ctx.window;
  }

  // Bisection in log space over a factor that only ever raises damage. Rounded attributes move
  // damage in steps, so it ends on whichever side of the step lands closer to the target.
  function solveFactor(dpsAt, targetDps) {
    let lo = Math.log(FACTOR_RANGE.min);
    let hi = Math.log(FACTOR_RANGE.max);
    for (let i = 0; i < 40; i++) {
      const mid = (lo + hi) / 2;
      if (dpsAt(Math.exp(mid)) < targetDps) lo = mid;
      else hi = mid;
    }
    const [below, above] = [Math.exp(lo), Math.exp(hi)];
    return Math.abs(dpsAt(below) - targetDps) < Math.abs(dpsAt(above) - targetDps) ? below : above;
  }

  // Raises or lowers STR and DEX until the default attack deals its share of the target. Buffs,
  // debuffs and heals stay in the rotation because casting them costs swings.
  function fitAttributes(data, input, attrs, master, ctx, targetDps) {
    const withoutDamage = { ...ctx, active: ctx.active.filter((a) => !isDamaging(a)) };
    const dpsOf = (candidate) => offenseDps(data, input, candidate, master, withoutDamage);
    const factor = solveFactor((f) => dpsOf(scaleOffense(attrs, f)), targetDps);
    // One factor moves STR and DEX together. A single point on one of them lands closer.
    const scaled = scaleOffense(attrs, factor);
    const candidates = [scaled];
    OFFENSE_ATTRIBUTES.forEach((k) => [-1, 1].forEach((d) => candidates.push({ ...scaled, [k]: Math.max(1, scaled[k] + d) })));
    const best = candidates.reduce((a, b) => (Math.abs(dpsOf(b) - targetDps) < Math.abs(dpsOf(a) - targetDps) ? b : a));
    return { attrs: best, factor };
  }

  // Skill scripts scale with level/4 times the skill level, which attributes cannot reach. So the
  // attacks get one shared coefficient instead, solved so the whole rotation meets the target.
  function fitAttackPower(data, input, attrs, master, ctx, targetDps) {
    const scaled = (f) => ctx.active.filter(isDamaging).forEach((a) => (a.coef = a.archetypeData.coef * f));
    const power = solveFactor((f) => {
      scaled(f);
      return offenseDps(data, input, attrs, master, ctx);
    }, targetDps);
    scaled(power);
    return power;
  }

  // Sets HP so the master needs the target number of swings, heals and debuffs included.
  function fitHp(data, input, attrs, master, ctx, targetSwings) {
    const probe = makeBestia(data, input, attrs, 1, ctx);
    let hp = Math.max(1, Math.round(targetSwings * physicalPerSwing(data, master, probe).expected));
    for (let i = 0; i < 6; i++) {
      const bestia = makeBestia(data, input, attrs, hp, ctx);
      withPower(data, bestia, master, ctx.active);
      const fight = simulate(data, bestia, master, ctx.active, { untilDeath: true });
      if (fight.swings <= 0) break;
      hp = Math.max(1, Math.round((hp * targetSwings) / fight.swings));
    }
    return hp;
  }

  // A loot row names an item from the Items List and a chance in percent. The value and the tier
  // follow from those, so a designer cannot price a drop by hand.
  function lootRows(data, input) {
    return (input.loot || [])
      .filter((row) => row.item)
      .map((row) => {
        const wanted = String(row.item).trim().toLowerCase();
        const item = (data.items || []).find((it) => it.id === wanted || it.name.toLowerCase() === wanted);
        const percent = clamp(Number(row.chance) || 0, 0, 100);
        // Tiers run from common to very rare, so the first one whose minimum the chance reaches is its tier.
        const tier = data.loot.tiers.find((t) => percent >= t.chance.min) || data.loot.tiers[data.loot.tiers.length - 1];
        return {
          item: item ? item.id : wanted.replace(/[^a-z0-9]+/g, "_"),
          name: item ? item.name : row.item,
          known: Boolean(item),
          percent,
          // Mob YAML counts in basis points: 10000 is 100 %.
          basisPoints: Math.max(1, Math.round(percent * 100)),
          value: item ? item.value : 0,
          tier: tier.id,
        };
      });
  }

  function lootBalance(data, input, expBeforeLoot) {
    const l = data.loot;
    const rows = lootRows(data, input);
    const ev = rows.reduce((sum, row) => sum + (row.percent / 100) * row.value, 0);
    const baseline = l.coinsPerExp * expBeforeLoot;
    const score = baseline > 0 ? ev / baseline : 0;
    const surplus = Math.max(0, score - 1);
    const deficit = Math.max(0, 1 - score);
    const t = clamp(Number(input.lootBalance) || 0, 0, 1);
    const expFactor = surplus > 0
      ? Math.max(l.minExpFactor, 1 / (1 + l.k * surplus * (1 - t)))
      : 1 + l.maxDeficitBonus * deficit;
    const hpBonus = Math.min(l.maxHpBonus, l.hpPerSurplus * surplus * t);
    const jackpots = rows.filter((row) => row.value > l.jackpotFactor * baseline).map((row) => row.name);
    const unknown = rows.filter((row) => !row.known).map((row) => row.name);
    return { rows, expectedValue: round2(ev), baseline: round2(baseline), score: round2(score), expFactor: round2(expFactor), hpBonus: round2(hpBonus), jackpots, unknown };
  }

  const round2 = (v) => Math.round(v * 100) / 100;

  function build(data, input) {
    const tier = byId(data.tiers, input.tier);
    const role = byId(data.roles, input.role);
    const level = input.level;
    const master = referenceMaster(data, level);
    const elementLevel = input.elementLevel || suggestedElementLevel(data, level, input.tier);
    const learned = learnset(data, input.role, input.element);
    const known = learned.filter((a) => a.level <= level);
    const activeSlots = input.activeSlots ?? defaultActiveSlots(data, input, known);
    const active = known
      .filter((a) => activeSlots.includes(a.slot))
      .map((a) => {
        const archetypeData = byId(data.archetypes, a.archetype);
        return { ...a, archetypeData, coef: archetypeData.coef, mana: a.listedMana ?? manaCost(archetypeData, a.skillLevel) };
      });

    const pace = data.pace;
    const normalFightSeconds = pace.playerSwings.target * master.interval.seconds;
    const normalDps = (pace.hpCost.target * master.hp) / normalFightSeconds;
    const targetSwings = pace.playerSwings.target * tier.defense;
    const targetDps = normalDps * tier.offense;
    const manaFor = (attrs) => poolSize(25, role.baseValueMana, WILD_IV, level, attrs.int);
    const ctx = { role, elementLevel, active, manaFor, window: normalFightSeconds * tier.defense };

    const budget = ATTRIBUTES.reduce((sum, k) => sum + master.attrs[k], 0) * tier.budget;
    const overrides = input.overrides || {};
    const hasAttacks = active.some(isDamaging);
    const basicShare = hasAttacks ? role.basicShare : 1;
    const fitted = overrides.attributes
      ? { attrs: { ...overrides.attributes }, factor: 1 }
      : fitAttributes(data, input, splitBudget(budget, role.weights), master, ctx, targetDps * basicShare);
    const attrs = fitted.attrs;
    const attackPower = overrides.attackPower ?? (hasAttacks ? fitAttackPower(data, input, attrs, master, ctx, targetDps) : 1);
    if (overrides.attackPower != null) active.filter(isDamaging).forEach((a) => (a.coef = a.archetypeData.coef * attackPower));
    const fittedHp = fitHp(data, input, attrs, master, ctx, targetSwings);

    // Balance is judged on the fitted bestia; loot toughness comes on top and is not paid in EXP.
    const judged = evaluate(data, input, attrs, overrides.hp ?? fittedHp, master, ctx, normalDps);
    const expBeforeLoot = data.exp.perLevel * level + data.exp.base;
    const threatExp = expBeforeLoot * judged.threat;
    const loot = lootBalance(data, input, threatExp);
    const hp = overrides.hp ?? Math.round(fittedHp * (1 + loot.hpBonus));
    const final = evaluate(data, input, attrs, hp, master, ctx, normalDps);

    const bestia = makeBestia(data, input, attrs, hp, ctx);
    withPower(data, bestia, master, active);
    // Attacks it learns later scale the same way, so a script author gets one rule per species.
    learned.forEach((a) => {
      const arch = byId(data.archetypes, a.archetype);
      if (isDamaging(a)) a.coef = round2(arch.coef * attackPower);
    });
    return {
      warnings: [
        ...warningsFor(data, tier, final, fitted.factor, attackPower),
        ...loot.jackpots.map((item) => `${item} is worth more than ${data.loot.jackpotFactor} loot budgets. Players will farm this bestia for it alone.`),
        ...loot.unknown.map((item) => `${item} is not on the Items List, so it counts as worth nothing. Add it to data/items.yaml.`),
      ],
      input,
      level,
      elementLevel,
      tier,
      role,
      defaultAttack: { kind: role.basicAttack, range: role.basicAttack === "ranged" ? data.server.rangedReach : 1 },
      master,
      attributes: attrs,
      hp,
      fittedHp,
      mana: bestia.mana,
      attackPower: round2(attackPower),
      derived: derivedOf(bestia),
      learnset: learned,
      active,
      targets: { playerSwings: targetSwings, dps: round2(targetDps), fightSeconds: round2(ctx.window) },
      balance: { ...final, threat: judged.threat, defenseRatio: judged.defenseRatio, offenseRatio: judged.offenseRatio },
      loot,
      exp: rewards(data, input, level, judged.threat, loot.expFactor, elementLevel),
      elementDefense: data.elements.map((el) => ({ element: el, percent: Math.round(elementMod(data, el, bestia) * 100) })),
    };
  }

  // Warns only when the result misses its band. A factor stuck at its bound is not a problem on
  // its own: a caster's default attack sits at the floor while its spells carry the damage.
  function warningsFor(data, tier, balance, attributeFactor, attackPower) {
    const pace = data.pace;
    const stuck = (f) => f <= FACTOR_RANGE.min * 1.01 || f >= FACTOR_RANGE.max * 0.99;
    const offense = balance.offenseRatio / tier.offense;
    const swings = balance.playerSwings / tier.defense;
    const warnings = [];
    if (offense < pace.hpCost.min / pace.hpCost.target || offense > pace.hpCost.max / pace.hpCost.target) {
      let cause = "Check the attribute overrides.";
      if (stuck(attributeFactor)) cause = "WIL crits or the minimum damage of 1 keep the default attack above its share; lower WIL.";
      else if (stuck(attackPower)) cause = "The attack power hit its limit.";
      warnings.push(`Damage is ${Math.round(offense * 100)} % of the target. ${cause}`);
    }
    if (swings < pace.playerSwings.min || swings > pace.playerSwings.max) {
      warnings.push(`The master needs ${balance.playerSwings} swings, outside ${pace.playerSwings.min}-${pace.playerSwings.max} × ${tier.defense}.`);
    }
    return warnings;
  }

  function evaluate(data, input, attrs, hp, master, ctx, normalDps) {
    const bestia = makeBestia(data, input, attrs, hp, ctx);
    withPower(data, bestia, master, ctx.active);
    const fight = simulate(data, bestia, master, ctx.active, { untilDeath: true });
    const window = simulate(data, bestia, master, ctx.active, { seconds: ctx.window });
    const dps = window.dealt / ctx.window;
    const defenseRatio = fight.swings / data.pace.playerSwings.target;
    const offenseRatio = dps / normalDps;
    const e = data.exp;
    return {
      playerSwings: round2(fight.swings),
      fightSeconds: round2(fight.seconds),
      hpCost: round2(fight.dealt / master.hp),
      bestiaDps: round2(dps),
      dpsBySource: Object.fromEntries(Object.entries(window.dealtBy).map(([k, v]) => [k, round2(v / ctx.window)])),
      manaLeftAfterWindow: Math.round(window.manaLeft),
      bestiaSwingsToKillMaster: round2(master.hp / Math.max(0.01, physicalPerSwing(data, bestia, master, { ranged: bestia.basic.ranged }).expected)),
      defenseRatio: round2(defenseRatio),
      offenseRatio: round2(offenseRatio),
      threat: round2(clamp(Math.sqrt(defenseRatio * offenseRatio), e.minThreat, e.maxThreat)),
    };
  }

  function rewards(data, input, level, threat, lootFactor, elementLevel) {
    const e = data.exp;
    const base = e.perLevel * level + e.base;
    const experience = Math.max(1, Math.round(base * threat * lootFactor));
    const effectiveLevel = Math.max(1, Math.round((base * threat - e.base) / e.perLevel));
    // Kill-time bonuses from bestia.md. They are not part of the YAML value.
    const killBonus = (input.tier === "boss" ? 2 : 0) + (input.element !== "NORMAL" ? 0.1 * elementLevel : 0);
    return { base, threat, lootFactor, experience, effectiveLevel, killBonus: round2(killBonus), atKill: Math.round(experience * (1 + killBonus)) };
  }

  function derivedOf(b) {
    return {
      atk: b.atk, ratk: b.ratk, matk: b.matk, hit: b.hit, flee: b.flee, crit: b.crit,
      softDef: b.def, softMdef: b.mdef, aspd: b.interval.aspd, attackDelaySeconds: round2(b.interval.seconds),
    };
  }

  // --- Export -----------------------------------------------------------------------------------------

  const ATTRIBUTE_NAMES = { str: "strength", vit: "vitality", int: "intelligence", agi: "agility", dex: "dexterity", wil: "willpower" };

  function toJson(bp) {
    const i = bp.input;
    return {
      schema: "bestia-blueprint/v1",
      identity: { name: i.name, identifier: i.identifier, epithet: i.epithet, kind: i.kind },
      compendium: {
        description: i.description,
        habitat: i.habitat,
        temperature: { min: i.temperatureMin, max: i.temperatureMax },
        activity: i.activity,
        senseReveals: ["level", "element", "hp", "mana", "attributes"],
      },
      level: bp.level,
      tier: bp.tier.id,
      role: bp.role.id,
      element: { element: i.element, level: bp.elementLevel },
      size: i.size,
      attributes: Object.fromEntries(ATTRIBUTES.map((k) => [ATTRIBUTE_NAMES[k], bp.attributes[k]])),
      pools: { health: bp.hp, mana: bp.mana },
      derived: bp.derived,
      defenses: {
        takesPercentByElement: Object.fromEntries(bp.elementDefense.map((e) => [e.element, e.percent])),
        notes: i.defenseNotes || "",
      },
      ai: {
        profile: aiProfileOf(i),
        newProfile: i.ai === "custom" ? { behaviour: i.aiBehaviour || "" } : null,
        defaultAttack: bp.defaultAttack,
      },
      attacks: {
        attackPower: bp.attackPower,
        active: bp.active.map(attackJson),
        learnset: bp.learnset.map(attackJson),
      },
      loot: {
        drops: bp.loot.rows.map((r) => ({ item: r.item, name: r.name, chancePercent: r.percent, value: r.value, tier: r.tier })),
        expectedValue: bp.loot.expectedValue,
        budget: bp.loot.baseline,
        shareOfBudget: bp.loot.score,
        expFactor: bp.loot.expFactor,
        hpBonus: bp.loot.hpBonus,
      },
      rewards: bp.exp,
      balance: { versus: `reference master Lv ${bp.level}`, targets: bp.targets, ...bp.balance },
    };
  }

  function attackJson(a) {
    const json = {
      level: a.level, name: a.name, identifier: a.identifier, archetype: a.archetype, kind: a.kind,
      element: a.element, skillLevel: a.skillLevel, skill: a.skill, skillId: a.skillId,
    };
    if (a.coef != null) json.coefficient = round2(a.coef);
    if (a.power) json.damagePerUseVsMaster = round2(a.power);
    if (a.mana != null) json.manaCost = a.mana;
    return json;
  }

  // A custom profile is written for this species, so it takes the species' name.
  const aiProfileOf = (input) => (input.ai === "custom" ? input.identifier : input.ai);

  // ElementModifier spells a level-1 element bare and the others with a suffix: EARTH, EARTH_2.
  const elementName = (element, level) => (level > 1 ? `${element}_${level}` : element);

  // A folded YAML block, so a long description stays readable in the file.
  function foldedYaml(key, text) {
    const words = String(text || "").trim().split(/\s+/).filter(Boolean);
    const lines = [];
    let line = "";
    words.forEach((w) => {
      if (line && line.length + w.length + 1 > 98) {
        lines.push(line);
        line = w;
      } else line = line ? `${line} ${w}` : w;
    });
    if (line) lines.push(line);
    return [`${key}: >-`, ...lines.map((l) => `  ${l}`)];
  }

  // In the shape of zone-server's mob/blob.yml. An attack without a skills.yml row has nothing to name yet,
  // so its learnset line stays a comment until the row exists.
  function toMobYaml(bp) {
    const i = bp.input;
    const a = bp.attributes;
    const lines = [
      "id: <next free id>",
      `identifier: ${i.identifier}`,
      `level: ${bp.level}`,
      `name: ${i.name}`,
    ];
    if (i.epithet) lines.push(`epithet: ${i.epithet}`);
    lines.push(...foldedYaml("description", i.description));
    lines.push(
      `kind: ${i.kind}`,
      `element: ${elementName(i.element, bp.elementLevel)}`,
      `size: ${i.size}`,
      `default-attack: ${bp.defaultAttack.kind.toUpperCase()}`,
      `ai: ${aiProfileOf(i)}`,
      `health: ${bp.hp}`,
      `mana: ${bp.mana}`,
      `experience: ${bp.exp.experience}`,
      `attributes: { strength: ${a.str}, intelligence: ${a.int}, vitality: ${a.vit}, dexterity: ${a.dex}, willpower: ${a.wil}, agility: ${a.agi} }`,
      "learnset:"
    );
    bp.learnset.forEach((attack) => {
      lines.push(attack.skill
        ? `  - { skill: ${attack.skill}, level: ${attack.level} }`
        : `  # - { skill: ${attack.identifier}, level: ${attack.level} }  no skills.yml row yet`);
    });
    lines.push(`habitat: [${(i.habitat || []).join(", ")}]`);
    if (i.temperatureMin != null && i.temperatureMax != null && i.temperatureMin !== "" && i.temperatureMax !== "") {
      lines.push(`temperature-min: ${i.temperatureMin}`, `temperature-max: ${i.temperatureMax}`);
    }
    lines.push("spawn-weight: 100");
    if (bp.tier.id === "boss") lines.push("boss: true");
    if (bp.tier.id === "critter") lines.push("non-combatant: true");
    lines.push("loot:");
    if (!bp.loot.rows.length) lines[lines.length - 1] = "loot: []";
    bp.loot.rows.forEach((r) => lines.push(`  - { item: ${r.item}, chance: ${r.basisPoints} }`));
    return lines.join("\n");
  }

  // Attack skills only: the default attack comes from the mob YAML's default-attack.
  function toAiAttacksYaml(bp) {
    const i = bp.input;
    const lines = [];
    if (i.ai === "custom") lines.push(`# New profile ai/${i.identifier.replace(/_/g, "-")}.yml: ${i.aiBehaviour || "describe how it behaves"}`);
    lines.push(bp.active.length ? "attacks:" : "attacks: []");
    bp.active.forEach((a) => {
      const skill = a.skillId ?? "<add to skills.yml>";
      lines.push(`  - { id: ${a.identifier}, range: ${a.archetypeData.range}, skill_id: ${skill} }`);
    });
    return lines.join("\n");
  }

  function llmPrompt(bp) {
    const i = bp.input;
    const json = JSON.stringify(toJson(bp), null, 2);
    const aiStep = i.ai === "custom"
      ? `2. Write a new AI profile zone-server/src/main/resources/ai/${i.identifier.replace(/_/g, "-")}.yml from ai.newProfile.behaviour, starting from the closest existing profile. List attacks.active as its attack skills.`
      : `2. Use the AI profile ${i.ai}. If attacks.active differs from its attack list, copy it into a new profile for this species.`;
    return [
      `Add the bestia "${i.name}" to bestia-behemoth from the blueprint below. Its numbers are final; do not rebalance them.`,
      "",
      `1. Create zone-server/src/main/resources/mob/${i.identifier.replace(/_/g, "-")}.yml from this draft, with the next free id:`,
      "",
      "```yaml",
      toMobYaml(bp),
      "```",
      "",
      aiStep,
      "3. Attacks without a skill need a skills.yml row (bestia attacks use ids 1000+), a script that uses the attack's coefficient, and the client Attack DB entry. Read the skill-system skill first. Then turn their commented learnset lines into entries.",
      "4. Run ./gradlew :zone-server:syncBestiaDb. It writes the client bestia .tres and the name, epithet and description into bestias.csv. Translate the new rows in the other language columns of that CSV.",
      "5. defenses.notes has no YAML key yet. Do not invent one.",
      "",
      "```json",
      json,
      "```",
    ].join("\n");
  }

  const api = {
    ATTRIBUTES, referenceMaster, learnset, build, toJson, toMobYaml, toAiAttacksYaml, llmPrompt,
    suggestedElementLevel, physicalPerSwing, statusPointsUpTo,
  };
  if (typeof module !== "undefined" && module.exports) module.exports = api;
  else root.BestiaBlueprint = api;
})(typeof window !== "undefined" ? window : globalThis);
