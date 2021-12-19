import { createContext, useState, useEffect } from "react";
import settings from "../tetris/settings";

const TimeContext = createContext();

export default TimeContext;

export const TimeProvider = ({ children }) => {
  const [counter, setCounter] = useState(0);
  const [speed, setSpeed] = useState(settings.speed);

  // const [counter, setCounter] = React.useState(60);

  const setFast = () => {
    setSpeed(settings.sped_up_speed);
  };

  const setNormal = () => {
    setSpeed(settings.speed);
  };

  // TODO: Usar o settings pra pegar o '500' ali que é o tempo. Achar um jeito de alterar ele pro tempo rodar mais rapido
  useEffect(() => {
    const timer = setInterval(() => setCounter(counter + 1), speed);
    return () => clearInterval(timer);
  }, [counter]);

  const contextData = {
    counter,
    speed,
    setFast,
    setNormal,
  };

  return (
    <TimeContext.Provider value={contextData}>{children}</TimeContext.Provider>
  );
};
