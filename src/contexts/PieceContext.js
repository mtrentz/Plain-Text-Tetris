import { createContext, useState, useEffect } from "react";
import settings from "../tetris/settings";
import Piece from "../tetris/Piece";

const PieceContext = createContext();

export default PieceContext;

export const PieceProvider = ({ children }) => {
  const [piece, setPiece] = useState(
    new Piece(settings.rows, settings.columns)
  );

  const createNewPiece = () => {
    setPiece(new Piece(settings.rows, settings.columns));
  };
  //   const applyGravity = () => {

  const contextData = {
    piece,
    createNewPiece,
  };

  return (
    <PieceContext.Provider value={contextData}>
      {children}
    </PieceContext.Provider>
  );
};
