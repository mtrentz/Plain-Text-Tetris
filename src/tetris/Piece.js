const pieces = {
  1: {
    name: "L",
    color: "#ff8d00",
    matrix: [
      [1, 1, 1],
      [1, 0, 0],
      [0, 0, 0],
    ],
  },
  2: {
    name: "T",
    color: "#9f0096",
    matrix: [
      [1, 1, 1],
      [0, 1, 0],
      [0, 0, 0],
    ],
  },
  3: {
    name: "J",
    color: "#ff51bc",
    matrix: [
      [1, 1, 1],
      [0, 0, 1],
      [0, 0, 0],
    ],
  },
  4: {
    name: "S",
    color: "#f60000",
    matrix: [
      [0, 1, 1],
      [1, 1, 0],
      [0, 0, 0],
    ],
  },
  5: {
    name: "Z",
    color: "#69b625",
    matrix: [
      [1, 1, 0],
      [0, 1, 1],
      [0, 0, 0],
    ],
  },
  6: {
    name: "O",
    color: "#faff00",
    matrix: [
      [1, 1],
      [1, 1],
    ],
  },
  7: {
    name: "I",
    color: "#00e4ff",
    matrix: [
      [1, 1, 1, 1],
      [0, 0, 0, 0],
      [0, 0, 0, 0],
      [0, 0, 0, 0],
    ],
  },
};

class Piece {
  constructor(boardRows, boardCols) {
    // Posição da caixa da piece
    this.x1 = 0;
    this.y1 = 0;
    this.x2 = 0;
    this.y2 = 0;

    this.boardRows = boardRows;
    this.boardCols = boardCols;

    this.pieceNumber = this.generatePieceNumber();
    this.piece = pieces[this.pieceNumber];

    this.board = this.startBoard();
  }

  generatePieceNumber() {
    let number = Math.floor(1 + Math.random() * Object.keys(pieces).length);
    return number;
  }

  generateBoard() {
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

  startBoard() {
    let b = this.generateBoard();
    let halfCols = Math.floor(this.boardCols / 2);

    // Gravando o ponto inicial (topo-esquerdo) da matriz do piece
    // Começa sempre na primeira linha da matriz do board
    this.x1 = halfCols - 1;
    this.y1 = 0;

    for (var i in this.piece.matrix) {
      for (var j in this.piece.matrix[i]) {
        i = parseInt(i);
        j = parseInt(j);
        b[i][j + halfCols - 1] = this.pieceNumber * this.piece.matrix[i][j];

        // Aqui eu seto o x2 e y2, que vai ser o ponto mais em baixo-direita da matriz
        // como esses for vão do topo-esquerda pro baixo-direita, se eu setar toda vez eu garanto
        // que to pegando o ponto mais em baixo na direita possivel
        this.x2 = j + halfCols - 1;
        // Menos 1 pq quero que seja o index do board
        this.y2 = i;
      }
    }
    return b;
  }

  applyGravity() {
    for (let i = this.boardRows - 1; i >= 0; i--) {
      for (let j = 0; j < this.boardCols; j++) {
        if (this.board[i][j] > 0) {
          if (i + 1 >= this.boardRows) {
            return;
          }
          this.board[i + 1][j] = this.board[i][j];
          this.board[i][j] = 0;
        }
      }
    }
    // Como a peça ta caindo 1 espaço toda vez que aplico gravidade, atualizo o y1 e y2 da posição da matriz da peça
    this.y1 += 1;
    this.y2 += 1;
  }

  touchFloor() {
    for (let j = 0; j < this.boardCols; j++) {
      if (this.board[this.boardRows - 1][j] > 0) {
        return true;
      }
    }
    return false;
  }

  cropPiece() {
    let croppedLines;
    let cropped = [];

    croppedLines = this.board.slice(this.y1, this.y2 + 1);

    for (let i in croppedLines) {
      cropped.push(croppedLines[i].slice(this.x1, this.x2 + 1));
    }
    return cropped;
  }

  moveLeft() {
    for (let j = 0; j < this.boardCols; j++) {
      for (let i = 0; i < this.boardRows; i++) {
        if (this.board[i][j] > 0) {
          if (j - 1 < 0) {
            return;
          }
          this.board[i][j - 1] = this.board[i][j];
          this.board[i][j] = 0;
        }
      }
    }
    this.x1 -= 1;
    this.x2 -= 1;
  }

  moveRight() {
    for (let j = this.boardCols - 1; j >= 0; j--) {
      for (let i = 0; i < this.boardRows; i++) {
        if (this.board[i][j] > 0) {
          if (j + 1 >= this.boardCols) {
            return;
          }
          this.board[i][j + 1] = this.board[i][j];
          this.board[i][j] = 0;
        }
      }
    }
    this.x1 += 1;
    this.x2 += 1;
  }

  rotatePiece(matrix) {
    let rotated = matrix[0].map((line, index) =>
      matrix.map((row) => row[index]).reverse()
    );
    return rotated;
  }

  // TODO: Isso precisa receber o board do board e ver se pode rotacionar
  applyRotation() {
    let croppedPiece = this.cropPiece();

    this.board = this.generateBoard();

    let rotated = this.rotatePiece(croppedPiece);

    let pieceSize = croppedPiece.length;
    for (let i = 0; i < pieceSize; i++) {
      for (let j = 0; j < pieceSize; j++) {
        this.board[i + this.y1][j + this.x1] = rotated[i][j];
      }
    }
  }
}

export default Piece;
