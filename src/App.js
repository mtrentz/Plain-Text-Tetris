import { useState, useContext } from "react";
import GameContext from "./contexts/GameContext";
import Board from "./components/Board";
import NextPieceMenu from "./components/NextPieceMenu";

function App() {
  const { handleKeyPress, handleKeyRelease, handleKeyDown } =
    useContext(GameContext);

  return (
    <button
      className="bg-gray-600 w-full h-full cursor-auto"
      onKeyDown={handleKeyPress}
      onKeyUp={handleKeyRelease}
    >
      <NextPieceMenu />
      <Board />
    </button>
  );
}

export default App;
