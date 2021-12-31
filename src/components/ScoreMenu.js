import React, { useContext } from "react";
import GameContext from "../contexts/GameContext";

const ScoreMenu = () => {
  const { score } = useContext(GameContext);

  return (
    <pre className="w-1/2 lg:w-full">
      <p>Lines</p>
      <p>{score}</p>
    </pre>
  );
};

export default ScoreMenu;
