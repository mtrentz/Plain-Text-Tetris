import React, { useContext } from "react";
import GameContext from "../contexts/GameContext";
import TimeContext from "../contexts/TimeContext";

const MobileControls = () => {
  const { movePieceRight, movePieceLeft, rotatePiece } = useContext(GameContext);
  return (
    <pre className="flex flex-row justify-center gap-5 lg:hidden">
      <div className="mt-1">Mobile Controls:</div>
      <div className="flex flex-row justify-center gap-5">
        <button onClick={movePieceLeft} className="text-xl">
          {"<"}
        </button>
        <button onClick={rotatePiece} className="text-xl rotate-180 mt-2">
          {"v"}
        </button>
        <button onClick={movePieceRight} className="text-xl">
          {">"}
        </button>
      </div>
    </pre>
  );
};

export default MobileControls;
