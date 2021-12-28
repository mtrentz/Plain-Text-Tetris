import { createContext, useState, useEffect } from "react";
import settings from "../tetris/settings";

const TimeContext = createContext();

export default TimeContext;

export const TimeProvider = ({ children }) => {
  const [counter, setCounter] = useState(0);
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

  useEffect(() => {
    const timer = setInterval(() => setCounter(counter + 1), speed);
    return () => clearInterval(timer);
  }, [counter]);

  const contextData = {
    counter,
    speed,
    setFast,
    setNormal,
    forceFrameSkip,
  };

  return (
    <TimeContext.Provider value={contextData}>{children}</TimeContext.Provider>
  );
};
