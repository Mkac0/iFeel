const emotions = [
  "Happy",
  "Calm",
  "Okay",
  "Sad",
  "Stressed",
  "Anxious",
  "Angry",
  "Overwhelmed",
  "Tired",
];

function PickEmotion({ selectedEmotions, onChange }) {
  function toggleEmotion(emotion) {
    if (selectedEmotions.includes(emotion)) {
      onChange(
        selectedEmotions.filter((selected) => selected !== emotion)
      );
    } else {
      onChange([...selectedEmotions, emotion]);
    }
  }

  return (
    <div>
      <h3>How are you feeling?</h3>
      <div className="emotion-picker">
        {emotions.map((emotion) => (
          <button
            key={emotion}
            type="button"
            className={
              selectedEmotions.includes(emotion)
                ? "emotion-button emotion-button--selected"
                : "emotion-button"
            }
            onClick={() => toggleEmotion(emotion)}
          >
            {emotion}
          </button>
        ))}
      </div>
    </div>
  );
}

export default PickEmotion;