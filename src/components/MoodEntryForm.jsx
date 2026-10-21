import { useState, useEffect } from "react";
import PickEmotion from "./PickEmotion";
import WellbeingScale from "./WellbeingScale";
import "./MoodEntryForm.css";

function MoodEntryForm({ date, onSave, existingEntry }) {
  const [selectedEmotions, setSelectedEmotions] = useState([]);
  const [score, setScore] = useState(5);
  const [note, setNote] = useState("");
  const [saveMessage, setSaveMessage] = useState("");
  const [messageType, setMessageType] = useState("success");

  useEffect(() => {
    setSelectedEmotions(existingEntry?.emotions || []);
    setScore(existingEntry?.score ?? 5);
    setNote(existingEntry?.note || "");
    setSaveMessage("");
  }, [date, existingEntry]);

  async function handleSubmit(event) {
    event.preventDefault();
    setSaveMessage("");

    if (selectedEmotions.length === 0) {
      alert("Please choose at least one emotion.");
      return;
    }

    const entry = {date, emotions: selectedEmotions, score, note};

    try {
      await onSave(entry);
      setSaveMessage("✓ Check-in saved successfully!");
      setMessageType("success");
    } catch (error) {
      setSaveMessage("Something went wrong, please try again.");
      setMessageType("error");
    }
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
        {existingEntry ? "Update Entry" : "Save Entry"}
      </button>
      {saveMessage && (
        <p className={`mood-entry-form__message mood-entry-form__message--${messageType}`} role={messageType === "error" ? "alert" : "status"}>
          {saveMessage}
        </p>
      )}
    </form>
  );
}

export default MoodEntryForm;