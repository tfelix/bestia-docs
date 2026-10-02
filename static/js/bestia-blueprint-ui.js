/*
 * The form around BestiaBlueprint (bestia-blueprint-core.js). It reads the inputs, builds the
 * blueprint and draws the result. All balance logic lives in the core.
 */
(function () {
  "use strict";

  const root = document.getElementById("bestia-blueprint");
  if (!root) return;
  const B = window.BestiaBlueprint;
  const data = JSON.parse(document.getElementById("bp-data").textContent);
  const $ = (id) => document.getElementById(id);
  // Bumped when the input shape changes, so an old saved form does not break the page.
  const STORAGE_KEY = "bestia-blueprint-input-v2";
  const DEFAULT_LOOT = [
    { item: "raw_hide", chance: 60 },
    { item: "raw_meat", chance: 30 },
    { item: "medicinal_herb", chance: 2 },
  ];

  // Only the player's choice of attacks lives outside the form, so it survives a re-render.
  let activeSlots = null;
  let loot = DEFAULT_LOOT.map((row) => ({ ...row }));
  let current = null;
  let previewTab = "json";

  const escapeHtml = (v) => String(v ?? "").replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]);
  const fmt = (v, digits = 0) => Number(v).toLocaleString("en-US", { maximumFractionDigits: digits, minimumFractionDigits: digits });
  const slug = (name) => name.toLowerCase().trim().replace(/[^a-z0-9]+/g, "_").replace(/^_|_$/g, "") || "new_bestia";

  // --- Reading the form ---------------------------------------------------------------------------

  function readInput() {
    const input = { loot: loot.map((row) => ({ ...row })), activeSlots };
    root.querySelectorAll("[data-field]").forEach((el) => {
      const key = el.dataset.field;
      if (el.type === "checkbox") input[key] = el.checked;
      else if (el.multiple) input[key] = [...el.selectedOptions].map((o) => o.value);
      else input[key] = el.value;
    });
    input.level = Math.min(100, Math.max(1, parseInt(input.level, 10) || 1));
    input.elementLevel = input.elementLevel ? parseInt(input.elementLevel, 10) : null;
    input.lootBalance = parseFloat(input.lootBalance) || 0;
    input.identifier = input.identifier ? slug(input.identifier) : slug(input.name);
    input.temperatureMin = input.temperatureMin === "" ? null : Number(input.temperatureMin);
    input.temperatureMax = input.temperatureMax === "" ? null : Number(input.temperatureMax);
    if ($("bp-manual").checked) input.overrides = readOverrides();
    return input;
  }

  function readOverrides() {
    const value = (key) => parseFloat(root.querySelector(`[data-manual="${key}"]`).value);
    const attributes = Object.fromEntries(B.ATTRIBUTES.map((k) => [k, Math.max(1, Math.round(value(k)) || 1)]));
    const overrides = { attributes };
    if (value("hp") > 0) overrides.hp = Math.round(value("hp"));
    if (value("attackPower") >= 0) overrides.attackPower = value("attackPower");
    return overrides;
  }

  function writeInput(input) {
    root.querySelectorAll("[data-field]").forEach((el) => {
      const v = input[el.dataset.field];
      if (v === undefined) return;
      if (el.type === "checkbox") el.checked = Boolean(v);
      else if (el.multiple) [...el.options].forEach((o) => (o.selected = (v || []).includes(o.value)));
      else el.value = v ?? "";
    });
    loot = (input.loot || []).map((row) => ({ ...row }));
    $("bp-ai-custom-box").hidden = input.ai !== "custom";
    activeSlots = input.activeSlots ?? null;
    const manual = Boolean(input.overrides);
    $("bp-manual").checked = manual;
    $("bp-manual-fields").hidden = !manual;
    if (manual) fillManual(input.overrides.attributes, input.overrides.hp, input.overrides.attackPower);
  }

  function fillManual(attributes, hp, attackPower) {
    B.ATTRIBUTES.forEach((k) => (root.querySelector(`[data-manual="${k}"]`).value = attributes[k]));
    root.querySelector('[data-manual="hp"]').value = hp ?? "";
    root.querySelector('[data-manual="attackPower"]').value = attackPower ?? "";
  }

  // --- Drawing the result ---------------------------------------------------------------------------

  function band(value, min, max) {
    if (value < min) return '<span class="badge text-bg-warning">low</span>';
    if (value > max) return '<span class="badge text-bg-warning">high</span>';
    return '<span class="badge text-bg-success">on target</span>';
  }

  function render() {
    const input = readInput();
    current = B.build(data, input);
    const bp = current;
    const pace = data.pace;
    const b = bp.balance;

    $("bp-description-count").textContent = `${input.description.length}/300`;
    root.querySelectorAll('[data-out="level"]').forEach((el) => (el.textContent = bp.level));

    $("bp-warnings").innerHTML = bp.warnings
      .map((w) => `<div class="alert alert-warning py-2 small mb-2">${escapeHtml(w)}</div>`)
      .join("");

    const tiles = [
      ["HP", fmt(bp.hp)],
      ["Mana", fmt(bp.mana)],
      ["EXP", fmt(bp.exp.experience)],
      ["Threat", fmt(b.threat, 2)],
      ["Worth a normal Lv", fmt(bp.exp.effectiveLevel)],
      ["Attack power", fmt(bp.attackPower, 2)],
    ];
    $("bp-tiles").innerHTML = tiles
      .map(([label, value]) => `<div class="col-6 col-md-4"><div class="card bp-tile h-100"><div class="card-body py-2"><div class="small text-body-secondary">${label}</div><div class="fs-4 fw-semibold">${value}</div></div></div></div>`)
      .join("");

    const tier = bp.tier;
    const sources = Object.entries(b.dpsBySource).filter(([, v]) => v > 0).map(([k, v]) => `${escapeHtml(k)} ${fmt(v, 2)}`).join(", ");
    $("bp-balance").innerHTML = `
      <tbody>
        <tr><th scope="row">Master swings to kill it</th><td>${fmt(b.playerSwings, 1)}</td><td>target ${fmt(bp.targets.playerSwings)}</td><td>${band(b.playerSwings / tier.defense, pace.playerSwings.min, pace.playerSwings.max)}</td></tr>
        <tr><th scope="row">Its damage per second</th><td>${fmt(b.bestiaDps, 2)}</td><td>target ${fmt(bp.targets.dps, 2)}</td><td>${band(b.offenseRatio / tier.offense, pace.hpCost.min / pace.hpCost.target, pace.hpCost.max / pace.hpCost.target)}</td></tr>
        <tr><th scope="row">Master HP lost in the fight</th><td>${fmt(b.hpCost * 100)} %</td><td colspan="2">${tier.id === "normal" ? `target ${fmt(pace.hpCost.target * 100)} %` : `built for ${escapeHtml(tier.party)}`}</td></tr>
        <tr><th scope="row">Fight length</th><td>${fmt(b.fightSeconds, 1)} s</td><td colspan="2">damage per second from ${sources || "nothing"}</td></tr>
        <tr><th scope="row">Default attacks to kill the master</th><td>${fmt(b.bestiaSwingsToKillMaster, 1)}</td><td colspan="2">mana left after the fight: ${fmt(b.manaLeftAfterWindow)} of ${fmt(bp.mana)}</td></tr>
      </tbody>`;
    const m = bp.master;
    $("bp-master").textContent = `Reference master: ${B.ATTRIBUTES.map((k) => `${k.toUpperCase()} ${m.attrs[k]}`).join(", ")}; ${m.hp} HP; weapon ATK ${m.weaponAtk}; hard DEF ${m.hardDefense}; ${fmt(m.interval.seconds, 2)} s per swing.`;

    $("bp-attributes").innerHTML = `<thead><tr>${B.ATTRIBUTES.map((k) => `<th>${k.toUpperCase()}</th>`).join("")}</tr></thead><tbody><tr>${B.ATTRIBUTES.map((k) => `<td>${bp.attributes[k]}</td>`).join("")}</tr></tbody>`;
    const d = bp.derived;
    const derived = [["ATK", d.atk], ["RATK", d.ratk], ["MATK", d.matk], ["HIT", d.hit], ["FLEE", d.flee], ["CRIT", d.crit], ["Soft DEF", d.softDef], ["Soft MDEF", d.softMdef], ["ASPD", d.aspd]];
    $("bp-derived").innerHTML = `<thead><tr>${derived.map(([k]) => `<th>${k}</th>`).join("")}</tr></thead><tbody><tr>${derived.map(([, v]) => `<td>${v}</td>`).join("")}</tr></tbody>`;

    $("bp-elements").innerHTML = `<thead><tr>${bp.elementDefense.map((e) => `<th>${e.element.slice(0, 4)}</th>`).join("")}</tr></thead><tbody><tr>${bp.elementDefense
      .map((e) => `<td class="${e.percent > 100 ? "bp-weak" : e.percent < 100 ? "bp-strong" : ""}">${e.percent}</td>`)
      .join("")}</tr></tbody>`;

    renderLearnset(bp);
    renderLoot(bp);
    renderPreview();
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(input));
    } catch (e) {
      // Storage is a convenience; the page works without it.
    }
  }

  function renderLearnset(bp) {
    const activeIds = new Set(bp.active.map((a) => a.slot));
    const rows = bp.learnset.map((a) => {
      const known = a.level <= bp.level;
      const status = a.skill ? `<span class="badge text-bg-secondary">skill #${a.skillId}</span>` : '<span class="badge text-bg-info">no skill yet</span>';
      return `<tr class="${known ? "" : "text-body-secondary"}">
        <td><input class="form-check-input" type="checkbox" data-slot="${a.slot}" ${activeIds.has(a.slot) ? "checked" : ""} ${known ? "" : "disabled"} aria-label="Active"></td>
        <td>${a.level}</td><td>${escapeHtml(a.name)}</td><td>${a.archetype.replace("_", " ")}</td><td>${a.element ? a.element.toLowerCase() : "-"}</td>
        <td>${a.skillLevel}</td><td>${a.coef != null ? fmt(a.coef, 2) : "-"}</td><td>${status}</td></tr>`;
    });
    $("bp-learnset").innerHTML = `<thead><tr><th>Active</th><th>Lv</th><th>Attack</th><th>Archetype</th><th>Element</th><th>Skill Lv</th><th>Coefficient</th><th></th></tr></thead><tbody>${rows.join("")}</tbody>
      <caption class="small">${bp.learnset.length} of ${data.learnset.levels.length} slots have an attack from the Attack List.</caption>`;
  }

  function renderLoot(bp) {
    // Rebuilding the rows would steal focus while typing, so only the row count triggers it.
    const body = $("bp-loot");
    if (body.children.length !== loot.length) {
      body.innerHTML = loot
        .map((row, i) => `<tr data-row="${i}">
          <td><input class="form-control form-control-sm" data-loot="item" list="bp-items" value="${escapeHtml(row.item)}" placeholder="start typing"></td>
          <td><input class="form-control form-control-sm" data-loot="chance" type="number" min="0.01" max="100" step="any" value="${row.chance}"></td>
          <td class="small" data-loot-info></td>
          <td><button type="button" class="btn btn-sm btn-outline-danger" data-loot-remove="${i}" aria-label="Remove">×</button></td></tr>`)
        .join("");
    }
    const tierLabel = (id) => data.loot.tiers.find((t) => t.id === id).label.toLowerCase();
    const resolved = bp.loot.rows;
    [...body.querySelectorAll("[data-loot-info]")].forEach((cell, i) => {
      const row = resolved.find((r) => r.name === loot[i].item || r.item === String(loot[i].item).trim().toLowerCase());
      cell.innerHTML = !loot[i].item ? "" : row && row.known ? `${fmt(row.value)} coins, ${tierLabel(row.tier)}` : '<span class="text-warning">not on the Items List</span>';
    });

    const l = bp.loot;
    const share = l.baseline > 0 ? (l.expectedValue / l.baseline) * 100 : 0;
    let verdict;
    if (l.score > 1) {
      const lessExp = Math.round((1 - l.expFactor) * 100);
      const moreHp = Math.round(l.hpBonus * 100);
      const paid = [lessExp ? `${lessExp} % less EXP` : null, moreHp ? `${moreHp} % more HP` : null].filter(Boolean).join(" and ");
      verdict = `That is more than it should drop, so it pays with <strong>${paid || "nothing yet; move the slider"}</strong>.`;
    } else {
      const moreExp = Math.round((l.expFactor - 1) * 100);
      verdict = moreExp > 0
        ? `That is less than it should drop, so it gives <strong>${moreExp} % more EXP</strong> to make up for it.`
        : "That is about what it should drop.";
    }
    $("bp-loot-summary").innerHTML = `
      <p class="mb-1">One kill drops items worth <strong>${fmt(l.expectedValue, 1)} coins</strong> on average (each chance × the item's value).</p>
      <p class="mb-1">A bestia this strong should drop about <strong>${fmt(l.baseline, 1)} coins</strong> per kill: its EXP in coins. This loot is <strong>${fmt(share)} %</strong> of that.</p>
      <p class="mb-0">${verdict}</p>`;
  }

  function renderPreview() {
    if (!current) return;
    const text = previewTab === "mob" ? B.toMobYaml(current) : previewTab === "ai" ? B.toAiAttacksYaml(current) : JSON.stringify(exportJson(), null, 2);
    $("bp-preview").textContent = text;
  }

  // The calculator's own input rides along, so Load JSON restores the form exactly.
  function exportJson() {
    return { ...B.toJson(current), calculatorInput: current.input };
  }

  // --- Events -----------------------------------------------------------------------------------------

  let pending = null;
  const schedule = () => {
    clearTimeout(pending);
    pending = setTimeout(render, 120);
  };

  root.addEventListener("input", (e) => {
    const t = e.target;
    if (t.dataset.loot) {
      const row = loot[Number(t.closest("tr").dataset.row)];
      row[t.dataset.loot] = t.dataset.loot === "chance" ? Number(t.value) : t.value;
    }
    if (t.dataset.field === "ai") $("bp-ai-custom-box").hidden = t.value !== "custom";
    if (["role", "tier", "level", "element"].includes(t.dataset.field)) activeSlots = null;
    if (t.dataset.slot) {
      activeSlots = [...root.querySelectorAll("[data-slot]:checked")].map((el) => Number(el.dataset.slot));
    }
    schedule();
  });
  root.addEventListener("change", (e) => {
    if (["role", "tier", "element"].includes(e.target.dataset.field)) activeSlots = null;
    schedule();
  });

  root.addEventListener("click", (e) => {
    const t = e.target;
    if (t.dataset.lootRemove != null) {
      loot.splice(Number(t.dataset.lootRemove), 1);
      $("bp-loot").innerHTML = "";
      schedule();
    }
    if (t.dataset.bpTab) {
      previewTab = t.dataset.bpTab;
      root.querySelectorAll("[data-bp-tab]").forEach((el) => el.classList.toggle("active", el === t));
      renderPreview();
    }
  });

  $("bp-loot-add").addEventListener("click", () => {
    loot.push({ item: "", chance: 10 });
    $("bp-loot").innerHTML = "";
    render();
  });

  $("bp-attacks-reset").addEventListener("click", () => {
    activeSlots = null;
    render();
  });

  $("bp-manual").addEventListener("change", (e) => {
    $("bp-manual-fields").hidden = !e.target.checked;
    if (e.target.checked && current) fillManual(current.attributes, current.hp, current.attackPower);
    render();
  });

  const say = (text) => {
    $("bp-export-status").textContent = text;
    setTimeout(() => ($("bp-export-status").textContent = ""), 2500);
  };
  const copy = (text, what) =>
    navigator.clipboard.writeText(text).then(
      () => say(`${what} copied.`),
      () => say("The browser blocked the clipboard. Copy it from the preview instead.")
    );

  $("bp-copy-prompt").addEventListener("click", () => copy(B.llmPrompt(current), "Prompt"));
  $("bp-copy-json").addEventListener("click", () => copy(JSON.stringify(exportJson(), null, 2), "JSON"));
  $("bp-download-json").addEventListener("click", () => {
    const blob = new Blob([JSON.stringify(exportJson(), null, 2)], { type: "application/json" });
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = `${current.input.identifier}.blueprint.json`;
    a.click();
    URL.revokeObjectURL(a.href);
  });
  $("bp-load-toggle").addEventListener("click", () => ($("bp-load").hidden = !$("bp-load").hidden));
  $("bp-load-apply").addEventListener("click", () => {
    try {
      const parsed = JSON.parse($("bp-load-text").value);
      if (!parsed.calculatorInput) throw new Error("no calculatorInput");
      writeInput(parsed.calculatorInput);
      $("bp-loot").innerHTML = "";
      $("bp-load").hidden = true;
      render();
      say("Blueprint loaded.");
    } catch (err) {
      say("That is not a blueprint exported from this page.");
    }
  });

  try {
    const saved = JSON.parse(localStorage.getItem(STORAGE_KEY) || "null");
    if (saved) writeInput(saved);
  } catch (e) {
    // A stale or blocked store just means the defaults.
  }

  // Items and attacks come from the same files the Items List and Attack List pages render.
  const fetchJson = (url) => fetch(url).then((r) => (r.ok ? r.json() : Promise.reject(new Error(`${url}: ${r.status}`))));
  Promise.all([fetchJson(root.dataset.itemsUrl), fetchJson(root.dataset.attacksUrl)])
    .then(([items, attacks]) => {
      data.items = items;
      data.attacks = attacks;
      $("bp-items").innerHTML = items.map((it) => `<option value="${escapeHtml(it.id)}">${escapeHtml(it.name)}, ${it.value} coins</option>`).join("");
    })
    .catch((err) => {
      data.items = [];
      data.attacks = [];
      $("bp-warnings").insertAdjacentHTML("beforebegin", `<div class="alert alert-danger small">Could not load the item and attack lists (${escapeHtml(err.message)}). Loot and existing attacks are missing.</div>`);
    })
    .finally(render);
})();
