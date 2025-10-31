// 1. Import useState and useEffect
import { useReducer, useRef, useState, useEffect } from "react";
import ReactDice from "react-dice-complete";

import Confetti from "react-confetti";
import useWindowSize from "react-use/lib/useWindowSize";
import ResetButton from "./ResetButton";
// import RollDiceButton from "./RollDiceButton"; // We won't use this
import ScoreCard from "./ScoreCard";
import "./styles.css";

const initialState = {
  player1Score: 0,
  player2Score: 0,
  currentPlayerTurn: 0,
  winner: null
};

const WINNING_SCORE = 8;

function gameReducer(state, action) {
  switch (action.type) {
    case "DICE_ROLLED":
      let { player1Score, player2Score, winner } = state;
      console.log("inside reducer", { player1Score, player2Score, action });
      if (action.playerIndex === 0) {
        player1Score += action.score;
      } else {
        player2Score += action.score;
      }

      if (player1Score >= WINNING_SCORE) {
        winner = 0;
      } else if (player2Score >= WINNING_SCORE) {
        winner = 1;
      }

      return {
        ...state,
        player1Score,
        player2Score,
        currentPlayerTurn: state.currentPlayerTurn === 0 ? 1 : 0,
        winner
      };
    case "RESET_GAME":
      return {
        ...initialState
      };
    default:
      return state;
  }
}

export default function App() {
  const diceRef = useRef();
  const { width, height } = useWindowSize();
  const [
    { player1Score, player2Score, currentPlayerTurn, winner },
    dispatch
  ] = useReducer(gameReducer, initialState);
  const [displayDiceValues, setDisplayDiceValues] = useState([0, 0]);
  const hasWinner = winner !== null;

  // 2. Add a state to track if the component is mounted
  const [isMounted, setIsMounted] = useState(false);

  // 3. When the component mounts, set isMounted to true
  useEffect(() => {
    setIsMounted(true);
  }, []);

  const handleRollEnd = (number) => {
    // 4. Add this "guard clause"
    // If the component isn't mounted yet, ignore the roll
    if (!isMounted) return;

    dispatch({
      type: "DICE_ROLLED",
      playerIndex: currentPlayerTurn,
      score: number
    });

    const otherPlayerIndex = currentPlayerTurn === 0 ? 1 : 0;
    const values = [];
    values[currentPlayerTurn] = number;
    values[otherPlayerIndex] = "-";
    setDisplayDiceValues(values);
  };

  const handleReset = () => {
    dispatch({
      type: "RESET_GAME"
    });
    setDisplayDiceValues([0, 0]);
  };

  return (
    <div className="App">
      {!hasWinner ? (
        <h1>Player {currentPlayerTurn + 1} Turn</h1>
      ) : (
        <h1>Player {winner + 1} Won 🥳</h1>
      )}

      <div className="players">
        {/* Keep the fix for confetti */}
        {winner === 0 && (
          <Confetti width={350} height={height} confettiSource={{ x: 400 }} />
        )}

        <ScoreCard
          totalValue={player1Score}
          currentValue={displayDiceValues[0]}
          active={currentPlayerTurn === 0}
        />

        {winner === 1 && (
          <Confetti width={550} height={height} confettiSource={{ x: 530 }} />
        )}
        <ScoreCard
          totalValue={player2Score}
          currentValue={displayDiceValues[1]}
          active={currentPlayerTurn === 1}
        />
      </div>

      <div className="actions">
        {hasWinner ? (
          <ResetButton onClick={handleReset} />
        ) : (
          // 5. Put the ReactDice component back
          <ReactDice
            numDice={1}
            rollDone={handleRollEnd}
            faceColor="#e37933"
            dotColor="black"
            ref={(dice) => (diceRef.current = dice)}
          />
        )}
      </div>
    </div>
  );
}