import React from "react";

function History({ history, jumpTo }) {
  return (
    <div className="history">
      <h4>History</h4>
      <ul>
        {history.map((step, pos) => {
          const desc = pos ? "Go to move #" + pos : "Go to game start";
          return (
            <li key={pos}>
              <button onClick={() => jumpTo(pos)}>{desc}</button>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default History;
