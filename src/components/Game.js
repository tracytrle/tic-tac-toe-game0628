import React, { useState, useEffect } from "react";
import Board from "./Board";
import History from "./History";

function Game() {
  const [xIsNext, setXIsNext] = useState(true);
  const [winner, setWinner] = useState(null);
  const [moveCount, setMoveCount] = useState(0);
  const [historyMove, setHistoryMove] = useState([
    {
      squares: Array(9).fill(null),
    },
  ]);

  useEffect(() => {
    const newWinner = calculateWinner(
      historyMove[historyMove.length - 1].squares
    );
    setWinner(newWinner);
  }, [historyMove]);

  //function to check if a player has won.
  //If a player has won, we can display text such as “Winner: X” or “Winner: O”.
  //Input: squares: given an array of 9 squares:'X', 'O', or null.
  const calculateWinner = (squares) => {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (
        squares[a] &&
        squares[a] === squares[b] &&
        squares[a] === squares[c]
      ) {
        return squares[a];
      }
    }
    return null;
  };

  function jumpTo(move) {
    setMoveCount(move);
    setXIsNext(move % 2 === 0);
  }

  //Handle player
  const handleClick = (i) => {
    // "Your code here";
    console.log("print moveCount: ", moveCount);
    const currentHistory = historyMove.slice(0, moveCount + 1);
    const current = currentHistory[currentHistory.length - 1];
    const squares = current.squares.slice();

    // prevent handleClick from being called when the game has already been won
    if (winner || squares[i]) return;

    squares[i] = xIsNext ? "X" : "O";

    setHistoryMove(
      currentHistory.concat([
        {
          squares: squares,
        },
      ])
    );
    // increment step
    setMoveCount(currentHistory.length);

    setXIsNext(!xIsNext);
  };

  //Restart game
  const handlRestart = () => {
    // "Your code here";
    setMoveCount(0);
    setHistoryMove([
      {
        squares: Array(9).fill(null),
      },
    ]);
    setXIsNext(true);
    setWinner(null);
  };

  return (
    <div className="main">
      Tic-Tac-Toe
      <h2 className="result">Winner is: {winner ? winner : "N/N"}</h2>
      <div className="game">
        <span className="player">Next player is: {xIsNext ? "X" : "O"}</span>
        <Board
          squares={historyMove[moveCount].squares}
          handleClick={handleClick}
        />
        <History history={historyMove} jumpTo={jumpTo} />
      </div>
      <button onClick={handlRestart} className="restart-btn">
        Restart
      </button>
    </div>
  );
}

export default Game;
