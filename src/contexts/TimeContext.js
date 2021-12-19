import { createContext, useState, useEffect } from "react";

const TimeContext = createContext();

export default TimeContext;

export const TimeProvider = ({ children }) => {
  const [counter, setCounter] = useState(0);

  // const [counter, setCounter] = React.useState(60);

  // Third Attempts
  useEffect(() => {
    const timer = setInterval(() => setCounter(counter + 1), 500);
    return () => clearInterval(timer);
  }, [counter]);

  const contextData = {
    counter,
  };

  return (
    <TimeContext.Provider value={contextData}>{children}</TimeContext.Provider>
  );
};
