import settings from "./settings";

class Board {
  constructor() {
    this.board = this.createEmptyBoard();
  }

  createEmptyBoard() {
    let board = new Array(settings.rows)
      .fill(0)
      .map(() => Array(settings.columns).fill(0));
    return board;
  }

  cleanBoard() {
    this.board = this.createEmptyBoard();
  }

  cropBoard(x1, y1, x2, y2) {
    let croppedLines;
    let cropped = [];

    croppedLines = this.board.slice(y1, y2 + 1);

    for (let i in croppedLines) {
      cropped.push(croppedLines[i].slice(x1, x2 + 1));
    }
    return cropped;
  }
}

export default Board;
