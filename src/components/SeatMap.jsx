import { useState } from "react";
import Seat from "./Seat";

export default function SeatMap() {

  const [selectedSeat, setSelectedSeat] = useState(null);

  const reservedSeats = [3, 7, 12];

  const seats = Array.from({ length: 20 }, (_, i) => i + 1);

  function handleSelect(seatNumber) {
    setSelectedSeat(seatNumber);
  }

  return (
    <div>
      <h3>🪑 Select Seat</h3>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(4, 50px)",
          gap: "5px",
          marginTop: "10px"
        }}
      >
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
    </div>
  );
}