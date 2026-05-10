export default function WagonSelector() {

  const wagons = [1, 2, 3, 4, 5];

  return (
    <div>
      <h3>🚃 Wagons</h3>

      <div style={{ display: "flex", gap: "10px" }}>
        {wagons.map(w => (
          <button key={w}>
            Wagon {w}
          </button>
        ))}
      </div>
    </div>
  );
}