export default function Seat({ number, selected, reserved, onClick }) {

  return (
    <button
      onClick={() => !reserved && onClick(number)}
      disabled={reserved}
      style={{
        width: "40px",
        height: "40px",
        margin: "4px",
        borderRadius: "6px",
        border: "1px solid #ccc",
        cursor: reserved ? "not-allowed" : "pointer",
        background: reserved
          ? "#ccc"
          : selected
          ? "#aa3bff"
          : "white",
        color: selected ? "white" : "black"
      }}
    >
      {number}
    </button>
  );
}