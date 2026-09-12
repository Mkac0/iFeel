import { getWellbeingColor } from "../utils/wellbeingColors";

function CalendarDay({ date, score, emotions = [], onClick }) {
  const backgroundColor = getWellbeingColor(score);

  const tooltip = score
    ? `${date} | ${emotions.join(", ")} | ${score}/10`
    : `${date} | No entry`;

  return (
    <button
      type="button"
      title={tooltip}
      onClick={() => onClick(date)}
      aria-label={tooltip}
      className="mood-calendar__day"
      style={{ backgroundColor }}
    />
  );
}

export default CalendarDay;