import React from "react";

const noop = () => {};

function RollDiceButton({ onRollEnd = noop }) {
  const handleClick = () => {
    const number = generateRandomNumber();
    onRollEnd(number);
  };

  return (
    <button onClick={handleClick}>
      Roll Dice <span role="img">🎲</span>
    </button>
  );
}

function generateRandomNumber() {
  return Math.floor(Math.random() * 6 + 1);
}

export default RollDiceButton;
