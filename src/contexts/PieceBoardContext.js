import { createContext, useState, useContext } from "react";
import PieceOrderContext from "./PieceOrderContext";
import PieceBoard from "../tetris/PieceBoard";
import pieces from "../tetris/Pieces";

const PieceBoardContext = createContext();

export default PieceBoardContext;

export const PieceBoardProvider = ({ children }) => {
  const { popFirstPieceNumber } = useContext(PieceOrderContext);

  // // This is user to generate only first random piece
  // const generatePieceNumber = () => {
  //   let number = Math.floor(1 + Math.random() * Object.keys(pieces).length);
  //   return number;
  // };

  const [pieceBoard, setPieceBoard] = useState(new PieceBoard(popFirstPieceNumber()));

  const createNewPieceBoard = (pieceNumber) => {
    setPieceBoard(new PieceBoard(pieceNumber));
  };

  const contextData = {
    pieceBoard,
    createNewPieceBoard,
  };

  return <PieceBoardContext.Provider value={contextData}>{children}</PieceBoardContext.Provider>;
};
