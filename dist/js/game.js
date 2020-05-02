"use strict";
class Game {
  constructor(game) {
    this.game = game;
    this.canvas = game.querySelector("canvas");
    this.context = this.canvas.getContext("2d");
    this.context.scale(20, 20);

    // Initialize Instances
    this.board = new Board(15, 20);
    this.boardNext = new Board();
    /*this.player = new Player(this);
    this.nextPlayer = new Player(this);*/

    // Update Game
    let lastTime = 0;
    const update = (time = 0) => {
      const deltaTime = time - lastTime;
      lastTime = time;
      this.player.update(deltaTime);
      this.drawGame();
      requestAnimationFrame(update);
    };
    update();
    this.updateScore(0);
  }
  // Draw Game
  drawGame() {
    // Draw Board
    this.context.fillStyle = "#000";
    this.context.fillRect(0, 0, canvas.width, canvas.height);
    this.drawMatrix(this.board.matrix, { x: 0, y: 0 });
    this.drawMatrix(this.player.matrix, this.player.position);
    //Iteration 11 - Next block
    this.contextNext.fillStyle = "#000";
    this.contextNext.fillRect(0, 0, canvas.width, canvas.height);
    this.drawMatrix(this.boardNext, { x: 0, y: 0 });
    this.drawMatrix(this.nextPlayer.matrix, 0);
  }

  drawMatrix(matrix, offset) {
    matrix.forEach((row, y) => {
      row.forEach((value, x) => {
        if (value !== 0) {
          this.context.fillStyle = this.colors[value];
          this.context.fillRect(x + offset.x, y + offset.y, 1, 1);
        }
      });
    });
  }
  //Iteration 9- Score
  updateScore(score) {
    this.element.querySelector(".score").innerText = score;
  }
}
