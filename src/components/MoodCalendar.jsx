import { useState } from "react";
import CalendarDay from "./CalendarDay";
import { wellbeingColors } from "../utils/wellbeingColors";
import "./MoodCalendar.css";
import MoodEntryForm from "./MoodEntryForm";

function MoodCalendar() {
  const [selectedDay, setSelectedDay] = useState(null);

  const [moodData, setMoodData] = useState({
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
      emotions: ["stressed", "angry"],
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
  });

  function handleSaveMood(entry) {
    setMoodData((currentMoodData) => ({
      ...currentMoodData,
      [entry.date]: {
        score: entry.score,
        emotions: entry.emotions,
        note: entry.note,
      },
    }));
  }

  function generateCalendarDays() {
    const today = new Date();
    const endDate = new Date(today);
    const startDate = new Date(today);

    startDate.setFullYear(today.getFullYear() - 1);
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
    const previousMonth = index > 0 ? weeks[index - 1][0].dateObject.getMonth() : null;

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
    <section className="mood-calendar">

    <div className="mood-calendar__header">
      <h2 className="mood-calendar__title">Your emotional year</h2>
      <p className="mood-calendar__subtitle">This is how you've been feeling.</p>
    </div>

      <div className="mood-calendar__scroll">
        <div className="mood-calendar__layout">
          <div className="mood-calendar__corner" />

          <div className="mood-calendar__month-labels">
            {monthLabels.map((month, index) => (
              <div
                key={index}
                className="mood-calendar__month-label"
              >
                {month}
              </div>
            ))}
          </div>

          <div className="mood-calendar__day-labels">
            <div />
            <div>Mon</div>
            <div />
            <div>Wed</div>
            <div />
            <div>Fri</div>
            <div />
          </div>

          <div className="mood-calendar__grid">
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

        <div className="mood-calendar__legend">
        <span>Doing well</span>

        {[1, 3, 5, 7, 9, 10].map((score) => (
          <div
            key={score}
            className="mood-calendar__legend-square"
            style={{
              backgroundColor: wellbeingColors[score],
            }}
          />
        ))}

        <span>Difficult</span>
      </div>

      {selectedDay && (
        <div className="mood-calendar__details">
          <h3>{selectedDay}</h3>
          {selectedMood ? (
            <>
              <p>
                <strong>Score:</strong>{" "}
                {selectedMood.score}/10
              </p>
              <p>
                <strong>Emotions:</strong>{" "}
                {selectedMood.emotions.join(", ")}
              </p>
              {selectedMood.note && (
                <p>
                  <strong>Note:</strong>{" "}
                  {selectedMood.note}
                </p>
              )}
            </>
          ) : (
            <p>No mood entry recorded for this day.</p>
          )}

          <MoodEntryForm
            date={selectedDay}
            onSave={handleSaveMood}
          />
        </div>
      )}

      <div className="mood-calendar__footer">
        <p>© 2026 iFeel. All rights reserved.</p>
      </div>
    </div>
    </section>
  );
}

export default MoodCalendar;