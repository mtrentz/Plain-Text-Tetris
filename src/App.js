import { useState, useContext } from "react";
import GameContext from "./contexts/GameContext";
import Board from "./components/Board";

function App() {
  const { handleKeyPress } = useContext(GameContext);

  return (
    <button
      className="bg-gray-600 w-full h-full cursor-auto"
      onKeyDown={handleKeyPress}
    >
      <Board />
    </button>
  );
}

export default App;
