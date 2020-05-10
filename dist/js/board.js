"use strict";
//Iteration 1 - Create Board

// Create grid-matrix
function createMatrix(width, height) {
  const matrix = [];
  while (height--) {
    // Fill Matrix
    matrix.push(new Array(width).fill(0));
  }
  return matrix;
}
// Draw Context
function drawContext(context, canvas) {
  context.fillStyle = "#000";
  context.fillRect(0, 0, canvas.width, canvas.height);
}

// Iteration 2 - Create Block

// Draw Matrix Board & Block
function drawMatrix(matrix, offset) {
  // Iterate Matrix
  matrix.forEach((row, y) => {
    row.forEach((value, x) => {
      // Draw if has value
      if (value !== 0) {
        context.fillStyle = block.colors[value];
        context.fillRect(x + offset.x, y + offset.y, 1, 1);
        //context.roundRect(x + offset.x, y + offset.y, 0.5, 0.5, {upperLeft:0.01,upperRight:0.01}, true, true);
        //Next block
        contextNext.fillStyle = block.colors[value];
        contextNext.fillRect(x, y, 1, 1);
        //contextNext.roundRect(x, y, 0.5, 0.5, {upperLeft:0.1,upperRight:0.1}, true, true);
      }
    });
  });
}

// Round Squares
CanvasRenderingContext2D.prototype.roundRect = function (
  x,
  y,
  width,
  height,
  radius,
  fill,
  stroke
) {
  var cornerRadius = {
    upperLeft: 0,
    upperRight: 0,
    lowerLeft: 0,
    lowerRight: 0,
  };
  if (typeof stroke == "undefined") {
    stroke = true;
  }
  if (typeof radius === "object") {
    for (var side in radius) {
      cornerRadius[side] = radius[side];
    }
  }
  this.beginPath();
  this.moveTo(x + cornerRadius.upperLeft, y);
  this.lineTo(x + width - cornerRadius.upperRight, y);
  this.quadraticCurveTo(x + width, y, x + width, y + cornerRadius.upperRight);
  this.lineTo(x + width, y + height - cornerRadius.lowerRight);
  this.quadraticCurveTo(
    x + width,
    y + height,
    x + width - cornerRadius.lowerRight,
    y + height
  );
  this.lineTo(x + cornerRadius.lowerLeft, y + height);
  this.quadraticCurveTo(x, y + height, x, y + height - cornerRadius.lowerLeft);
  this.lineTo(x, y + cornerRadius.upperLeft);
  this.quadraticCurveTo(x, y, x + cornerRadius.upperLeft, y);
  this.closePath();
  if (stroke) {
    this.stroke();
  }
  if (fill) {
    this.fill();
  }
};

// Iteration 8 - Check Complete Rows
function boardSweep() {
  let rowCount = 1;
  // Iterate Board
  outer: for (let y = board.length - 1; y > 0; --y) {
    for (let x = 0; x < board[y].length; ++x) {
      // Check is Empty
      if (board[y][x] === 0) {
        continue outer;
      }
    }
    const row = board.splice(y, 1)[0].fill(0);
    // add row to board
    board.unshift(row);
    ++y;
    // Score
    // Add Complete lines to Player
    player.lines += rowCount;
    // Sound Line Complete
    audio2.play();
    // Check change level
    if (player.lines % 2 === 0) {
      // Add Level
      player.level++;
      // Increase speed
      dropInterval -= 50;
      // Change Score
      // Bonus
      player.score += rowCount * 100 * player.lines;
      break;
    } else {
      // Normal Score
      player.score += rowCount * 100;
    }
    rowCount *= 2;
  }
}
