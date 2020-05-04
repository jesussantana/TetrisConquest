class Board {
  constructor(width, height) {
    // Create grid-matrix
    const matrix = [];
    while (height--) {
      matrix.push(new Array(width).fill(0));
    }
    this.matrix = matrix;
  }
  // Join Player & BOard
  joinBoard(player) {
    player.matrix.forEach((row, y) => {
      row.forEach((value, x) => {
        if (value !== 0) {
          this.matrix[y + player.position.y][x + player.position.x] = value;
        }
      });
    });
  }

  /*collision(player) {
    const [matriz, offset] = [player.matrix, player.position];
    for (let y = 0; y < matriz.length; ++y) {
      for (let x = 0; x < matriz[y].length; ++x) {
        if (
          matriz[y][x] !== 0 &&
          (matriz[y + o.y] && matriz[y + offset.y][x + offset.x]) !== 0
        ) {
          return true;
        }
      }
    }
    return false;
  }*/
  // Iteration 8 - Control Complete rows
  sweepBoard() {
    let rowCount = 1;
    outer: for (let y = board.length - 1; y > 0; --y) {
      for (let x = 0; x < board[y].length; ++x) {
        if (board[y][x] === 0) {
          continue outer;
        }
      }
      const row = board.splice(y, 1)[0].fill(0);
      board.unshift(row);
      ++y;
      // Score
      player.score += rowCount * 10;
      player.lines += rowCount;
      cancelAnimationFrame(update);
      if (player.lines >= 1) {
        drawNextLevel();
      } else if ((player.lines = 1)) {
        dropInterval -= 200;
      }
      rowCount *= 2;
    }
  }

  // Iteration 8 - Control Complete rows



  clear() {
    this.matrix.forEach((row) => row.fill(0));
  }
}
