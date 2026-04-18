export function buildInstructions(sock) {
  const lines = [];

  if (!sock) {
    return "No sock data generated.";
  }

  // -------------------------
  // CAST ON
  // -------------------------
  if (sock.castOn) {
    lines.push(`Cast on ${sock.castOn} stitches.`);
    lines.push(`Join in the round, being careful not to twist.`);
  }

  // -------------------------
  // CUFF
  // -------------------------
  if (sock.sections?.cuff) {
    lines.push(``);
    lines.push(`CUFF:`);
    lines.push(
      `Work ribbing for ${sock.sections.cuff.rounds || 15} rounds.`
    );
  }

  // -------------------------
  // LEG
  // -------------------------
  if (sock.structure) {
    lines.push(``);
    lines.push(`LEG:`);

    sock.structure.forEach((band, i) => {
      if (!band) return;

      lines.push(`Band ${i + 1}: ${band.id}`);

      if (band.rounds) {
        lines.push(`Work ${band.rounds} rounds in pattern.`);
      }

      if (band.repeat) {
        lines.push(`Repeat every ${band.repeat} stitches.`);
      }

      if (band.chart && band.chart.length) {
        lines.push(`Chart preview:`);
        band.chart.forEach(row => lines.push(`  ${row}`));
      }

      if (band.debugPalette) {
        lines.push(
          `Debug colors: X=${band.debugPalette.X || "(theme primary)"}, .=${band.debugPalette["."] || "(theme secondary)"}`
        );
      }
    });
  }

  // -------------------------
  // HEEL
  // -------------------------
  if (sock.heel === "flap") {
    lines.push(``);
    lines.push(`HEEL (Heel Flap):`);
    lines.push(
      `Work heel flap over half stitches (${Math.floor(sock.castOn / 2)}).`
    );
    lines.push(`Row 1: Slip 1, knit across.`);
    lines.push(`Row 2: Slip 1, purl across.`);
    lines.push(`Repeat until square.`);
  }

  // -------------------------
  // FOOT
  // -------------------------
  if (sock.sections?.foot) {
    lines.push(``);
    lines.push(`FOOT:`);
    lines.push(
      `Continue until foot measures ${sock.sections.foot.lengthCm || 20} cm.`
    );
  }

  // -------------------------
  // TOE
  // -------------------------
  lines.push(``);
  lines.push(`TOE:`);
  lines.push(
    `Round 1: *K2tog, knit to 3 stitches before end, SSK, K1*`
  );
  lines.push(`Repeat until few stitches remain.`);
  lines.push(`Close toe.`);

  return lines.join("\n");
}