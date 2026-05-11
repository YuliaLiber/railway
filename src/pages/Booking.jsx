import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";

import WagonSelector from "../components/WagonSelector";

import { saveBooking } from "../services/bookingService";
import { getBookings } from "../services/bookingService";

import SeatMap from "../components/SeatMap";

export default function Booking() {

  const { trainId } = useParams();

  const [wagon, setWagon] = useState(1);

  const [seat, setSeat] = useState(1);

  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    const data = getBookings();
    setBookings(data);
  }, []);

  function handleBook() {

  const isTaken = bookings.some(
    b => b.trainId === trainId && b.seat === seat
  );

  if (isTaken) {
    alert("❌ This seat is already booked!");
    return;
  }

  saveBooking({
    trainId,
    wagon,
    seat
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

      <SeatMap trainId={trainId} wagon={wagon} />

      <button onClick={() => setSeat(seat + 1)}>
        Change seat ({seat})
      </button>

      <button onClick={handleBook}>
        🎟 Book ticket
      </button>

      <h3>Saved bookings:</h3>

      <div
        style={{
          marginTop: "20px",
          display: "flex",
          flexDirection: "column",
          gap: "10px"
        }}
      >

        {bookings.map((b, index) => (
          <div
            key={index}
            style={{
              padding: "12px",
              border: "1px solid #ddd",
              borderRadius: "10px",
              background: "#f8f8f8"
            }}
          >
            🚆 Train: {b.trainId}
            <br />
            🚃 Wagon: {b.wagon}
            <br />
            🪑 Seat: {b.seat}
          </div>
        ))}

      </div>

    </div>
  );
}