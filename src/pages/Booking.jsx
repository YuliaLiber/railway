import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";

import WagonSelector from "../components/WagonSelector";

import { saveBooking } from "../services/bookingService";
import { getBookings } from "../services/bookingService";

export default function Booking() {

  const { trainId } = useParams();

  const [wagon, setWagon] = useState(1);

  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    const data = getBookings();
    setBookings(data);
  }, []);

  function handleBook() {

    saveBooking({
      trainId,
      wagon,
      seat: 1
    });

    const updated = getBookings();
    setBookings(updated);
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

      <h3>Saved bookings:</h3>

      {bookings.map((b, index) => (
        <p key={index}>
          Train: {b.trainId} |
          Wagon: {b.wagon} |
          Seat: {b.seat}
        </p>
      ))}

    </div>
  );
}