import React, { useContext } from "react";
import GameContext from "../contexts/GameContext";
import BoardTable from "./BoardTable";
import GameOverTable from "./GameOverTable";

const Board = () => {
  const { mergedBoard, gameOver } = useContext(GameContext);

  return (
    <div>
      <pre className="text-black whitespace-pre-wrap leading-4 tracking-normal md:tracking-wider">
        {gameOver ? <GameOverTable mergedBoard={mergedBoard} /> : <BoardTable mergedBoard={mergedBoard} />}
      </pre>
    </div>
  );
};

export default Board;
