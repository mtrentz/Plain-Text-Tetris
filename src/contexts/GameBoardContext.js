import { createContext, useState, useEffect } from "react";
import GameBoard from "../tetris/GameBoard";

const GameBoardContext = createContext();

export default GameBoardContext;

export const GameBoardProvider = ({ children }) => {
  const [gameBoard, setGameBoard] = useState(new GameBoard());

  const clearGameBoard = () => {
    setGameBoard(new GameBoard());
  };

  const contextData = {
    gameBoard,
    setGameBoard,
    clearGameBoard,
  };

  return <GameBoardContext.Provider value={contextData}>{children}</GameBoardContext.Provider>;
};
