import React from "react";
import pieces from "../tetris/Pieces";
import CreateAsciiMatrix from "../helpers/CreateAsciiMatrix";
import settings from "../tetris/settings";

const BoardTable = ({ mergedBoard }) => {
  // If no board, start empty one
  if (!mergedBoard) {
    mergedBoard = new Array(settings.rows)
      .fill(0)
      .map(() => Array(settings.columns).fill(0));
  }

  let asciiMatrix = CreateAsciiMatrix(mergedBoard);

  //   Transforma a string em ascii da matriz em um array 1d com cada caractere (mantem \n pra newline)
  let arrayChars = [...asciiMatrix];
  let pieceNumbers = Object.keys(pieces);

  return (
    <>
      {arrayChars.map((char, index) =>
        pieceNumbers.includes(char) ? (
          <span
            key={index}
            style={{ color: pieces[char].color, fontWeight: "bold" }}
          >
            #
          </span>
        ) : (
          char
        )
      )}
    </>
  );
};

export default BoardTable;
