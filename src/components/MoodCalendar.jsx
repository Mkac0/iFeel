import { useState } from "react";
import CalendarDay from "./CalendarDay";
import { wellbeingColors } from "../utils/wellbeingColors";

function MoodCalendar() {
  const [selectedDay, setSelectedDay] = useState(null);

  const moodData = {
    "2026-09-01": {
      score: 2,
      emotions: ["happy", "calm"],
    },
    "2026-09-02": {
      score: 3,
      emotions: ["okay"],
    },
    "2026-09-03": {
      score: 5,
      emotions: ["okay", "sad"],
    },
    "2026-09-04": {
      score: 7,
      emotions: ["stressed"],
    },
    "2026-09-05": {
      score: 9,
      emotions: ["anxious", "sad"],
    },
    "2026-09-06": {
      score: 10,
      emotions: ["overwhelmed", "anxious"],
    },
    "2026-09-07": {
      score: 8,
      emotions: ["sad"],
    },
    "2026-09-08": {
      score: 5,
      emotions: ["okay", "tired"],
    },
    "2026-09-09": {
      score: 4,
      emotions: ["okay"],
    },
    "2026-09-10": {
      score: 2,
      emotions: ["happy"],
    },
  };

  function generateCalendarDays() {
    const today = new Date();

    const endDate = new Date(today);
    const startDate = new Date(today);

    startDate.setFullYear(today.getFullYear() - 1);

    // Move start date back to Sunday so our weeks line up
    startDate.setDate(startDate.getDate() - startDate.getDay());

    const days = [];
    const currentDate = new Date(startDate);

    while (currentDate <= endDate) {
      const dateString = currentDate.toISOString().split("T")[0];

      days.push({
        date: dateString,
        dateObject: new Date(currentDate),
        score: moodData[dateString]?.score,
        emotions: moodData[dateString]?.emotions || [],
      });

      currentDate.setDate(currentDate.getDate() + 1);
    }

    return days;
  }

  const days = generateCalendarDays();

  const weeks = [];

  for (let i = 0; i < days.length; i += 7) {
    weeks.push(days.slice(i, i + 7));
  }

  const monthLabels = weeks.map((week, index) => {
    const firstDay = week[0];

    if (!firstDay) {
      return null;
    }

    const currentMonth = firstDay.dateObject.getMonth();

    const previousMonth =
      index > 0 ? weeks[index - 1][0].dateObject.getMonth() : null;

    if (index === 0 || currentMonth !== previousMonth) {
      return firstDay.dateObject.toLocaleString("default", {
        month: "short",
      });
    }

    return "";
  });

  function handleDayClick(date) {
    setSelectedDay(date);
  }

  const selectedMood = selectedDay ? moodData[selectedDay] : null;

  return (
    <section
      style={{
        padding: "24px",
        maxWidth: "1100px",
        margin: "0 auto",
      }}
    >
      <h2>Your emotional year</h2>
      <p>This is how you've been feeling.</p>

      <div
        style={{
          overflowX: "auto",
          paddingBottom: "16px",
        }}
      >
        <div
          style={{
            display: "flex",
            gap: "8px",
          }}
        >
          <div
            style={{
              display: "grid",
              gridTemplateRows: "20px repeat(7, 14px)",
              rowGap: "4px",
              fontSize: "12px",
              color: "#6b7280",
            }}
          >
            <div />

            <div />
            <div>Mon</div>
            <div />
            <div>Wed</div>
            <div />
            <div>Fri</div>
            <div />
          </div>

          <div>
            <div
              style={{
                display: "grid",
                gridAutoFlow: "column",
                gridAutoColumns: "14px",
                gap: "4px",
                height: "20px",
                fontSize: "12px",
                color: "#6b7280",
              }}
            >
              {monthLabels.map((month, index) => (
                <div
                  key={index}
                  style={{
                    whiteSpace: "nowrap",
                    overflow: "visible",
                  }}
                >
                  {month}
                </div>
              ))}
            </div>

            <div
              style={{
                display: "grid",
                gridTemplateRows: "repeat(7, 14px)",
                gridAutoFlow: "column",
                gridAutoColumns: "14px",
                gap: "4px",
                width: "max-content",
              }}
            >
              {days.map((day) => (
                <CalendarDay
                  key={day.date}
                  date={day.date}
                  score={day.score}
                  emotions={day.emotions}
                  onClick={handleDayClick}
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "6px",
          marginTop: "16px",
          fontSize: "14px",
        }}
      >
        <span>Doing well</span>

        {[1, 3, 5, 7, 9, 10].map((score) => (
          <div
            key={score}
            style={{
              width: "14px",
              height: "14px",
              borderRadius: "3px",
              backgroundColor: wellbeingColors[score],
            }}
          />
        ))}

        <span>Difficult</span>
      </div>

      {selectedDay && (
        <div
          style={{
            marginTop: "24px",
            padding: "16px",
            border: "1px solid #d1d5db",
            borderRadius: "8px",
          }}
        >
          <h3>{selectedDay}</h3>

          {selectedMood ? (
            <>
              <p>
                <strong>Score:</strong> {selectedMood.score}/10
              </p>

              <p>
                <strong>Emotions:</strong>{" "}
                {selectedMood.emotions.join(", ")}
              </p>
            </>
          ) : (
            <p>No mood entry recorded for this day.</p>
          )}
        </div>
      )}
    </section>
  );
}

export default MoodCalendar;