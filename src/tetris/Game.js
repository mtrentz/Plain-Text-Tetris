class Game {
  constructor(piece, board) {
    this.piece = piece;
    this.board = board;
    this.pieceLifespan = 0;
    this.score = 0;
  }

  start() {
    this.board.drawGrid();
    this.board.draw();
    this.piece.draw();
  }

  update() {
    if (
      this.piece.touchFloor() ||
      this.touchOtherPieceVertically(this.board, this.piece)
    ) {
      this.board.consume(this.piece);

      this.score += this.board.getScore();

      if (this.pieceLifespan == 0) {
        this.gameOver();
      }
      this.piece = new Piece();
      this.pieceLifespan = 0;
    } else {
      this.piece.applyGravity();
      this.pieceLifespan++;
    }

    this.piece.draw();
    this.board.drawGrid();
    this.board.draw();
  }

  gameOver() {
    background(255);
    this.piece = new Piece();
    this.board = new Board();
    this.pieceLifespan = 0;
    this.score = 0;
  }

  movePieceRight() {
    if (this.touchOtherPieceHorizontally(this.board, this.piece)) {
      return;
    }
    this.piece.moveRight();
    //
  }

  movePieceLeft() {
    if (this.touchOtherPieceHorizontally(this.board, this.piece)) {
      return;
    }
    this.piece.moveLeft();
  }

  touchOtherPieceVertically(b, p) {
    for (let i = rows - 1; i >= 0; i--) {
      for (let j = 0; j < cols; j++) {
        if (p.board[i][j] > 0) {
          if (b.board[i + 1][j] > 0) {
            return true;
          }
        }
      }
    }
    return false;
  }

  touchOtherPieceHorizontally(b, p) {
    for (let i = 0; i < rows; i++) {
      for (let j = 0; j < cols; j++) {
        if (p.board[i][j] > 0) {
          if (j - 1 < 0 || j + 1 > cols - 1) {
            continue;
          }
          if (b.board[i][j + 1] > 0 || b.board[i][j - 1] > 0) {
            return true;
          }
        }
      }
    }
    return false;
  }
}

export default Game;
