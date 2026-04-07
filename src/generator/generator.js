import patternsData from "../data/patterns.json";
import themes from "../data/themes.json";
import colors from "../data/colors.json";

import { buildThemeStructure } from "../core/themeEngine.js";
import { applyColors } from "../core/colorEngine.js";
import { applyHeights } from "../core/templateEngine.js";
import { convertToEU, getFootCircumference } from "../core/sizeConverter.js";   

// -------------------------
// HELPERS
// -------------------------

function getGauge(yarn, needle) {
  // simpele basis (later uitbreiden)
  if (yarn === "fingering") return 30;
  if (yarn === "dk") return 24;
  if (yarn === "worsted") return 20;

  return 28;
}

function calculateCastOn(size, gauge) {
  const euSize = convertToEU(size, config.sizeSystem || "EU");
  const footCircumference = getFootCircumference(euSize);
  const stitches = (footCircumference / 10) * gauge;

  return Math.round(stitches / 4) * 4; // deelbaar door 4
}

// -------------------------
// MAIN
// -------------------------

export function generateSock(config = {}) {
  const {
    size = 38,
    yarn = "fingering",
    needle = 2.5,
    construction = "top-down",
    heel = "flap",
    themeName = "bee"
  } = config;

  const patterns = patternsData.patterns;
  const theme = themes[themeName];
  const themeColors = colors[themeName];

  if (!theme) {
    throw new Error("Theme not found");
  }

  // -------------------------
  // GAUGE + STITCHES
  // -------------------------
  const gauge = getGauge(yarn, needle);
  const castOn = calculateCastOn(size, gauge);

  // -------------------------
  // STRUCTURE (colorwork bands)
  // -------------------------
  let structure = buildThemeStructure(theme, patterns);

  structure = applyColors(structure, themeColors);
  structure = applyHeights(structure);

  // -------------------------
  // SECTIONS (BELANGRIJK!)
  // -------------------------
  const sections =
    construction === "top-down"
      ? {
          cuff: { rounds: 20 },
          leg: structure,
          heel: { type: heel },
          foot: { lengthCm: size * 0.6 },
          toe: {}
        }
      : {
          toe: {},
          foot: { lengthCm: size * 0.6 },
          heel: { type: heel },
          leg: structure,
          cuff: { rounds: 20 }
        };

  // -------------------------
  // OUTPUT
  // -------------------------
  return {
    size,
    gauge,
    castOn,
    construction,
    heel,
    structure,
    sections,
    theme: themeName
  };
}