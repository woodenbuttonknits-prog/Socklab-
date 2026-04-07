export function buildThemeStructure(theme, patterns) {
  const roles = theme.motifRoles;

  function pick(ids) {
  const options = patterns.filter(p => ids.includes(p.id));

  if (options.length === 0) {
    console.error("No patterns found for:", ids);
    return null;
  }

  return options[Math.floor(Math.random() * options.length)];
}

  if (theme.composition === "centered_hero") {
    return [
      pick(roles.filler),
      pick(roles.support),
      pick(roles.hero),
      pick(roles.support),
      pick(roles.filler)
    ];
  }

  return [];
}