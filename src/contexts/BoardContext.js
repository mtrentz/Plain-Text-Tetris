import { createContext, useState, useEffect } from "react";
import Board from "../tetris/Board";
import settings from "../tetris/settings";

const BoardContext = createContext();

export default BoardContext;

export const BoardProvider = ({ children }) => {
  // TODO: Adicionar o board aqui. Preciso puxar o tamanho dele e mudar no Board em si
  const [board, setBoard] = useState(
    new Board(settings.rows, settings.columns)
  );

  const contextData = {
    board,
  };

  return (
    <BoardContext.Provider value={contextData}>
      {children}
    </BoardContext.Provider>
  );
};
