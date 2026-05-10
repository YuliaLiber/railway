import { useParams } from "react-router-dom";

export default function Booking() {

  const { trainId } = useParams();

  return (
    <div>
      <h1>🎟 Booking Page</h1>

      <p>Train ID: {trainId}</p>
    </div>
  );
}