import { set } from "lodash";
import React, { useState, useEffect } from "react";
import Board from "./Board";

function Game() {
  const [squares, setSquares] = useState(Array(9).fill(null));
  const [xIsNext, setXIsNext] = useState(true);
  const [winner, setWinner] = useState(null);
  const [buttons, setButtons] = useState([]);
  const [currentMove, setCurrentMove] = useState(null);
  const [history, setHistory] = useState([]);
  // const [history, setHistory] = useState([{ squares: Array(9).fill(null) }]);
  // const current = history[history.length - 1];
  // // const squares = current.squares;

  //Declaring a Winner

  useEffect(() => {
    // "Your code here";
    console.log("test useEffect");

    const result = calculateWinner(squares);
    if (!result) {
    }
    console.log("test useEffect with result: ", result);
    // not allow to play when the winner is defined
    setWinner(result);
  }, [squares]);

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
    setCurrentMove(move);
    const newHistory = history.slice(0, move);
    setHistory(newHistory);

    const newButtons = buttons.slice(0, move);
    setButtons(newButtons);
  }

  //Handle player
  const handleClick = (i) => {
    // "Your code here";
    // prevent handleClick from being called when the game has already been won
    if (winner) return;

    const copiedSquares = squares.slice();
    copiedSquares[i] = xIsNext ? "X" : "O";
    setSquares(copiedSquares);
    setXIsNext(!xIsNext);

    // set HistoryMove
    // setHistory(history.concat([{ squares: copiedSquares }]));
    const newHistory = [...history, currentMove + 1];
    setHistory(newHistory);

    // setHistory(history.slice(0, currentMove + 1).concat([{ squares: newSquares }]));

    const newButtons = buttons.slice();
    newButtons.push(
      <button
        key={newButtons.length + 1}
        onClick={() => jumpTo(newButtons.length + 1)}
      >
        {`Go to move #${newButtons.length + 1}`}
      </button>
    );
    setButtons(newButtons);
  };

  //Restart game
  const handlRestart = () => {
    // "Your code here";
    setSquares(Array(9).fill(null));
    setXIsNext(true);
    setWinner(null);
    setButtons([]);
  };

  // const history = () => {
  //   return (
  //     <li>
  //     </li>
  //   );
  // };
  const undo = () => {
    if (currentMove === 0) return;

    // if won before undo
    setWinner(null);

    const newHistory = history.slice(0, history.length - 1);
    setHistory(newHistory);

    const newButtons = buttons.slice(0, buttons.length - 2);
    setCurrentMove(currentMove - 1);
    setButtons(newButtons);

    setXIsNext(xIsNext ? false : true);
  };

  return (
    <div className="main">
      <h2 className="result">Winner is: {winner ? winner : "N/N"}</h2>
      <div className="game">
        <span className="player">Next player is: {xIsNext ? "X" : "O"}</span>
        <Board squares={squares} handleClick={handleClick} />

        <div class="history">
          <h4>History</h4>
          <ul>
            {buttons.map((button, move) => (
              <li key={move}>
                <button
                  className={move === currentMove ? "selected" : ""}
                  onClick={() => jumpTo(move)}
                >
                  {button.props.children}
                </button>
              </li>
            ))}
          </ul>
        </div>
        <span></span>
        <div class="undo-btn">
          <button onClick={undo}>Undo</button>
        </div>
      </div>
      <button onClick={handlRestart} className="restart-btn">
        Restart
      </button>
    </div>
  );
}

export default Game;
