import { getWellbeingColor } from "../utils/wellbeingColors";

function CalendarDay({ date, score, emotions = [], onClick, isSelected, isToday }) {
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
      className={[
        "mood-calendar__day",
        isSelected && "mood-calendar__day--selected",
        isToday && "mood-calendar__day--today",
      ].filter(Boolean).join(" ")}
      style={{ backgroundColor }}
    />
  );
}

export default CalendarDay;