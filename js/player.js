"use strict";

class Player {
  constructor() {
    this.position = { x: 6, y: 0 };
    this.matrix = null;
    (this.score = 0), (this.level = 0), (this.lines = 0);
  }
}
//Iteration 3 - Move block
/*
  //Down Block
  Drop() {
    this.position.y++;
    if (this.Collision(board, player)) {
      this.position.y--;
      joinBoard(board, player);
      blockReset();
      boardSweep();
    }
    dropCounter = 0;
  }

  Move(offset) {
    // Check is Left and Right
    player.position.x += offset;
    if (collision(board, player)) {
      player.position.x -= offset;
    }
  }

  // Check Collisions
  Collision(board, player) {
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
  Rotate(direction) {
    const position = player.position.x;
    let offset = 1;
    rotate(player.matrix, direction);
    while (collision(board, player)) {
      player.position.x += offset;
      offset = -(offset + (offset > 0 ? 1 : -1));
      if (offset > player.matrix[0].length) {
        rotate(player.matrix, -direction);
        player.position.x = position;
        return;
      }
    }
  }
}*/
