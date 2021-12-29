import React, { useContext, useState, useEffect } from "react";
import GameContext from "../contexts/GameContext";
import TimeContext from "../contexts/TimeContext";
import AudioContext from "../contexts/AudioContext";

const OptionsMenu = () => {
  const { gameOver, startNewGame } = useContext(GameContext);
  const { pauseGame, resumeGame, gamePaused } = useContext(TimeContext);
  const { toggleAudio, playing } = useContext(AudioContext);

  const [triedToRestart, setTriedToRestart] = useState(false);

  // If game is over and restart button on "are you sure?", then change button back to Restart
  useEffect(() => {
    if (gameOver && triedToRestart) {
      setTriedToRestart(false);
    }
  }, [gameOver]);

  // Extra check if user tried to restart while still alive. If so, has to click twice.
  const handleRestart = () => {
    // If game was over, then just restart
    if (gameOver) {
      setTriedToRestart(false);
      startNewGame();
    } else {
      // If game was not over, check if user already clicked once
      if (triedToRestart) {
        setTriedToRestart(false);
        startNewGame();
      } else {
        setTriedToRestart(true);
      }
    }
  };

  return (
    <pre className="flex flex-row justify-center gap-5">
      <button onClick={gamePaused ? resumeGame : pauseGame}>{gamePaused ? "Resume Game" : "Pause Game"}</button>
      <button onClick={handleRestart}>{triedToRestart ? "Are you sure?" : "Restart"}</button>
      <button onClick={toggleAudio}>{playing ? "Mute Song" : "Play Song"}</button>
    </pre>
  );
};

export default OptionsMenu;
