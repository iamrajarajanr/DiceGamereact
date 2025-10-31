import React from "react";

function ScoreCard({ totalValue, currentValue, active = false }) {
  return (
    <div className="score-card">
      <h2> Score: {totalValue}</h2>
      <div className={`dice-score-display ${active && "active"}`}>
        {currentValue}
      </div>
    </div>
  );
}

export default ScoreCard;
