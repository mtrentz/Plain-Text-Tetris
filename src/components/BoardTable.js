import React from "react";
import pieces from "../tetris/Pieces";
import CreateAsciiMatrix from "../helpers/CreateAsciiMatrix";

const BoardTable = ({ mergedBoard }) => {
  let asciiMatrix = CreateAsciiMatrix(mergedBoard);

  //   Transforma a string em ascii da matriz em um array 1d com cada caractere (mantem \n pra newline)
  let arrayChars = [...asciiMatrix];
  let pieceNumbers = Object.keys(pieces);

  return (
    <>
      {arrayChars.map((char, index) =>
        pieceNumbers.includes(char) ? (
          <span key={index} style={{ color: pieces[char].color, fontWeight: "bold" }}>
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
