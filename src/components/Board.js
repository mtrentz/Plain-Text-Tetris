import React, { useContext } from "react";
import GameContext from "../contexts/GameContext";
import TimeContext from "../contexts/TimeContext";

const Board = () => {
  const { gameBoard, score, gameOver } = useContext(GameContext);
  const { counter } = useContext(TimeContext);

  let table = "";

  // Cria o separador de linha com o mesmo numero das colunas no board
  let separator = "+" + "---+".repeat(gameBoard[0].length) + "\n";

  // TODO: Usar SPAN pra fazer as cores...
  table += separator;
  for (let i = 0; i < gameBoard.length; i++) {
    for (let j = 0; j < gameBoard[i].length; j++) {
      let element = gameBoard[i][j] ? "#" : "-";
      table += `| ${element} `;
    }
    table += `|\n${separator}`;
  }

  // Game Over Table
  let extraSpace = gameBoard[0].length - "Game Over".length;
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
  let emptyLine = "| - ".repeat(gameBoard[0].length) + "|";
  let gameOverTable = "";
  gameOverTable += separator;
  for (let i = 0; i < gameBoard.length; i++) {
    if (i % 2 == 0) {
      gameOverTable += gameOverLine + "\n";
    } else {
      gameOverTable += emptyLine + "\n";
    }
    gameOverTable += separator;
  }

  // TODO: Preciso achar um jeito de colocar a cor depois... Acho que vai ser hard
  return (
    <div>
      <p> Score - {score}</p>
      <pre className="whitespace-pre-wrap leading-4 tracking-wider">
        {gameOver ? gameOverTable : table}
      </pre>
      <p> Frame count - {counter}</p>
    </div>
  );
};

export default Board;
