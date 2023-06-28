import React from "react";

function Square({ index, symbol, handleClick }) {
  return (
    <button className={"square"} onClick={() => handleClick(index)}>
      {symbol}
    </button>
  );
}

export default Square;
