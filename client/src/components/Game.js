import React, { useState } from "react";
import Board from "./Board";
import { Window, MessageList, MessageInput } from "stream-chat-react";
import "./Chat.css";

export default function Game({ channel, setChannel }) {
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
      <Window>
        <MessageList
          disableDateSeparator
          closeReactionSelectorOnClick
          messageActions={[]}
          hideDeletedMessages
        />
        <MessageInput noFiles={true} />
      </Window>
      <button
        onClick={async () => {
          await channel.stopWatching();
          setChannel(null);
        }}
      >
        Leave Game
      </button>
      {result.state === "won" && <div>{result.winner} Won The Game</div>}
      {result.state === "tie" && <div>Game Tied</div>}
    </div>
  );
}
