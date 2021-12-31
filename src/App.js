import { useState, useContext } from "react";
import GameContext from "./contexts/GameContext";
import Board from "./components/Board";
import NextPieceMenu from "./components/NextPieceMenu";
import ScoreMenu from "./components/ScoreMenu";
import OptionsMenu from "./components/OptionsMenu";
import Header from "./components/Header";
import InfoMenu from "./components/InfoMenu";
import AboutMeMenu from "./components/AboutMeMenu";
import MobileControls from "./components/MobileControls";

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
      <div className="flex justify-center">
        <div className="lg:flex lg:flex-row-reverse">
          {/* Next Piece and Score */}
          <div className="flex justify-center self-center lg:h-full">
            <div className="flex lg:flex-col lg:h-full lg:justify-start lg:gap-5 lg:pt-1 lg:pl-2">
              <NextPieceMenu />
              <ScoreMenu />
            </div>
          </div>
          {/* The game + restart menu*/}
          <div>
            <OptionsMenu />
            <Board />
            <MobileControls />
          </div>
        </div>
      </div>
      <AboutMeMenu />
    </button>
  );
}

export default App;
