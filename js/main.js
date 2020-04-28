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

let player = {
  position: { x: 4, y: 0 },
  matrix: null
};
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

//Create Block

const block = [
  [1, 1],
  [1, 1]
];

// Draw Block
function drawMatrix(matrix, offset) {
  matrix.forEach((row, y) => {
    row.forEach((value, x) => {
      if (value !== 0) {
        context.fillStyle = "yellow";
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

//Iteration 3 - Move block

//Down Block
function blockDrop() {
  player.position.y++;
  if (collision(board, player)) {
    player.position.y--;
    joinBoard(board, player);
  }
  dropCounter = 0;
}

//Iteration 4 - Controls-1

//1. Left / Right
document.addEventListener("keydown", event => {
  switch (event.key) {
    case "ArrowRight":
      blockMove(1);
      break;

    case "ArrowLeft":
      blockMove(-1);
      break;

    // Down
    case "ArrowDown":
      blockDrop();
      break;
  }
});

function blockMove(offset) {
  // Check is Left and Right
  player.position.x += offset;
  if (collision(board, player)) {
    player.position.x -= offset;
  }
}

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

let dropCounter = 0;
let dropInterval = 1000;

let lastTime = 0;

// update Game
function update(time = 0) {
  const deltaTime = time - lastTime;

  dropCounter += deltaTime;
  if (dropCounter > dropInterval) {
    blockDrop();
  }

  lastTime = time;

  drawGame();
  requestAnimationFrame(update);
}

player.matrix = block;
update();
