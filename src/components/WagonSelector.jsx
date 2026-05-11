import { useState } from "react";

export default function WagonSelector({ onSelect }) {

  const [active, setActive] = useState(1);

  const wagons = [
    { id: 1, name: "Platzkart" },
    { id: 2, name: "Platzkart" },
    { id: 3, name: "Platzkart" },
    { id: 4, name: "Kupe" },
    { id: 5, name: "Kupe" },
    { id: 6, name: "VIP" }
  ];

  function handleClick(id) {
    setActive(id);
    onSelect(id);
  }

  return (
    <div>
      <h3>🚃 Wagons</h3>

      <div
        style={{
          display: "flex",
          gap: "10px",
          flexWrap: "wrap"
        }}
      >
        {wagons.map(w => (
          <button
            key={w.id}
            onClick={() => handleClick(w.id)}
            style={{
              padding: "10px 14px",
              borderRadius: "8px",
              border: "1px solid #ccc",
              cursor: "pointer",
              background: active === w.id ? "#aa3bff" : "white",
              color: active === w.id ? "white" : "black",
              transition: "0.2s"
            }}
          >
            {w.name} {w.id}
          </button>
        ))}
      </div>
    </div>
  );
}