import { createContext, useState, useEffect } from "react";

const TimeContext = createContext();

export default TimeContext;

export const TimeProvider = ({ children }) => {
  const [counter, setCounter] = useState(0);

  // const [counter, setCounter] = React.useState(60);

  // TODO: Usar o settings pra pegar o '500' ali que é o tempo. Achar um jeito de alterar ele pro tempo rodar mais rapido
  useEffect(() => {
    const timer = setInterval(() => setCounter(counter + 1), 250);
    return () => clearInterval(timer);
  }, [counter]);

  const contextData = {
    counter,
  };

  return (
    <TimeContext.Provider value={contextData}>{children}</TimeContext.Provider>
  );
};
