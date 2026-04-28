export default function TrainCard({ train }) {
  return (
    <div className="trainCard">
      <h3>🚆 {train.number}</h3>

      <p>
        <b>From:</b> {train.from}
      </p>

      <p>
        <b>To:</b> {train.to}
      </p>

      <p>
        <b>Time:</b> {train.time}
      </p>

      <p>
        <b>Duration:</b> {train.duration}
      </p>
    </div>
  );
}