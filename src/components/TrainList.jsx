import { useState } from "react";
import { trains } from "../data/trains";
import TrainCard from "./TrainCard";

export default function TrainList() {
  const [search, setSearch] = useState("");

  const filteredTrains = trains.filter(train =>
    train.number.toLowerCase().includes(search.toLowerCase()) ||
    train.from.toLowerCase().includes(search.toLowerCase()) ||
    train.to.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div>
      {/* SEARCH */}
      <input
        className="searchInput"
        type="text"
        placeholder="Search train / route..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      {/* GRID */}
      <div className="trainGrid">
        {filteredTrains.length === 0 ? (
          <p className="state">Нічого не знайдено</p>
        ) : (
          filteredTrains.map(train => (
            <TrainCard key={train.id} train={train} />
          ))
        )}
      </div>
    </div>
  );
}