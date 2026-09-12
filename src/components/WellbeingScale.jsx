function WellbeingScale({ score, onChange }) {
  return (
    <div>
      <h3>How difficult does this feel right now?</h3>
      <div className="wellbeing-scale">
        <span>Doing well</span>

        <input
          type="range"
          min="1"
          max="10"
          value={score}
          onChange={(event) =>
            onChange(Number(event.target.value))
          }
        />

        <span>Very difficult</span>
      </div>
      <p>Current score: <strong>{score}/10</strong></p>
    </div>
  );
}

export default WellbeingScale;