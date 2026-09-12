import { getWellbeingColor } from "../utils/wellbeingColors";

function CalendarDay({ date, score, emotions = [] }) {
  const backgroundColor = getWellbeingColor(score);

  const tooltip = score
    ? `${date} | ${emotions.join(", ")} | ${score}/10`
    : `${date} | No entry`;

  return (
    <div
      title={tooltip}
      style={{
        width: "14px",
        height: "14px",
        borderRadius: "3px",
        backgroundColor,
        cursor: "pointer",
        border: "1px solid rgba(0, 0, 0, 0.08)",
      }}
    />
  );
}

export default CalendarDay;