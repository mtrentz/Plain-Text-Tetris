import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { GameProvider } from "./contexts/GameContext";
import { TimeProvider } from "./contexts/TimeContext";
import { PieceBoardProvider } from "./contexts/PieceBoardContext";
import { GameBoardProvider } from "./contexts/GameBoardContext";

ReactDOM.render(
  <React.StrictMode>
    <TimeProvider>
      <PieceBoardProvider>
        <GameBoardProvider>
          <GameProvider>
            <App />
          </GameProvider>
        </GameBoardProvider>
      </PieceBoardProvider>
    </TimeProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
