import { useEffect, useState } from "react";
import TrainList from "../components/TrainList";

export default function Home() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 800);
    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return (
      <div className="state">
        ⏳ Loading trains...
      </div>
    );
  }

  return (
    <div>
      <h1>🚆 Train Schedule</h1>
      <TrainList />
    </div>
  );
}