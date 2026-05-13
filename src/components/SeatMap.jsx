import { useState } from "react";
import Seat from "./Seat";
import { getBookings } from "../services/bookingService";

export default function SeatMap({ trainId, wagon }) {

  const [selectedSeat, setSelectedSeat] = useState(null);

  const bookings = getBookings();

  const reservedSeats = bookings
    .filter(b => b.trainId === trainId && b.wagon === wagon)
    .map(b => b.seat);

  function handleSelect(seat) {
    setSelectedSeat(seat);
  }

  const top1 = Array.from({ length: 14 }, (_, i) => i + 1);
  const top2 = Array.from({ length: 14 }, (_, i) => i + 15);
  const bottom = Array.from({ length: 12 }, (_, i) => i + 29);

  const renderPlackart = () => (
    <div className="seat-map">

      <div className="row">
        {top1.map(seat => (
          <Seat key={seat} number={seat}
            selected={selectedSeat === seat}
            reserved={reservedSeats.includes(seat)}
            onClick={handleSelect}
          />
        ))}
      </div>

      <div className="row">
        {top2.map(seat => (
          <Seat key={seat} number={seat}
            selected={selectedSeat === seat}
            reserved={reservedSeats.includes(seat)}
            onClick={handleSelect}
          />
        ))}
      </div>

      <div className="aisle">🚶‍♂️</div>

      <div className="row">
        {bottom.map(seat => (
          <Seat key={seat} number={seat}
            selected={selectedSeat === seat}
            reserved={reservedSeats.includes(seat)}
            onClick={handleSelect}
          />
        ))}
      </div>

    </div>
  );
  const kupeRooms = Array.from({ length: 5 }, (_, i) => {
    const base = i * 4 + 1;
    return [
      base, base + 1,
      base + 2, base + 3
    ];
  });

  const renderKupe = () => (
    <div className="rooms-row">

      {kupeRooms.map((room, i) => (
        <div key={i} className="room grid-2x2">
          {room.map(seat => (
            <Seat
              key={seat}
              number={seat}
              selected={selectedSeat === seat}
              reserved={reservedSeats.includes(seat)}
              onClick={handleSelect}
            />
          ))}
        </div>
      ))}

    </div>
  );

  const vipRooms = Array.from({ length: 5 }, (_, i) => {
    const base = i * 2 + 1;
    return [base, base + 1];
  });

  const renderVIP = () => (
    <div className="rooms-row">

      {vipRooms.map((room, i) => (
        <div key={i} className="room grid-1x2">
          {room.map(seat => (
            <Seat
              key={seat}
              number={seat}
              selected={selectedSeat === seat}
              reserved={reservedSeats.includes(seat)}
              onClick={handleSelect}
            />
          ))}
        </div>
      ))}

    </div>
  );

  return (
    <div>

      <h3>🚆 Wagon {wagon}</h3>

      {wagon <= 3
        ? renderPlackart()
        : wagon <= 5
        ? renderKupe()
        : renderVIP()
      }

    </div>
  );
}