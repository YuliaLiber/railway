import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";

import WagonSelector from "../components/WagonSelector";
import SeatMap from "../components/SeatMap";

import { saveBooking, getBookings } from "../services/bookingService";
import BookingForm from "../components/BookingForm";
import { toast } from "react-toastify";

export default function Booking() {

  const { trainId } = useParams();

  const [wagon, setWagon] = useState(1);
  const [seats, setSeats] = useState([]);

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

  function handleSelectSeat(seatNumber) {

    setSeats(prev => {

      if (prev.includes(seatNumber)) {
        return prev.filter(s => s !== seatNumber);
      }

      return [...prev, seatNumber];
    });
  }

  function openForm() {
    if (seats.length === 0) {
      setError("❌ Please select seats!");
      return;
    }

    setError("");
    setShowForm(true);
  }

  function handleFormSubmit(data) {

    if (seats.length === 0) {
      setError("❌ Please select seats!");
      return;
    }

    const isTaken = bookings.some(
      b =>
        b.trainId === trainId &&
        b.wagon === wagon &&
        seats.includes(b.seat)
    );

    if (isTaken) {
      setError("❌ Some seats are already booked!");
      return;
    }

    setError("");
    setSubmitting(true);

    setTimeout(() => {

      seats.forEach(seat => {
        saveBooking({
          trainId,
          wagon,
          seat,
          name: data.name,
          phone: data.phone,
          email: data.email
        });
      });
      toast.success("🎟 Booking successful!");
      setBookings(getBookings());

      setSeats([]);
      setSubmitting(false);
      setShowForm(false);

    }, 2000);
  }

  if (loading) {
    return <h2>⏳ Loading bookings...</h2>;
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
        selectedSeats={seats}
        onSelectSeat={handleSelectSeat}
      />

      {error && (
        <p className="error-text">
          {error}
        </p>
      )}

      <button
        className="book-button"
        onClick={openForm}
      >
        🎟 Book ticket ({seats.length})
      </button>

      {showForm && (
        <div className="modal-overlay">

          <div className="modal-window">

            <h2>🎟 Confirm booking</h2>

            <p>Selected seats: {seats.join(", ")}</p>

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
          <div key={index} className="booking-card">

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