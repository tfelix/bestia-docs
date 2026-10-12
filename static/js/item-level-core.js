// The item level rules of the forging page. No DOM in here, so node can load it for checks.
// Mirrors the server's ItemLevel and MasterCraftBonusService.rollCap; the numbers come from data/item_stats.yaml.
(function (root) {
  "use strict";

  function unitsPerPoint(data, statId) {
    const stat = data.stats.find((s) => s.id === statId);
    if (!stat) throw new Error("unknown stat " + statId);
    return stat.unitsPerPoint;
  }

  // Never below zero: drawbacks may cancel bonuses, but an item does not fall under its base level.
  function points(data, stats, sockets) {
    const fromStats = stats.reduce((sum, s) => sum + s.value / unitsPerPoint(data, s.stat), 0);
    return Math.max(0, fromStats + (sockets || 0) * data.pointsPerSocket);
  }

  function itemLevel(data, baseLevel, stats, sockets) {
    const statLevel = data.levelsPerPoint * points(data, stats, sockets);
    return Math.round(Math.sqrt(baseLevel * baseLevel + statLevel * statLevel));
  }

  function category(data, level) {
    return data.categories.find((c) => c.upTo === null || level <= c.upTo).label;
  }

  // The highest stat level a forge can roll: the smith's reliable item level and the main material + 20.
  function rollCap(data, forgeRank, materialLevel) {
    const reach = forgeRank >= data.uncappedAtRank ? Infinity : data.reliableLevelPerRank * Math.max(0, forgeRank);
    return Math.min(reach, materialLevel + data.materialHeadroom);
  }

  // The top roll of one stat alone that an item of this level carries.
  function topSingleStat(data, level, statId) {
    return Math.floor((level / data.levelsPerPoint) * unitsPerPoint(data, statId));
  }

  const api = { points, itemLevel, category, rollCap, topSingleStat };
  if (typeof module !== "undefined" && module.exports) module.exports = api;
  else root.ItemLevelCore = api;
})(typeof window !== "undefined" ? window : globalThis);
