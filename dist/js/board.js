class Board {
  constructor(width, height) {
    // Create grid-matrix
    const matrix = [];
    while (height--) {
      matrix.push(new Array(w).fill(0));
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

  collision(player) {
    const [m, o] = [player.matrix, player.position];
    for (let y = 0; y < m.length; ++y) {
      for (let x = 0; x < m[y].length; ++x) {
        if (
          m[y][x] !== 0 &&
          (this.matrix[y + o.y] && this.matrix[y + o.y][x + o.x]) !== 0
        ) {
          return true;
        }
      }
    }
    return false;
  }
  // Iteration 8 - Control Complete rows
  sweepBoard() {
    let rowCount = 1;
    let score = 0;
    outer: for (let y = this.matrix.length - 1; y > 0; --y) {
      for (let x = 0; x < this.matrix[y].length; ++x) {
        if (this.matrix[y][x] === 0) {
          continue outer;
        }
      }
      const row = this.matrix.splice(y, 1)[0].fill(0);
      this.matrix.unshift(row);
      ++y;
      // Score
      score += rowCount * 10;
      rowCount *= 2;
    }
    return score;
  }

  clear() {
    this.matrix.forEach((row) => row.fill(0));
  }
}
