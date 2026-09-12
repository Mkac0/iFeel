import { useState } from "react";
import PickEmotion from "./PickEmotion";
import WellbeingScale from "./WellbeingScale";

function MoodEntryForm({ date, onSave }) {
  const [selectedEmotions, setSelectedEmotions] = useState([]);
  const [score, setScore] = useState(5);
  const [note, setNote] = useState("");

  function handleSubmit(event) {
    event.preventDefault();

    if (selectedEmotions.length === 0) {
      alert("Please choose at least one emotion.");
      return;
    }

    const entry = {date, emotions: selectedEmotions, score, note};

    onSave(entry);
    setSelectedEmotions([]);
    setScore(5);
    setNote("");
  }

  return (
    <form
      className="mood-entry-form"
      onSubmit={handleSubmit}
    >
      <h2>Check in</h2>
      <p>{date}</p>

      <PickEmotion
        selectedEmotions={selectedEmotions}
        onChange={setSelectedEmotions}
      />

      <WellbeingScale
        score={score}
        onChange={setScore}
      />

      <div className="mood-entry-form__note">
        <label htmlFor="mood-note">Add a note</label>
        <textarea
          id="mood-note"
          value={note}
          onChange={(event) =>
            setNote(event.target.value)
          }
          placeholder="What happened today?"
        />
      </div>

      <button
        type="submit"
        className="mood-entry-form__submit"
      >
        Save check-in
      </button>
    </form>
  );
}

export default MoodEntryForm;