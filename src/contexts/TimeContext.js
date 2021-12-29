import { createContext, useState, useEffect } from "react";
import settings from "../tetris/settings";

const TimeContext = createContext();

export default TimeContext;

export const TimeProvider = ({ children }) => {
  const [counter, setCounter] = useState(0);
  const [gamePaused, setGamePaused] = useState(false);
  const [speed, setSpeed] = useState(settings.normal_speed);

  const setFast = () => {
    setSpeed(settings.fast_speed);
  };

  const setNormal = () => {
    setSpeed(settings.normal_speed);
  };

  const forceFrameSkip = () => {
    setCounter(counter + 1);
  };

  const pauseGame = () => {
    setGamePaused(true);
  };

  const resumeGame = () => {
    setGamePaused(false);
  };

  useEffect(() => {
    if (gamePaused) {
      return;
    }
    const timer = setInterval(() => setCounter(counter + 1), speed);
    return () => clearInterval(timer);
  }, [counter, gamePaused]);

  const contextData = {
    counter,
    speed,
    setFast,
    setNormal,
    forceFrameSkip,
    gamePaused,
    pauseGame,
    resumeGame,
  };

  return <TimeContext.Provider value={contextData}>{children}</TimeContext.Provider>;
};
