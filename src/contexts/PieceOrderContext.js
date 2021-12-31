import React, { createContext, useState, useEffect } from "react";
import pieces from "../tetris/Pieces";

const PieceOrderContext = createContext();

export default PieceOrderContext;

export const PieceOrderProvider = ({ children }) => {
  const shuffleArray = (arr) => {
    // From this post https://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array
    for (var i = arr.length - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1));
      var temp = arr[i];
      arr[i] = arr[j];
      arr[j] = temp;
    }
  };

  const generateRandomPieceArray = () => {
    //   Creates an array of pieces randomly sorted. Containing 1 of each piece in the game
    let randomArray = [...pieceNumbers];
    shuffleArray(randomArray);
    return randomArray;
  };

  const fillQueue = () => {
    // Check if queue is half empty. If so, fill it.
    // The usual queue size is twice the amount of pieces in the game.
    if (piecesQueue.length < amountOfGamePieces) {
      // This adds a randomly sorted array of pieces (1 of each) at the end of the current queue
      // The queue always increases in increments of the amount of pieces in the game.
      let toAdd = generateRandomPieceArray();
      setPiecesQueue([...piecesQueue, ...toAdd]);
    }
  };

  const startQueue = () => {
    // This starts the queue. The first two elements
    // are removed and return, since they are used for the first rendering.

    // Generates the first queue of pieces.
    let arr1 = generateRandomPieceArray();
    let arr2 = generateRandomPieceArray();

    let queue = [...arr1, ...arr2];

    let first = queue[0];
    let second = queue[1];

    setPiecesQueue(queue.slice(2));

    return [first, second];
  };

  const popFirstPieceNumber = () => {
    let first = piecesQueue[0];
    setPiecesQueue(piecesQueue.slice(1));
    fillQueue();

    return first;
  };

  // Array containing all the piece numbers
  const pieceNumbers = Object.keys(pieces);
  // Amount of pieces in the game
  const amountOfGamePieces = pieceNumbers.length;

  // This is used for the first piece only. Since the first render can't call popFirstPieceMember.
  // let startingPiece = 0;
  const [piecesQueue, setPiecesQueue] = useState();

  const contextData = {
    popFirstPieceNumber,
    startQueue,
  };

  return (
    <PieceOrderContext.Provider value={contextData}>
      {children}
    </PieceOrderContext.Provider>
  );
};
