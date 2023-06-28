import React, { useState } from "react";
import Square from "./Square";

export default function Board({ squares, handleClick }) {
  const firstRow = squares.slice(0, 3);
  const secondRow = squares.slice(3, 6);
  const thirdRow = squares.slice(-3);

  return (
    <div className="board">
      <div>
        <div className="board-row">
          {firstRow.map((cell, cellIndex) => (
            <Square index={cellIndex} symbol={cell} handleClick={handleClick} />
          ))}
        </div>
        <div className="board-row">
          {secondRow.map((cell, cellIndex) => (
            <Square
              index={3 + cellIndex}
              symbol={cell}
              handleClick={handleClick}
            />
          ))}
        </div>
        <div className="board-row">
          {thirdRow.map((cell, cellIndex) => (
            <Square
              index={6 + cellIndex}
              symbol={cell}
              handleClick={handleClick}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
