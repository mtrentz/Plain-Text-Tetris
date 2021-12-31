import { createContext, useState, useContext } from "react";
// import PieceOrderContext from "./PieceOrderContext";
import PieceBoard from "../tetris/PieceBoard";

const PieceBoardContext = createContext();

export default PieceBoardContext;

export const PieceBoardProvider = ({ children }) => {
  // const { startingPiece } = useContext(PieceOrderContext);

  const [pieceBoard, setPieceBoard] = useState(new PieceBoard());

  const createNewPieceBoard = (pieceNumber) => {
    setPieceBoard(new PieceBoard(pieceNumber));
  };

  const contextData = {
    pieceBoard,
    createNewPieceBoard,
  };

  return (
    <PieceBoardContext.Provider value={contextData}>
      {children}
    </PieceBoardContext.Provider>
  );
};
