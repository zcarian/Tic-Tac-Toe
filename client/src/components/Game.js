import React, { useState } from "react";
import Board from "./Board";

export default function Game({ channel }) {
  const [playerJoined, setplayerJoined] = useState(
    channel.state.watcher_count === 2
  );
  const [result, setResult] = useState({ winner: "none", state: "none" });
  channel.on("user.watching.start", (e) => {
    setplayerJoined(e.watcher_count === 2);
  });
  if (!playerJoined) {
    return <div>Waiting for other player to join...</div>;
  }
  return (
    <div className="gameContainer">
      <Board result={result} setResult={setResult} />
      {/* CHAT */}
      {/* LEAVE GAME BUTTON */}
    </div>
  );
}
