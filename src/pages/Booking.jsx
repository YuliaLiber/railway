import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";

import WagonSelector from "../components/WagonSelector";
import SeatMap from "../components/SeatMap";

import { saveBooking, getBookings } from "../services/bookingService";

export default function Booking() {

  const { trainId } = useParams();

  const [wagon, setWagon] = useState(1);
  const [seat, setSeat] = useState(null);

  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
  setLoading(true);

  const data = getBookings();
  setBookings(data);

  setLoading(false);
}, []);

  function handleBook() {

    if (!seat) {
      alert("❌ Please select a seat!");
      return;
    }

    const isTaken = bookings.some(
      b => b.trainId === trainId && b.wagon === wagon && b.seat === seat
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

    setBookings(getBookings());
    setSeat(null);
  }

if (loading) {
  return <h2>⏳ Loading bookings...</h2>;
}

  return (
    <div>

      <h1>🎟 Booking Page</h1>

      <p>Train ID: {trainId}</p>

      <WagonSelector onSelect={setWagon} />

      <h3>Selected wagon: {wagon}</h3>

      <SeatMap
        trainId={trainId}
        wagon={wagon}
        selectedSeat={seat}
        onSelectSeat={setSeat}
      />

      <button
        style={{ marginTop: "10px" }}
        onClick={handleBook}
      >
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