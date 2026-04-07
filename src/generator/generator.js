import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const patternsData = JSON.parse(
  fs.readFileSync(path.join(__dirname, "../data/patterns.json"))
);

const themes = JSON.parse(
  fs.readFileSync(path.join(__dirname, "../data/themes.json"))
);

const colors = JSON.parse(
  fs.readFileSync(path.join(__dirname, "../data/colors.json"))
);

import { validateTheme } from "../core/validator.js";
import { buildThemeStructure } from "../core/themeEngine.js";
import { applyColors } from "../core/colorEngine.js";
import { applyHeights } from "../core/templateEngine.js";

export function generateSock(config = {}) {
  const {
    themeName = "bee",
    gauge = 28,
    footCircumference = 22,
    ease = -2,
    heel = "flap"
  } = config;

  const theme = themes[themeName];
  const themeColors = colors[themeName];
  const patterns = patternsData.patterns;

  if (!theme) throw new Error("Theme not found");

  validateTheme(theme, patterns);

  let structure = buildThemeStructure(theme, patterns);
  structure = applyColors(structure, themeColors);
  structure = applyHeights(structure);

  const stitchesPerCm = gauge / 10;
  const castOnRaw = (footCircumference + ease) * stitchesPerCm;
  const castOn = Math.round(castOnRaw / 4) * 4;

  return {
    castOn,
    pattern: null,
    structure,
    theme: themeName,
    gauge,
    heel
  };
}
