class Board {
  constructor(boardRows, boardCols) {
    this.boardRows = boardRows;
    this.boardCols = boardCols;

    this.board = this.createBoard();
  }

  createBoard() {
    let b = [];
    let lineArray = [];
    for (var i = 0; i < this.boardRows; i++) {
      for (var j = 0; j < this.boardCols; j++) {
        lineArray.push(0);
      }
      b.push(lineArray);
      lineArray = [];
    }
    return b;
  }

  consume(piece) {
    for (var i = 0; i < this.boardRows; i++) {
      for (var j = 0; j < this.boardCols; j++) {
        if (piece.board[i][j] > 0) {
          this.board[i][j] = piece.board[i][j];
        }
      }
    }
  }

  deleteLine(i) {
    let newTopLine = new Array(this.boardCols).fill(0);
    let aboveLines = this.board.slice(0, i);
    let updatedBoard;
    if (i + 1 < this.boardRows) {
      let belowLines = this.board.slice(i + 1, this.boardRows);
      updatedBoard = [newTopLine, ...aboveLines, ...belowLines];
    } else {
      updatedBoard = [newTopLine, ...aboveLines];
    }

    this.board = updatedBoard;
  }

  getScore() {
    let score = 0;
    for (var i = 0; i < this.boardRows; i++) {
      if (this.board[i].every((element) => element > 0)) {
        this.deleteLine(i);
        score++;
      }
    }

    return score;
  }
}

export default Board;
