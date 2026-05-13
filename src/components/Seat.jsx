export default function Seat({ number, selected, reserved, onClick }) {

  return (
    <button
      onClick={() => {
  if (!reserved) onClick(number);
}}
      disabled={reserved}
      style={{
        width: "45px",
        height: "45px",
        borderRadius: "8px",
        border: "1px solid #ccc",
        cursor: reserved ? "not-allowed" : "pointer",

        background: reserved
          ? "#ddd"        
          : selected
          ? "#ff9800"     
          : "#3b82f6",    

        color: "white"
      }}
    >
      {number}
    </button>
  );
}