import React, { useContext } from "react";
import GameContext from "../contexts/GameContext";
import pieces from "../tetris/Pieces";
import CreateAsciiMatrix from "../helpers/CreateAsciiMatrix";

const NextPieceMenu = () => {
  const { nextPieceNumber } = useContext(GameContext);

  let pieceMatrix;
  let pieceName;
  let pieceColor;

  if (!nextPieceNumber) {
    // Empty piece for an empty first render
    pieceMatrix = new Array(3).fill(0).map(() => Array(3).fill(0));
    pieceName = "?";
    pieceColor = "white";
  } else {
    pieceMatrix = pieces[nextPieceNumber].matrix;
    pieceName = pieces[nextPieceNumber].name;
    pieceColor = pieces[nextPieceNumber].color;
  }
  let asciiMatrix = CreateAsciiMatrix(pieceMatrix);

  let arrayChars = [...asciiMatrix];
  let pieceNumbers = Object.keys(pieces);

  let moveUpPieceTwice = ["L", "T", "J"];
  let moveUpPieceOnce = ["I"];

  // Gambiarra pra desenhar algumas peças mais pra cima e ficar mais bonito
  if (moveUpPieceTwice.includes(pieceName)) {
    let indexToRemove = arrayChars.findIndex((val, index) => val === "\n");
    if (indexToRemove > -1) {
      arrayChars.splice(indexToRemove, 1);
    }
    indexToRemove = arrayChars.findIndex((val, index) => val === "\n");
    if (indexToRemove > -1) {
      arrayChars.splice(indexToRemove, 1);
    }
  }

  if (moveUpPieceOnce.includes(pieceName)) {
    let indexToRemove = arrayChars.findIndex((val, index) => val === "\n");
    if (indexToRemove > -1) {
      arrayChars.splice(indexToRemove, 1);
    }
  }

  return (
    <pre className="whitespace-pre-wrap leading-4 tracking-normal h-28 w-48 md:tracking-wider">
      <p>Next Piece in Line</p>
      {arrayChars.map((char, index) =>
        pieceNumbers.includes(char) ? (
          <span key={index} style={{ color: pieceColor, fontWeight: "bold" }}>
            #
          </span>
        ) : char === "\n" ? (
          char
        ) : (
          " "
        )
      )}
    </pre>
  );
};

export default NextPieceMenu;
