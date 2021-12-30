import { createContext, useState, useEffect } from "react";
import pieces from "../tetris/Pieces";

const PieceOrderContext = createContext();

export default PieceOrderContext;

export const PieceOrderProvider = ({ children }) => {
  function shuffleArray(array) {
    // From this post https://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array
    for (var i = array.length - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1));
      var temp = array[i];
      array[i] = array[j];
      array[j] = temp;
    }
  }

  const generateRandomPieceArray = () => {
    //   Creates an array of pieces randomly sorted. Containing 1 of each piece in the game
    let randomArray = [...pieceNumbers];
    shuffleArray(randomArray);
    return randomArray;
  };

  const fillQueue = () => {
    // This adds a randomly sorted array of pieces (1 of each) at the end of the current queue
    // The queue always increases in increments of the amount of pieces in the game.
    let toAdd = generateRandomPieceArray();
    setPiecesQueue([...piecesQueue, ...toAdd]);
  };

  const startingQueue = () => {
    // Generates the first queue of pieces.
    let arr1 = generateRandomPieceArray();
    let arr2 = generateRandomPieceArray();
    return [...arr1, ...arr2];
  };

  const popFirstPieceNumber = () => {
    let first = piecesQueue[0];
    setPiecesQueue(piecesQueue.slice(1));
    return first;
  };

  // Array containing all the piece numbers
  const pieceNumbers = Object.keys(pieces);
  // Amount of pieces in the game
  const amountOfGamePieces = pieceNumbers.length;

  const [piecesQueue, setPiecesQueue] = useState(startingQueue());

  useEffect(() => {
    // Checks everytime the queue changes if is half empty.
    // If so, fill it.

    // The usual queue size is twice the amount of pieces in the game.
    if (piecesQueue.length < amountOfGamePieces) {
      fillQueue();
    }
  }, [piecesQueue]);

  const contextData = {
    popFirstPieceNumber,
  };
  return <PieceOrderContext.Provider value={contextData}>{children}</PieceOrderContext.Provider>;
};
