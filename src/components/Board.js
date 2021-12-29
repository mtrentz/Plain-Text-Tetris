import React, { useContext } from "react";
import GameContext from "../contexts/GameContext";
import TimeContext from "../contexts/TimeContext";
import BoardTable from "./BoardTable";
import GameOverTable from "./GameOverTable";

const Board = () => {
  const { mergedBoard, gameOver } = useContext(GameContext);
  const { counter } = useContext(TimeContext);

  // TODO: Preciso achar um jeito de colocar a cor depois... Acho que vai ser hard
  return (
    <div>
      <pre className="whitespace-pre-wrap leading-4 tracking-normal md:tracking-wider">
        {gameOver ? <GameOverTable mergedBoard={mergedBoard} /> : <BoardTable mergedBoard={mergedBoard} />}
      </pre>
      <p> Frame count - {counter}</p>
    </div>
  );
};

export default Board;
