"use strict";

class Player {
  constructor() {
    this.position = { x: 6, y: 0 };
    this.matrix = null;
    this.score = 0;
    this.lines = 0;
    this.level = 0;
    this.dropFast = 1000;
    this.dropSlow = 50;
  }

  //Iteration 3 - Move block

  //Down Block
  drop() {
    this.position.y++;
    if (this.collision(board, player)) {
      this.position.y--;
      joinBoard(board, player);
      playerReset();
      boardSweep();
      updateScore();
      update();
    }
    dropCounter = 0;
  }
  //Left/Right Block
  move(offset) {
    // Check is Left and Right
    this.position.x += offset;
    if (this.collision(board, player)) {
      this.position.x -= offset;
    }
  }
  // Check Collisions
  collision(board, player) {
    const matriz = player.matrix;
    const offset = player.position;
    //iterate Block
    for (let y = 0; y < matriz.length; ++y) {
      for (let x = 0; x < matriz[y].length; ++x) {
        // Check position
        if (
          matriz[y][x] !== 0 &&
          (board[y + offset.y] && board[y + offset.y][x + offset.x]) !== 0
        ) {
          return true;
        }
      }
    }
    return false;
  }
  // Rotate Block in Board
  rotate(direction) {
    const position = this.position.x;
    let offset = 1;
    rotate(this.matrix, direction);
    while (this.collision(board, player)) {
      this.position.x += offset;
      offset = -(offset + (offset > 0 ? 1 : -1));
      if (offset > this.matrix[0].length) {
        rotate(this.matrix, -direction);
        this.position.x = position;
        return;
      }
    }
  }
}
