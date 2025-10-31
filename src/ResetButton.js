import React from "react";

function ResetButton({ onClick }) {
  return (
    <button onClick={onClick}>
      Reset <span role="img">🔁</span>
    </button>
  );
}

export default ResetButton;
