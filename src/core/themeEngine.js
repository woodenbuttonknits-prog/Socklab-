export function buildThemeStructure(theme, patterns) {
  const roles = theme.motifRoles;

  function pick(ids) {
    const options = patterns.filter(p => ids.includes(p.id));
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