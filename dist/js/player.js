"use strict";

class Player {
  constructor() {
    this.position = { x: 0, y: 0 };
    this.matrix = null;
    this.score = 0;
    this.lines = 0;
    this.level = 0;
  }

  //Iteration 3 - Move block

  //Down Block
  drop() {
    // Drow Player
    this.position.y++;
    // Check collisions
    if (this.collision(board, this)) {
      // Return to initial position
      this.position.y--;
      // Goto Game over
      this.gameOver;
      cancelAnimationFrame(update);
      joinBoard(board, this);
      // Player Reset
      this.reset();
      // Check Board
      boardSweep();
      // Update Scores
      if (this.score > highscore) {
        highscore = this.score;
        localStorage.setItem("highscore", highscore);
      }
      updateScore();
      // Go tu Update Game
      update();
    }
    // Reset counter
    dropCounter = 0;
  }

  //Left/Right Block
  move(offset) {
    this.position.x += offset;
    if (this.collision(board, this)) {
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
        // Check matrix and Next position on Board
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
    // Rotate Block
    block.rotate(this.matrix, direction);
    // Check Collisions
    while (this.collision(board, this)) {
      this.position.x += offset;
      offset = -(offset + (offset > 0 ? 1 : -1));
      // Return to initial position
      if (offset > this.matrix[0].length) {
        block.rotate(this.matrix, -direction);
        this.position.x = position;
        return;
      }
    }
  }
  // Iteration 7

  // Player Reset
  reset() {
    // Check for Create block only the first Time
    nextPlayer.matrix === null
      ? (player.matrix = block.create(
          block.type[(block.type.length * Math.random()) | 0]
        ))
      : // Assign value Next Block to actual Block
        (player.matrix = nextPlayer.matrix);
    // +1 Point for Block
    player.score += 10;
    updateScore();
    audio3.play();
    // Create Next block
    nextPlayer.matrix = block.create(
      block.type[(block.type.length * Math.random()) | 0]
    );
    // Assign Position to player
    player.position.y = 0;
    player.position.x =
      ((board[0].length / 2) | 0) - ((player.matrix[0].length / 2) | 0);
    // Check Collisions
    if (player.collision(board, this)) {
      board.forEach((row) => row.fill(0));
      // If collision up Game over
      cancelAnimationFrame(update);
      this.gameOver();
    }
  }

  // GameOver
  gameOver() {
    // Music OFF
    generateMusic();
    // Sound Game Over
    audio1.play();
    // Draw Game Over
    eventGameOver();
    // Cancel animation
    cancelAnimationFrame(update);
    // EventListener key OFF
    document.removeEventListener("keydown", eventList);
    dropInterval += 10000000;
  }
}
