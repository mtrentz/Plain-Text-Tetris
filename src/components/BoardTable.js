import React from "react";
import pieces from "../tetris/Pieces";

const BoardTable = ({ mergedBoard }) => {
  let asciiTable = "";

  // Cria o separador de linha com o mesmo numero das colunas no board
  let separator = "+" + "---+".repeat(mergedBoard[0].length) + "\n";

  asciiTable += separator;
  for (let i = 0; i < mergedBoard.length; i++) {
    for (let j = 0; j < mergedBoard[i].length; j++) {
      let element = mergedBoard[i][j] ? mergedBoard[i][j] : "-";
      asciiTable += `| ${element} `;
    }
    asciiTable += `|\n${separator}`;
  }

  //   Cria um array de cada caractere na tabela ascii
  let arrayChars = [...asciiTable];
  let pieceNumbers = Object.keys(pieces);

  return (
    <>
      {arrayChars.map((char) =>
        pieceNumbers.includes(char) ? (
          <span style={{ color: pieces[char].color, fontWeight: "bold" }}>
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
