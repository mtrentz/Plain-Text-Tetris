import React, { useContext } from "react";
import GameContext from "../contexts/GameContext";
import TimeContext from "../contexts/TimeContext";

const OptionsMenu = () => {
  const { gameOver } = useContext(GameContext);
  const { pauseGame, resumeGame, gamePaused } = useContext(TimeContext);

  return (
    <pre className="flex flex-row justify-center gap-5">
      <button onClick={gamePaused ? resumeGame : pauseGame}>{gamePaused ? "Resume Game" : "Pause Game"}</button>
      <button>Restart</button>
      <button>Toggle Audio</button>
    </pre>
  );
};

export default OptionsMenu;
