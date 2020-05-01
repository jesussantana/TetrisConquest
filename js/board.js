"use strict";
class Board {
  constructor() {
    this.context = context;
    this.contextNext = contextNext;
    //this.init();
  }

  drawGame() {
    // Draw Board
    this.context.fillStyle = "../images/space.jpg";
    this.context.fillRect(0, 0, canvas.width, canvas.height);

    drawMatrix(board, { x: 0, y: 0 });
    drawMatrix(player.matrix, player.position);
  }
}
