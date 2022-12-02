import React, { useRef, useState } from "react";
import * as AppBoard from "./app/board";
import { Tile, Board } from "./components";
import { useKeyPress } from "./hooks/keyboard";
import "./App.css";

interface ResultsProps {
  board: AppBoard.Board;
}

const Results = ({ board }: ResultsProps) => {
  return (
    <div className="results">
      <h2>The game is over</h2>
      <p>You {AppBoard.maxValue(board) === 2048 ? "won" : "lost"}!</p>
    </div>
  );
};

const App = () => {
  const [board, setBoard] = useState(AppBoard.fillSlot(AppBoard.create(), 2));
  const [isGameOver, setIsGameOver] = useState(false);

  const sizeRef = useRef(AppBoard.size(board));

  const nextRound = (board: AppBoard.Board) => {
    //TODO: Debounce or use key up

    try {
      const newBoard = AppBoard.fillSlot(board, 1);
      setBoard(newBoard);
      if (AppBoard.maxValue(newBoard) === 2048) {
        setIsGameOver(true);
      }
    } catch (e) {
      setIsGameOver(true);
    }
  };

  useKeyPress("ArrowLeft", {
    isDisabled: isGameOver,
    down: () => nextRound(AppBoard.slideLeft(board)),
  });

  useKeyPress("ArrowRight", {
    isDisabled: isGameOver,
    down: () => nextRound(AppBoard.slideRight(board)),
  });

  useKeyPress("ArrowUp", {
    isDisabled: isGameOver,
    down: () => nextRound(AppBoard.slideUp(board)),
  });

  useKeyPress("ArrowDown", {
    isDisabled: isGameOver,
    down: () => nextRound(AppBoard.slideDown(board)),
  });

  return (
    <div className="App">
      {isGameOver && <Results board={board} />}
      <Board rows={sizeRef.current[0]} columns={sizeRef.current[1]}>
        {board.map((row, rowIndex) =>
          row.map((value, columnIndex) => (
            <Tile key={`${rowIndex}-${columnIndex}-${value}`}>{value}</Tile>
          ))
        )}
      </Board>
    </div>
  );
};

export default App;
