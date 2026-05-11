import { useParams } from "react-router-dom";
import { useState } from "react";
import WagonSelector from "../components/WagonSelector";
import { saveBooking } from "../services/bookingService";

export default function Booking() {

  const { trainId } = useParams();
  const [wagon, setWagon] = useState(1);

  function handleBook() {
  saveBooking({
    trainId,
    wagon,
    seat: selectedSeat
  });
}

  return (
  <div>
    <h1>🎟 Booking Page</h1>

    <p>Train ID: {trainId}</p>

    <WagonSelector onSelect={setWagon} />

    <h3>Selected wagon: {wagon}</h3>

    <button onClick={handleBook}>
      🎟 Book ticket
    </button>

  </div>
);
}