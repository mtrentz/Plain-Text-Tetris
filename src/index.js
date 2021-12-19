import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { GameProvider } from "./contexts/GameContext";
import { TimeProvider } from "./contexts/TimeContext";

ReactDOM.render(
  <React.StrictMode>
    <TimeProvider>
      <GameProvider>
        <App />
      </GameProvider>
    </TimeProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
