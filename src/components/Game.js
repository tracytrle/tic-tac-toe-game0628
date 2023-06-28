import React, { useState, useEffect } from "react";
import Board from "./Board";
let initialMove = -1;
// let curIndex = -1;

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
    // console.log("test useEffect");

    const result = calculateWinner(squares);
    if (!result) {
    }
    // console.log("test useEffect with result: ", result);
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
    console.log("print currentMove: ", currentMove);
  }

  //Handle player
  const handleClick = (i) => {
    // "Your code here";
    // prevent handleClick from being called when the game has already been won
    if (winner || squares[i]) return;
    if (initialMove === -1) {
      initialMove = i;
    }

    // curIndex = i;

    const copiedSquares = squares.slice();
    copiedSquares[i] = xIsNext ? "X" : "O";
    setSquares(copiedSquares);
    setXIsNext(!xIsNext);

    // set history
    const newHistory = history.slice();
    newHistory.push(i);
    setHistory(newHistory);

    // set Buttons
    const newButtons = buttons.slice();
    newButtons.push(
      <button key={newButtons.length} onClick={() => jumpTo(newButtons.length)}>
        {`Go to move #${newButtons.length}`}
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
    if (currentMove === 0 || history.length === 0) return;
    // console.log("print curIndex: ", curIndex);

    // if won before undo
    setWinner(null);

    // get the last item of history
    let curIndex = history[history.length - 1];

    const copiedSquares = squares.slice();
    copiedSquares[curIndex] = null;
    setSquares(copiedSquares);

    // reset history
    const newHistory = history.slice(0, history.length - 1);
    setHistory(newHistory);

    const newButtons = buttons.slice(0, buttons.length - 1);
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

        <div className="history">
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
        <div className="undo-btn">
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
