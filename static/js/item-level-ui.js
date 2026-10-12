// The form of the item level calculator. The rules live in item-level-core.js.
(function () {
  "use strict";

  const root = document.getElementById("il-calculator");
  if (!root) return;

  const core = window.ItemLevelCore;
  const data = JSON.parse(document.getElementById("il-data").textContent);
  const rows = root.querySelector("#il-stats");
  const template = root.querySelector("#il-stat-row");

  function addRow(stat, value) {
    const row = template.content.firstElementChild.cloneNode(true);
    row.querySelector("[data-stat]").value = stat;
    row.querySelector("[data-value]").value = value;
    row.querySelector("[data-remove]").addEventListener("click", () => {
      row.remove();
      render();
    });
    rows.appendChild(row);
  }

  function number(id) {
    return Number(root.querySelector(id).value) || 0;
  }

  function stats() {
    return Array.from(rows.children).map((row) => ({
      stat: row.querySelector("[data-stat]").value,
      value: Number(row.querySelector("[data-value]").value) || 0,
    }));
  }

  function render() {
    const base = Math.max(1, number("#il-base"));
    const sockets = Math.max(0, number("#il-sockets"));
    const points = core.points(data, stats(), sockets);
    const level = core.itemLevel(data, base, stats(), sockets);
    const cap = core.rollCap(data, number("#il-rank"), number("#il-material"));

    root.querySelector("#il-points").textContent = points.toFixed(1);
    root.querySelector("#il-level").textContent = level;
    root.querySelector("#il-category").textContent = core.category(data, level);
    root.querySelector("#il-top").textContent = "+" + core.topSingleStat(data, level, "STR");
    root.querySelector("#il-cap").textContent =
      cap === Infinity ? "no limit" : cap + " (" + (cap / data.levelsPerPoint).toFixed(1) + " points)";
  }

  root.querySelector("#il-add").addEventListener("click", () => {
    addRow("STR", 1);
    render();
  });
  root.addEventListener("input", render);

  addRow("STR", 4);
  addRow("DEX", 1);
  render();
})();
