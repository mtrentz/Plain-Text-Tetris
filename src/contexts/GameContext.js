import { createContext, useState, useContext, useEffect } from "react";
import TimeContext from "./TimeContext";
import PieceBoardContext from "./PieceBoardContext";
import GameBoardContext from "./GameBoardContext";
import pieces from "../tetris/Pieces";
import settings from "../tetris/settings";

const GameContext = createContext();

export default GameContext;

export const GameProvider = ({ children }) => {
  const touchOtherPieceVertically = (gameBoard, pieceBoard) => {
    for (let i = settings.rows - 1; i >= 0; i--) {
      for (let j = 0; j < settings.columns; j++) {
        if (pieceBoard.board[i][j] > 0) {
          if (gameBoard.board[i + 1][j] > 0) {
            return true;
          }
        }
      }
    }
    return false;
  };

  const touchOtherPieceHorizontally = (gameBoard, pieceBoard) => {
    for (let i = 0; i < settings.rows; i++) {
      for (let j = 0; j < settings.columns; j++) {
        if (pieceBoard.board[i][j] > 0) {
          if (j - 1 < 0 || j + 1 > settings.columns - 1) {
            continue;
          }
          if (gameBoard.board[i][j + 1] > 0 || gameBoard.board[i][j - 1] > 0) {
            return true;
          }
        }
      }
    }
    return false;
  };

  const movePieceRight = () => {
    if (touchOtherPieceHorizontally(gameBoard, pieceBoard)) {
      return;
    }
    pieceBoard.moveRight();
    updateMergedBoard();
  };

  const movePieceLeft = () => {
    if (touchOtherPieceHorizontally(gameBoard, pieceBoard)) {
      return;
    }
    pieceBoard.moveLeft();
    updateMergedBoard();
  };

  const pieceCanRotate = () => {
    if (pieceBoard.x1 < 0) {
      return false;
    }

    // Corta a peça do seu board, na sua posição atual
    let croppedPiece = pieceBoard.cropBoard(
      pieceBoard.x1,
      pieceBoard.y1,
      pieceBoard.x2,
      pieceBoard.y2
    );

    // Aplica a rotação na peça atual
    let rotated = pieceBoard.rotateMatrix(croppedPiece);

    // Pega a mesma posição da peça porém no gameBoard
    let croppedBoard = gameBoard.cropBoard(
      pieceBoard.x1,
      pieceBoard.y1,
      pieceBoard.x2,
      pieceBoard.y2
    );

    for (let j = 0; j < rotated.length; j++) {
      for (let i = 0; i < rotated.length; i++) {
        if (
          (croppedBoard[i][j] > 0 && rotated[i][j] > 0) ||
          pieceBoard.x1 < 0 ||
          pieceBoard.x2 >= settings.columns
        ) {
          return false;
        }
      }
    }
    return true;
  };

  const rotatePiece = () => {
    if (pieceCanRotate()) {
      pieceBoard.applyRotation();
      updateMergedBoard();
    }
  };

  const mergeBoards = (gameBoard, pieceBoard) => {
    let pieceBoardCount = gameBoard
      .reduce(function (a, b) {
        return a.concat(b);
      }) // flatten array
      .reduce(function (a, b) {
        a = a >= 1 ? 1 : 0;
        b = b >= 1 ? 1 : 0;
        return a + b;
      });

    let gameBoardCount = pieceBoard
      .reduce(function (a, b) {
        return a.concat(b);
      }) // flatten array
      .reduce(function (a, b) {
        a = a >= 1 ? 1 : 0;
        b = b >= 1 ? 1 : 0;
        return a + b;
      });

    console.log("Game:", gameBoardCount, " ", "Piece:", pieceBoardCount);
    // console.log("Piece:", pieceBoardCount);

    // Deep copy of boardBoard
    let mergedBoard = gameBoard.map((row) => [...row]);
    for (let i = 0; i < settings.rows; i++) {
      for (let j = 0; j < settings.columns; j++) {
        if (pieceBoard[i][j] > 0) {
          mergedBoard[i][j] = pieceBoard[i][j];
        }
      }
    }
    return mergedBoard;
  };

  const updateMergedBoard = () => {
    setMergedBoard(mergeBoards(pieceBoard.board, gameBoard.board));
  };

  const generatePieceNumber = () => {
    let number = Math.floor(1 + Math.random() * Object.keys(pieces).length);
    return number;
  };

  const { pieceBoard, createNewPieceBoard } = useContext(PieceBoardContext);
  const { gameBoard } = useContext(GameBoardContext);
  const { counter, speed, setFast, setNormal } = useContext(TimeContext);
  const [mergedBoard, setMergedBoard] = useState(
    mergeBoards(pieceBoard.board, gameBoard.board)
  );
  const [score, setScore] = useState(0);
  const [pieceLifeSpan, setPieceLifeSpan] = useState(0);
  const [gameOver, setGameOver] = useState(false);

  // Runs once, "setup"
  useEffect(() => {
    pieceBoard.spawnPiece();
    console.log("ran");
  }, []);

  // Runs every "frame"
  useEffect(() => {
    if (
      pieceBoard.touchFloor() ||
      touchOtherPieceVertically(gameBoard, pieceBoard)
    ) {
      // Put piece into actual board
      gameBoard.consume(pieceBoard);

      // This function clear lines if needs to, and return score if so
      let scored = gameBoard.getScore();

      // Add score to counter
      if (scored) {
        console.log("scored");
        setScore(score + scored);
        updateMergedBoard();
      }

      // If the the lifespan of the piece is zero, means it "died" as it spawned. So its game over.
      if (pieceLifeSpan === 0) {
        console.log("game over");
        setGameOver(true);
      }

      // Create new piece
      createNewPieceBoard(generatePieceNumber());
      console.log("created new piece");
      // Set piece lifespan to 0
      setPieceLifeSpan(0);
    } else {
      // console.log(pieceBoard);
      pieceBoard.applyGravity();
      setPieceLifeSpan(pieceLifeSpan + 1);
    }
    updateMergedBoard();
  }, [counter]);

  const handleKeyPress = (e) => {
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
      case "ArrowUp":
      case "Up":
      case "w":
        rotatePiece();
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
    mergedBoard,
    setMergedBoard,
    handleKeyPress,
    handleKeyRelease,
    score,
    gameOver,
  };

  return (
    <GameContext.Provider value={contextData}>{children}</GameContext.Provider>
  );
};
