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
    if (!gamePaused) {
      if (touchOtherPieceHorizontally(gameBoard, pieceBoard)) {
        return;
      }
      pieceBoard.moveRight();
      updateMergedBoard(pieceBoard.board, gameBoard.board);
    }
  };

  const movePieceLeft = () => {
    if (!gamePaused) {
      if (touchOtherPieceHorizontally(gameBoard, pieceBoard)) {
        return;
      }
      pieceBoard.moveLeft();
      updateMergedBoard(pieceBoard.board, gameBoard.board);
    }
  };

  const pieceCanRotate = () => {
    if (pieceBoard.x1 < 0) {
      return false;
    }

    // Corta a peça do seu board, na sua posição atual
    let croppedPiece = pieceBoard.cropBoard(pieceBoard.x1, pieceBoard.y1, pieceBoard.x2, pieceBoard.y2);

    // Aplica a rotação na peça atual
    let rotated = pieceBoard.rotateMatrix(croppedPiece);

    // Pega a mesma posição da peça porém no gameBoard
    let croppedBoard = gameBoard.cropBoard(pieceBoard.x1, pieceBoard.y1, pieceBoard.x2, pieceBoard.y2);

    for (let j = 0; j < rotated.length; j++) {
      for (let i = 0; i < rotated.length; i++) {
        if ((croppedBoard[i][j] > 0 && rotated[i][j] > 0) || pieceBoard.x1 < 0 || pieceBoard.x2 >= settings.columns) {
          return false;
        }
      }
    }
    return true;
  };

  const rotatePiece = () => {
    if (!gamePaused && pieceCanRotate()) {
      pieceBoard.rotate();
      updateMergedBoard(pieceBoard.board, gameBoard.board);
    }
  };

  const mergeBoards = (gameBoardMatrix, pieceBoardMatrix) => {
    // Deep copy of boardBoard
    let mergedBoard = gameBoardMatrix.map((row) => [...row]);
    for (let i = 0; i < settings.rows; i++) {
      for (let j = 0; j < settings.columns; j++) {
        if (pieceBoardMatrix[i][j] > 0) {
          mergedBoard[i][j] = pieceBoardMatrix[i][j];
        }
      }
    }

    // Here is where I "hide" the two extra rows at the top,
    // that serves as space for the piece to spawn and rotate
    mergedBoard = mergedBoard.slice(settings.extraRows, settings.rows);
    return mergedBoard;
  };

  const updateMergedBoard = (pieceBoard, gameBoard) => {
    setMergedBoard(mergeBoards(pieceBoard, gameBoard));
  };

  const generatePieceNumber = () => {
    let number = Math.floor(1 + Math.random() * Object.keys(pieces).length);
    return number;
  };

  const { pieceBoard, createNewPieceBoard } = useContext(PieceBoardContext);
  const { gameBoard } = useContext(GameBoardContext);
  const { counter, speed, setFast, setNormal, forceFrameSkip, pauseGame, resumeGame, gamePaused } =
    useContext(TimeContext);

  const [mergedBoard, setMergedBoard] = useState(mergeBoards(pieceBoard.board, gameBoard.board));
  const [nextPieceNumber, setNextPieceNumber] = useState(generatePieceNumber());
  const [score, setScore] = useState(0);
  const [pieceLifeSpan, setPieceLifeSpan] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [frameSkipped, setFrameSkipped] = useState(false);

  // Runs every "frame"
  useEffect(() => {
    if (pieceBoard.touchFloor() || touchOtherPieceVertically(gameBoard, pieceBoard)) {
      // Put piece into actual board
      gameBoard.consume(pieceBoard);

      // This function clear lines if needs to, and return score if so
      let scored = gameBoard.getScore();

      // Add score to counter
      if (scored) {
        setScore(score + scored);
        updateMergedBoard(pieceBoard.board, gameBoard.board);
      }

      // If the the lifespan of the piece is zero, means it "died" as it spawned. So its game over.
      if (pieceLifeSpan === 0) {
        setGameOver(true);
        pauseGame();
      }

      // Create new piece
      createNewPieceBoard(nextPieceNumber);
      setNextPieceNumber(generatePieceNumber());
      // Set piece lifespan to 0
      setPieceLifeSpan(0);
    } else {
      pieceBoard.applyGravity();
      setPieceLifeSpan(pieceLifeSpan + 1);
    }
    updateMergedBoard(pieceBoard.board, gameBoard.board);
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
        // This is used to make sure that the piece moves down as soon as
        // "move down" is trigerred, and makes the game feel more responsive
        if (!frameSkipped && !gamePaused) {
          setFrameSkipped(true);
          forceFrameSkip();
        }
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
        setFrameSkipped(false);
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
    nextPieceNumber,
  };

  return <GameContext.Provider value={contextData}>{children}</GameContext.Provider>;
};
