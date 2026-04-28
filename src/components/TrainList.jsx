import { trains } from "../data/trains";
import TrainCard from "./TrainCard";

export default function TrainList() {
  return (
    <div className="trainGrid">
      {trains.map(train => (
        <TrainCard key={train.id} train={train} />
      ))}
    </div>
  );
}