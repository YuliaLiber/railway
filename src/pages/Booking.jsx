import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";

import WagonSelector from "../components/WagonSelector";
import SeatMap from "../components/SeatMap";

import { saveBooking, getBookings } from "../services/bookingService";
import BookingForm from "../components/BookingForm";

export default function Booking() {

  const { trainId } = useParams();

  const [wagon, setWagon] = useState(1);
  const [seat, setSeat] = useState(null);

  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  const [error, setError] = useState("");

  const [showForm, setShowForm] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    setLoading(true);

    setTimeout(() => {
      const data = getBookings();
      setBookings(data);
      setLoading(false);
    }, 300);

  }, []);

  function handleFormSubmit(data) {

    if (!seat) {
      setError("❌ Please select a seat!");
      return;
    }

    const isTaken = bookings.some(
      b => b.trainId === trainId &&
           b.wagon === wagon &&
           b.seat === seat
    );

    if (isTaken) {
      setError("❌ This seat is already booked!");
      return;
    }

    setError("");

    setSubmitting(true);

    setTimeout(() => {

      saveBooking({
        trainId,
        wagon,
        seat,

        name: data.name,
        phone: data.phone,
        email: data.email
      });

      setBookings(getBookings());

      setSeat(null);

      setSubmitting(false);
      setShowForm(false);

    }, 2000);
  }

  if (loading) {
    return <h2>⏳ Loading bookings...</h2>;
  }

  if (bookings.length === 0) {
    return (
      <div className="booking-page">

        <h2>📭 No bookings yet</h2>

        <p>Book your first ticket 🎟</p>

        <WagonSelector onSelect={setWagon} />

        <h3>Selected wagon: {wagon}</h3>

        <SeatMap
          trainId={trainId}
          wagon={wagon}
          selectedSeat={seat}
          onSelectSeat={setSeat}
        />

        {error && (
          <p className="error-text">
            {error}
          </p>
        )}

        <button
          className="book-button"
          onClick={() => setShowForm(true)}
        >
          🎟 Book ticket
        </button>

        {showForm && (
          <div className="modal-overlay">

            <div className="modal-window">

              <h2>🎟 Confirm booking</h2>

              {submitting ? (
                <h3>⏳ Booking...</h3>
              ) : (
                <BookingForm onSubmit={handleFormSubmit} />
              )}

              <button
                className="close-button"
                onClick={() => setShowForm(false)}
              >
                Close
              </button>

            </div>

          </div>
        )}

      </div>
    );
  }

  return (
    <div className="booking-page">

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

      {error && (
        <p className="error-text">
          {error}
        </p>
      )}

      <button
        className="book-button"
        onClick={() => setShowForm(true)}
      >
        🎟 Book ticket
      </button>

      {showForm && (
        <div className="modal-overlay">

          <div className="modal-window">

            <h2>🎟 Confirm booking</h2>

            {submitting ? (
              <h3>⏳ Booking...</h3>
            ) : (
              <BookingForm onSubmit={handleFormSubmit} />
            )}

            <button
              className="close-button"
              onClick={() => setShowForm(false)}
            >
              Close
            </button>

          </div>

        </div>
      )}

      <h3>Saved bookings:</h3>

      <div className="bookings-list">

        {bookings.map((b, index) => (
          <div
            key={index}
            className="booking-card"
          >
            🚆 Train: {b.trainId}
            <br />

            🚃 Wagon: {b.wagon}
            <br />

            🪑 Seat: {b.seat}
            <br />

            👤 {b.name}
            <br />

            📞 {b.phone}
            <br />

            📧 {b.email}
          </div>
        ))}

      </div>

    </div>
  );
}