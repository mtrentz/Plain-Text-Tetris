import { useState, useContext } from "react";
import GameContext from "./contexts/GameContext";
import Board from "./components/Board";
import NextPieceMenu from "./components/NextPieceMenu";
import ScoreMenu from "./components/ScoreMenu";
import OptionsMenu from "./components/OptionsMenu";
import Header from "./components/Header";

function App() {
  const { handleKeyPress, handleKeyRelease, handleKeyDown } = useContext(GameContext);

  return (
    <button
      className="bg-gray-600 w-full h-full cursor-auto pt-4"
      onKeyDown={handleKeyPress}
      onKeyUp={handleKeyRelease}
    >
      <Header />
      <div className="w-full flex justify-center self-center">
        <div className="flex">
          <NextPieceMenu />
          <ScoreMenu />
        </div>
      </div>
      <OptionsMenu />
      <Board />
    </button>
  );
}

export default App;
