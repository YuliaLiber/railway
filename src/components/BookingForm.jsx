import { useState } from "react";

export default function BookingForm({ onSubmit }) {

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");

  function handleSubmit(e) {
    e.preventDefault();

    onSubmit({
      name,
      phone
    });

    setName("");
    setPhone("");
  }

  return (
    <form onSubmit={handleSubmit} style={{ marginTop: "20px" }}>

      <h3>👤 Passenger info</h3>

      <input
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        style={{ display: "block", marginBottom: "10px" }}
      />

      <input
        placeholder="Phone"
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
        style={{ display: "block", marginBottom: "10px" }}
      />

      <button type="submit">
        Continue
      </button>

    </form>
  );
}