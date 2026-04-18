export function applyColors(structure, themeColors) {
  const roleMap = {
    filler: ["mc", "soft"],
    support: ["medium", "accent"],
    hero: ["strong", "mc"]
  };

  return structure.map(pattern => {
    const keys = roleMap[pattern.role] || ["mc"];
    return {
      ...pattern,
      colors: keys.map(k => themeColors[k])
    };
  });
}

export function applyChartColors(structure) {
  return structure.map(pattern => {
    const chart = pattern.chart || [];
    const fallbackA = pattern.colors?.[0] || "black";
    const fallbackB = pattern.colors?.[1] || "white";

    const palette = {
      X: pattern.debugPalette?.X || fallbackA,
      ".": pattern.debugPalette?.["."] || fallbackB
    };

    return {
      ...pattern,
      chartColors: chart.map(row =>
        row.split("").map(symbol => palette[symbol] || fallbackB)
      )
    };
  });
}
