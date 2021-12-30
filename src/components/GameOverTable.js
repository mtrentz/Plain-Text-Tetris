import React from "react";

const GameOverTable = ({ mergedBoard }) => {
  let separator = "+" + "---+".repeat(mergedBoard[0].length) + "\n";

  // Game Over Table
  let extraSpace = mergedBoard[0].length - "Game Over".length;
  let spaceAddSide;
  let spaceAddMiddle;
  if (extraSpace % 2 == 0) {
    spaceAddSide = extraSpace / 2;
    spaceAddMiddle = 0;
  } else {
    spaceAddSide = Math.floor(extraSpace / 2);
    spaceAddMiddle = 1;
  }
  let gameOverLine =
    "| - ".repeat(spaceAddSide) +
    "| G | A | M | E " +
    "| - ".repeat(spaceAddMiddle + 1) +
    "| O | V | E | R " +
    "| - ".repeat(spaceAddSide) +
    "|";
  let emptyLine = "| - ".repeat(mergedBoard[0].length) + "|";
  let gameOverAsciiTable = "";
  gameOverAsciiTable += separator;
  for (let i = 0; i < mergedBoard.length; i++) {
    if (i % 2 == 0) {
      gameOverAsciiTable += gameOverLine + "\n";
    } else {
      gameOverAsciiTable += emptyLine + "\n";
    }
    gameOverAsciiTable += separator;
  }

  let arrayChars = [...gameOverAsciiTable];
  let gameOverChars = ["G", "A", "M", "E", "O", "V", "E", "R"];

  return (
    <>
      {arrayChars.map((char, index) =>
        gameOverChars.includes(char) ? (
          <span key={index} className="text-red-700 font-bold">
            {char}
          </span>
        ) : (
          char
        )
      )}
    </>
  );
};

export default GameOverTable;
