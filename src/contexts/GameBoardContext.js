import { createContext, useState, useEffect } from "react";
import GameBoard from "../tetris/GameBoard";

const GameBoardContext = createContext();

export default GameBoardContext;

export const GameBoardProvider = ({ children }) => {
  // TODO: Adicionar o board aqui. Preciso puxar o tamanho dele e mudar no Board em si
  const [gameBoard, setGameBoard] = useState(new GameBoard());

  const contextData = {
    gameBoard,
    setGameBoard,
  };

  return (
    <GameBoardContext.Provider value={contextData}>
      {children}
    </GameBoardContext.Provider>
  );
};
