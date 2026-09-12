export const wellbeingColors = {
  1: "#166534",
  2: "#22c55e",
  3: "#86efac",
  4: "#bef264",
  5: "#fde047",
  6: "#fbbf24",
  7: "#fb923c",
  8: "#fb7185",
  9: "#ef4444",
  10: "#991b1b",
};

export function getWellbeingColor(score) {
  if (!score) {
    return "#e5e7eb";
  }

  return wellbeingColors[score] || "#e5e7eb";
}