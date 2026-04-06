export function applyHeights(structure) {
  return structure.map(pattern => ({
    ...pattern,
    rounds: pattern.height || 8
  }));
}