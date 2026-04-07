import patternsData from "../data/patterns.json";
import themes from "../data/themes.json";
import colors from "../data/colors.json";

import { buildThemeStructure } from "../core/themeEngine.js";
import { applyColors } from "../core/colorEngine.js";
import { applyHeights } from "../core/templateEngine.js";
import { getFootCircumference } from "../core/sizeConverter.js";

export function generateSock(config = {}) {
  const patterns = patternsData.patterns;

  const size = config.size || 38;
  const themeName = config.themeName || "bee";

  const theme = themes[themeName];
  const themeColors = colors[themeName];

  if (!theme) {
    throw new Error("Theme not found");
  }

  // -------------------------
  // SIZE → STITCHES
  // -------------------------
  const footCircumference = getFootCircumference(size);

  const stitchesPer10cm = 30; // fingering standaard
  const castOnRaw = (footCircumference / 10) * stitchesPer10cm;

  // -------------------------
  // STRUCTURE (patterns)
  // -------------------------
  let structure = buildThemeStructure(theme, patterns);

  structure = applyColors(structure, themeColors);
  structure = applyHeights(structure);

  // -------------------------
  // REPEAT LOGIC (BELANGRIJK)
  // -------------------------
  const maxRepeat = Math.max(
    ...structure.map(p => p.repeat || 1)
  );

  const baseMultiple = Math.max(4, maxRepeat);

  const castOn =
    Math.round(castOnRaw / baseMultiple) * baseMultiple;

  // -------------------------
  // SCALE PATTERN WIDTH
  // -------------------------
  structure = structure.map(pattern => {
    return {
      ...pattern,
      width: castOn
    };
  });

  // -------------------------
  // SECTIONS (future-proof)
  // -------------------------
  const sections = {
    cuff: { rounds: 20 },
    leg: structure,
    heel: { type: "flap" },
    foot: { lengthCm: size * 0.6 },
    toe: {}
  };

  // -------------------------
  // OUTPUT
  // -------------------------
  return {
    size,
    castOn,
    structure,   // backward compatibility
    sections,    // nieuwe structuur
    theme: themeName
  };
}