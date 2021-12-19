import { createContext, useState, useContext, useEffect } from "react";
import TimeContext from "./TimeContext";
import PieceContext from "./PieceContext";
import BoardContext from "./BoardContext";
import settings from "../tetris/settings";

const GameContext = createContext();

export default GameContext;

export const GameProvider = ({ children }) => {
  const touchOtherPieceVertically = (b, p) => {
    for (let i = settings.rows - 1; i >= 0; i--) {
      for (let j = 0; j < settings.columns; j++) {
        if (p.board[i][j] > 0) {
          if (b.board[i + 1][j] > 0) {
            return true;
          }
        }
      }
    }
    return false;
  };

  const touchOtherPieceHorizontally = (b, p) => {
    for (let i = 0; i < settings.rows; i++) {
      for (let j = 0; j < settings.columns; j++) {
        if (p.board[i][j] > 0) {
          if (j - 1 < 0 || j + 1 > settings.columns - 1) {
            continue;
          }
          if (b.board[i][j + 1] > 0 || b.board[i][j - 1] > 0) {
            return true;
          }
        }
      }
    }
    return false;
  };

  const movePieceRight = () => {
    if (touchOtherPieceHorizontally(board, piece)) {
      return;
    }
    // TODO: Quero colocar o setGameBoard aqui
    piece.moveRight();
    updateGameBoard();
  };

  const movePieceLeft = () => {
    if (touchOtherPieceHorizontally(board, piece)) {
      return;
    }
    // TODO: Quero colocar o setGameBoard aqui
    piece.moveLeft();
    updateGameBoard();
  };

  const mergeBoards = (pieceBoard, boardBoard) => {
    // Deep copy of boardBoard
    // let mergedBoard = JSON.parse(JSON.stringify(boardBoard));
    let mergedBoard = boardBoard.map((row) => [...row]);
    for (let i = 0; i < settings.rows; i++) {
      for (let j = 0; j < settings.columns; j++) {
        if (pieceBoard[i][j] > 0) {
          mergedBoard[i][j] = pieceBoard[i][j];
        }
      }
    }
    return mergedBoard;
  };

  const updateGameBoard = () => {
    setGameBoard(mergeBoards(piece.board, board.board));
  };

  const { piece, createNewPiece } = useContext(PieceContext);
  const { board } = useContext(BoardContext);

  const { counter, speed, setFast, setNormal } = useContext(TimeContext);

  var [gameBoard, setGameBoard] = useState(piece.board);

  // Runs every "frame"
  useEffect(() => {
    if (piece.touchFloor() || touchOtherPieceVertically(board, piece)) {
      // Put piece into actual board
      board.consume(piece);
      // Create new piece
      createNewPiece();
    } else {
      piece.applyGravity();
    }

    updateGameBoard();

    // setNormal();
  }, [counter]);

  const [key, setKey] = useState("");

  const handleKeyPress = (e) => {
    // setKey(e.key);
    switch (e.key) {
      case "ArrowLeft":
      case "Left":
      case "a":
        movePieceLeft();
        break;
      case "ArrowRight":
      case "Right":
      case "d":
        movePieceRight();
        break;
      case "ArrowDown":
      case "Down":
      case "s":
        setFast();
        break;
      default:
        break;
    }
  };

  const handleKeyRelease = (e) => {
    switch (e.key) {
      case "ArrowDown":
      case "Down":
      case "s":
        setNormal();
        break;
      default:
        break;
    }
  };

  // create contextData object
  const contextData = {
    gameBoard,
    setGameBoard,
    handleKeyPress,
    handleKeyRelease,
  };

  return (
    <GameContext.Provider value={contextData}>{children}</GameContext.Provider>
  );
};
