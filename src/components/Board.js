import React, { useContext } from "react";
import GameContext from "../contexts/GameContext";
import TimeContext from "../contexts/TimeContext";

const Board = () => {
  const { gameBoard, setGameBoard } = useContext(GameContext);

  const { counter } = useContext(TimeContext);

  let table = "";

  // Cria o separador de linha com o mesmo numero das colunas no board
  let separator = "+" + "---+".repeat(gameBoard[0].length) + "\n";

  table += separator;
  for (let i = 0; i < gameBoard.length; i++) {
    for (let j = 0; j < gameBoard[i].length; j++) {
      let element = gameBoard[i][j] ? "#" : "-";
      table += `| ${element} `;
    }
    table += `|\n${separator}`;
  }

  // TODO: Preciso achar um jeito de colocar a cor depois... Acho que vai ser hard

  return (
    <div>
      <pre className="whitespace-pre-wrap leading-3 tracking-wider">
        {table}
      </pre>
      <p> - {counter}</p>
    </div>
  );
};

export default Board;
