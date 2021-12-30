import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { GameProvider } from "./contexts/GameContext";
import { TimeProvider } from "./contexts/TimeContext";
import { PieceBoardProvider } from "./contexts/PieceBoardContext";
import { GameBoardProvider } from "./contexts/GameBoardContext";
import { AudioProvider } from "./contexts/AudioContext";
import { PieceOrderProvider } from "./contexts/PieceOrderContext";

ReactDOM.render(
  <React.StrictMode>
    <AudioProvider>
      <TimeProvider>
        <PieceOrderProvider>
          <PieceBoardProvider>
            <GameBoardProvider>
              <GameProvider>
                <App />
              </GameProvider>
            </GameBoardProvider>
          </PieceBoardProvider>
        </PieceOrderProvider>
      </TimeProvider>
    </AudioProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
