"use strict";

function init() {
  //main() : drawNextLevel();
  main();
}

const main = () => {
  //if (start = 0) {

  player.reset();
  //audio1.pause();
  audio.play();
  update();
  // start++;
  //} else {
  //newGame();
  //start--;
  //}
};

const newGame = () => {
  location.reload();
  init();
};

//Iteration 1 - Create Board

// Create grid-matrix
function createMatrix(width, height) {
  const matrix = [];
  while (height--) {
    matrix.push(new Array(width).fill(0));
  }
  return matrix;
}

// Iteration 2 - Create Block

// Draw Block
function drawMatrix(matrix, offset) {
  matrix.forEach((row, y) => {
    row.forEach((value, x) => {
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

// Redondear rectangulos
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

// Draw Game
function drawGame() {
  // Draw Board
  context.fillStyle = "#000";
  context.fillRect(0, 0, canvas.width, canvas.height);
  drawMatrix(board, { x: 0, y: 0 });
  drawMatrix(player.matrix, player.position);
  //Iteration 11 - Next block
  contextNext.fillStyle = "#000";
  contextNext.fillRect(0, 0, canvas.width, canvas.height);
  drawMatrix(boardNext, { x: 0, y: 0 });
  drawMatrix(nextPlayer.matrix, 0);
}

// Join Player & BOard
function joinBoard(board, player) {
  player.matrix.forEach((row, y) => {
    row.forEach((value, x) => {
      if (value !== 0) {
        board[y + player.position.y][x + player.position.x] = value;
      }
    });
  });
}
//Iteration 4 - Controls-1

//1. Left / Right / Down / Rotate
document.addEventListener("keydown", (event) => {
  switch (event.code) {
    case "ArrowRight":
      player.move(1);
      break;
    case "ArrowLeft":
      player.move(-1);
      break;
    // Down
    case "ArrowDown":
      player.drop();
      break;
    // Rotate Left
    case "KeyZ":
      player.rotate(-1);
      break;
    // Rotate Right
    case "KeyX":
      player.rotate(1);
      break;
  }
});

// Iteration 8 - Control Complete rows
function boardSweep() {
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

    player.lines += rowCount;
    audio2.play();

    if (player.lines % 2 === 0) {
      player.level++;
      dropInterval -= 100;
      player.score += rowCount * 10 * player.lines;
      break;
    } else {
      player.score += rowCount * 10;
    }
    rowCount *= 2;
  }
}
//Iteration 9- Score
function updateScore() {
  document.getElementById("score").innerText = player.score;
  document.getElementById("lines").innerText = player.lines;
  document.getElementById("level").innerText = player.level;
}

// Iteration 13 - Win --- Next Level
function drawNextLevel() {
  //
  //dropInterval += 1000000;

  context.fillStyle = "../images/nave.jpg";
  context.fillRect(0, 0, canvas.width, canvas.height);
  for (let i = 0; i < 20; i++) {
    cancelAnimationFrame(update);
  }
  //dropInterval += 100000;

  player.gameOver();
  //player.level++;
}

// Iteration 14 - Game Over
function drawGameOver() {
  console.log("drawGameOver");

  //cancelAnimationFrame(update);
  //dropInterval += 1000000;
  context.fillStyle = "../images/gameOver.jpg";
  context.fillRect(0, 0, canvas.width, canvas.height);
  for (let i = 0; i < 20; i++) {
    cancelAnimationFrame(update);
  }

  dropInterval += 1000000;

  //dropInterval += 100000;
}

// Update Game
let update = (time = 0) => {
  const deltaTime = time - lastTime;
  dropCounter += deltaTime;
  if (dropCounter > dropInterval) {
    player.drop();
  }
  lastTime = time;
  drawGame();
  requestAnimationFrame(update);
};

// Iteration 14 Music ON/OFF
function generateMusic() {
  return audio.paused ? audio.play() : audio.pause();
  //audio1.paused ? audio1.play() : audio1.pause();
}

// Board 20X15
let board = createMatrix(15, 20);
const boardNext = createMatrix(2, 2);
// Initialize Instances
const block = new Blocks();
const nextPlayer = new Player();
const player = new Player();

//window.addEventListener("load", init);
