import { useState, useContext } from "react";
import GameContext from "./contexts/GameContext";
import Board from "./components/Board";
import NextPieceMenu from "./components/NextPieceMenu";
import ScoreMenu from "./components/ScoreMenu";
import OptionsMenu from "./components/OptionsMenu";
import Header from "./components/Header";
import InfoMenu from "./components/InfoMenu";

function App() {
  const { handleKeyPress, handleKeyRelease, handleKeyDown } = useContext(GameContext);

  return (
    <button
      className="bg-gray-800 text-gray-200 cursor-auto w-full min-h-[100vh] h-full"
      onKeyDown={handleKeyPress}
      onKeyUp={handleKeyRelease}
    >
      <Header />
      <InfoMenu />
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
