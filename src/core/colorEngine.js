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