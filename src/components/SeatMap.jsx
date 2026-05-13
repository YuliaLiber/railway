import { useState } from "react";
import Seat from "./Seat";
import { getBookings } from "../services/bookingService";

export default function SeatMap({ trainId, wagon }) {

  const [selectedSeat, setSelectedSeat] = useState(null);

  const bookings = getBookings();

  const reservedSeats = bookings
    .filter(b => b.trainId === trainId && b.wagon === wagon)
    .map(b => b.seat);

  let seats = [];

  if (wagon <= 3) {
    seats = Array.from({ length: 40 }, (_, i) => i + 1);
  }

  if (wagon >= 4 && wagon <= 5) {
    seats = Array.from({ length: 30 }, (_, i) => i + 1);
  }

  if (wagon === 6) {
    seats = Array.from({ length: 20 }, (_, i) => i + 1);
  }

  function handleSelect(seat) {
    setSelectedSeat(seat);
  }

  return (
    <div>

      <h3>🪑 Wagon {wagon}</h3>

      {wagon <= 3 && (
        <div className="platzkart-grid">
          {seats.map(seat => (
            <Seat
              key={seat}
              number={seat}
              selected={selectedSeat === seat}
              reserved={reservedSeats.includes(seat)}
              onClick={handleSelect}
            />
          ))}
        </div>
      )}

      {(wagon === 4 || wagon === 5) && (
        <div className="kupe-grid">
          {seats.map(seat => (
            <Seat
              key={seat}
              number={seat}
              selected={selectedSeat === seat}
              reserved={reservedSeats.includes(seat)}
              onClick={handleSelect}
            />
          ))}
        </div>
      )}

      {wagon === 6 && (
        <div className="vip-grid">
          {seats.map(seat => (
            <Seat
              key={seat}
              number={seat}
              selected={selectedSeat === seat}
              reserved={reservedSeats.includes(seat)}
              onClick={handleSelect}
            />
          ))}
        </div>
      )}

    </div>
  );
}