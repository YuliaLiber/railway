export default function WagonSelector() {

  const wagons = [
  { id: 1, name: "Platzkart" },
  { id: 2, name: "Platzkart" },
  { id: 3, name: "Platzkart" },
  { id: 4, name: "Kupe" },
  { id: 5, name: "Kupe" },
  { id: 6, name: "VIP" }
];

  return (
    <div>
      <h3>🚃 Wagons</h3>

      <div style={{ display: "flex", gap: "10px" }}>
        {wagons.map(w => (
          <button 
          key={w}
             style={{
              padding: "10px 14px",
              borderRadius: "8px",
              border: "1px solid #ccc",
              background: "white",
              cursor: "pointer",
              transition: "0.2s"
            }}
          >
            Wagon {w}
          </button>
        ))}
      </div>
    </div>
  );
}