import { useState } from "react";

export default function BookingForm({ onSubmit }) {

  const [name, setName] = useState("");

  function handleSubmit(e) {
    e.preventDefault();

    onSubmit({
      name
    });

    setName("");
  }

  return (
    <form onSubmit={handleSubmit} style={{ marginTop: "20px" }}>

      <h3>👤 Passenger info</h3>

      <input
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        style={{
          display: "block",
          marginBottom: "10px",
          padding: "8px",
          width: "200px"
        }}
      />

      <button type="submit">
        Continue
      </button>

    </form>
  );
}