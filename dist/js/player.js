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
    this.imageGameOver = new Image();
    this.imageGameOver.src =
      "https://portal.33bits.net/wp-content/uploads/2018/12/gameoverphrase.jpg";
  }

  //Iteration 3 - Move block

  //Down Block
  drop() {
    this.position.y++;
    if (this.collision(board, player)) {
      this.position.y--;

      player.gameOver;

      joinBoard(board, player);
      player.reset();
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
    block.rotate(this.matrix, direction);
    while (this.collision(board, player)) {
      this.position.x += offset;
      offset = -(offset + (offset > 0 ? 1 : -1));
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
    if (nextPlayer.matrix === null) {
      player.matrix = block.create(
        block.type[(block.type.length * Math.random()) | 0]
      );
    } else {
      player.matrix = nextPlayer.matrix;
    }
    //Next block
    nextPlayer.matrix = block.create(
      block.type[(block.type.length * Math.random()) | 0]
    );
    player.position.y = 0;
    player.position.x =
      ((board[0].length / 2) | 0) - ((player.matrix[0].length / 2) | 0);
    if (player.collision(board, player)) {
      console.log("reset");
      board.forEach((row) => row.fill(0));
      // Score
      //player.score = 0;
      //player.lines = 0;

      //updateScore();
      for (let i = 0; i < 20; i++) {
        cancelAnimationFrame(update);
      }
      this.gameOver();
    }
  }
  gameOver() {
    audio.pause();
    //audio1.play();
    contextDefault.clearRect(0, 0, canvasDefault.width, canvasDefault.height);
    contextDefault.drawImage(
      imageGameOver,
      xImage,
      yImage,
      imageGameOver.width * scaleImage,
      imageGameOver.height * scaleImage
    );
    cancelAnimationFrame(update);
    dropInterval += 100000;
    
    //contextDefault.drawImage(this.imageGameOver, 0, 0, canvas.width, canvas.height);
  }
}
