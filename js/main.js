"use strict";
// Create Context
const canvas = document.getElementById("tetris");
const context = canvas.getContext("2d");

// Board 20X10
const board = createMatrix(12, 20);

//Iteration 1 - Create Board
// Draw Board
function drawGame() {
  context.fillStyle = "black";
  context.fillRect(0, 0, canvas.width, canvas.height);
}

// Create grid-matrix
function createMatrix(width, height) {
  const matrix = [];
  while (height--) {
    matrix.push(new Array(width).fill(0));
  }
  return matrix;
}

// Iteration 2 - Create Block

// Scale Blocks
context.scale(20, 20);

// Draw Block
function drawMatrix(matrix, offset) {
  matrix.forEach((row, y) => {
    row.forEach((value, x) => {
      if (value !== 0) {
        context.fillStyle = block.colors[value];
        context.fillRect(x + offset.x, y + offset.y, 1, 1);
      }
    });
  });
}

function drawGame() {
  context.fillStyle = "#000";
  context.fillRect(0, 0, canvas.width, canvas.height);

  drawMatrix(board, { x: 0, y: 0 });
  drawMatrix(player.matrix, player.position);
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

//1. Left / Right
document.addEventListener("keydown", event => {
  switch (event.code) {
    case "ArrowRight":
      block.Move(1);
      break;

    case "ArrowLeft":
      block.Move(-1);
      break;

    // Down
    case "ArrowDown":
      block.Drop();
      break;
    // Rotate Left
    case "KeyZ":
      player.Rotate(-1);
      break;
    // Rotate Rightz
    case "KeyX":
      player.Rotate(1);
      break;
  }
});

// check Collisions
function collision(board, player) {
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
// Iteration 6 - Controls-2 Rotate
//1. Rotate Blocks

// Rotate Matrix
function rotate(matrix, direction) {
  // We go through the matrix
  for (let y = 0; y < matrix.length; y++) {
    for (let x = 0; x < y; ++x) {
      // For each position
      [matrix[x][y], matrix[y][x]] =
        // Invert the positions to rotate
        [matrix[y][x], matrix[x][y]];
    }
  }
  // According to one direction or another we do a reverse
  direction > 0 ? matrix.forEach(row => row.reverse()) : matrix.reverse();
}

let dropCounter = 0;
let dropInterval = 1000;
let lastTime = 0;

// update Game

function update(time = 0) {
  const deltaTime = time - lastTime;

  dropCounter += deltaTime;
  if (dropCounter > dropInterval) {
    block.Drop();
  }

  lastTime = time;

  drawGame();
  requestAnimationFrame(update);
}

//Iteration 5.2. Display Random Blocks

const block = new Blocks();
const player = new Player();
player.matrix = block.create(
  block.type[(block.type.length * Math.random()) | 0]
);

update();
