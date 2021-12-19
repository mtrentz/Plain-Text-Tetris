import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { GameProvider } from "./contexts/GameContext";
import { TimeProvider } from "./contexts/TimeContext";
import { PieceProvider } from "./contexts/PieceContext";
import { BoardProvider } from "./contexts/BoardContext";

ReactDOM.render(
  <React.StrictMode>
    <TimeProvider>
      <PieceProvider>
        <BoardProvider>
          <GameProvider>
            <App />
          </GameProvider>
        </BoardProvider>
      </PieceProvider>
    </TimeProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
