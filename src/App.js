import { useState, useContext } from "react";
import GameContext from "./contexts/GameContext";
import Board from "./components/Board";
import NextPieceMenu from "./components/NextPieceMenu";
import ScoreMenu from "./components/ScoreMenu";
import OptionsMenu from "./components/OptionsMenu";

function App() {
  const { handleKeyPress, handleKeyRelease, handleKeyDown } = useContext(GameContext);

  return (
    <button className="bg-gray-600 w-full h-full cursor-auto" onKeyDown={handleKeyPress} onKeyUp={handleKeyRelease}>
      <NextPieceMenu />
      <ScoreMenu />
      <OptionsMenu />
      <Board />
    </button>
  );
}

export default App;
