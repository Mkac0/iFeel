import React from 'react';
import CalendarDay from "./CalendarDay";
import { wellbeingColors } from "../utils/wellbeingColors";

function MoodCalendar() {
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

  function generateDays(numberOfDays = 365) {
    const days = [];
    const today = new Date();

    const startDate = new Date(today);
    startDate.setDate(today.getDate() - numberOfDays);

    for (let i = 0; i <= numberOfDays; i++) {
      const currentDate = new Date(startDate);
      currentDate.setDate(startDate.getDate() + i);

      const dateString = currentDate.toISOString().split("T")[0];
      days.push({
        date: dateString,
        score: moodData[dateString]?.score,
        emotions: moodData[dateString]?.emotions || [],
      });
    }

    return days;
  }

  const days = generateDays();

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
            display: "grid",
            gridTemplateRows: "repeat(7, 14px)",
            gridAutoFlow: "column",
            gridAutoColumns: "14px",
            gap: "4px",
            width: "max-content",
            padding: "20px 0",
          }}
        >
          {days.map((day) => (
            <CalendarDay
              key={day.date}
              date={day.date}
              score={day.score}
              emotions={day.emotions}
            />
          ))}
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
    </section>
  );
}

export default MoodCalendar;