import { useState } from "react";

export default function BookingForm({ onSubmit }) {

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");

  function handleSubmit(e) {
    e.preventDefault();

    if (!name || !phone || !email) {
      setError("All fields are required");
      return;
    }

    if (!email.includes("@")) {
      setError("Invalid email");
      return;
    }

    setError("");

    onSubmit({
      name,
      phone,
      email
    });

    setName("");
    setPhone("");
    setEmail("");
  }

  return (
    <form onSubmit={handleSubmit} style={{ marginTop: "20px" }}>

      <h3>👤 Passenger info</h3>

      {error && (
        <p style={{ color: "red" }}>{error}</p>
      )}

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

      <input
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        style={{ display: "block", marginBottom: "10px" }}
      />

      <button type="submit">
        Continue
      </button>

    </form>
  );
}