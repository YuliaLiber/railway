import { useParams } from "react-router-dom";
import { useState } from "react";
import WagonSelector from "../components/WagonSelector";

export default function Booking() {

  const { trainId } = useParams();
  const [wagon, setWagon] = useState(1);

  return (
    <div>
      <h1>🎟 Booking Page</h1>

      <p>Train ID: {trainId}</p>

      <WagonSelector onSelect={setWagon} />

      <h3 style={{ marginTop: "20px" }}>
        Selected wagon: {wagon}
      </h3>
    </div>
  );
}