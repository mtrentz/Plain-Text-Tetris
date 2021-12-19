import { createContext, useState, useContext, useEffect } from "react";
import Piece from "../tetris/Piece";
import TimeContext from "./TimeContext";

const GameContext = createContext();

export default GameContext;
let piece = new Piece(18, 10);

export const GameProvider = ({ children }) => {
  // let piece;

  useEffect(() => {
    console.log("yo");
  }, []);

  // console.log("yo");
  var [board, setBoard] = useState(piece.board);

  const { counter } = useContext(TimeContext);

  useEffect(() => {
    piece.applyGravity();
    setBoard(piece.board);
  }, [counter]);

  const [key, setKey] = useState("");

  const handleKeyPress = (e) => {
    // setKey(e.key);
    switch (e.key) {
      case "w":
        // setBoard(upArrow);
        break;
      default:
        break;
    }
  };

  // create contextData object
  const contextData = {
    board,
    setBoard,
    handleKeyPress,
  };

  return (
    <GameContext.Provider value={contextData}>{children}</GameContext.Provider>
  );
};
