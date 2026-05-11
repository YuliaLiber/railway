import { useState } from "react";
import Seat from "./Seat";
import { getBookings } from "../services/bookingService";

export default function SeatMap({
  trainId,
  wagon,
  selectedSeat,
  onSelectSeat
}) {

  const [internalSeat, setInternalSeat] = useState(null);

  const seats = Array.from({ length: 20 }, (_, i) => i + 1);

  const bookings = getBookings();

  const reservedSeats = bookings
    .filter(b => b.trainId === trainId && b.wagon === wagon)
    .map(b => b.seat);

  function handleSelect(seatNumber) {
    setInternalSeat(seatNumber);

    if (onSelectSeat) {
      onSelectSeat(seatNumber);
    }
  }

  return (
    <div>
      <h3>🪑 Seats (wagon {wagon})</h3>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(4, 50px)",
          gap: "6px",
          marginTop: "10px"
        }}
      >
        {seats.map(seat => (
          <Seat
            key={seat}
            number={seat}
            selected={
              selectedSeat !== undefined
                ? selectedSeat === seat
                : internalSeat === seat
            }
            reserved={reservedSeats.includes(seat)}
            onClick={handleSelect}
          />
        ))}
      </div>
    </div>
  );
}