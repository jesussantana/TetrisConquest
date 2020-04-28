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

/*const block = [
  [1, 1],
  [1, 1]
];*/

// Iteration 5 - Create Blocks

//1. Create Blocks

function createBlocks(type) {
  switch (type) {
    case "I":
      return [
        [0, 1, 0, 0],
        [0, 1, 0, 0],
        [0, 1, 0, 0],
        [0, 1, 0, 0]
      ];
      break;
    case "J":
      return [
        [0, 2, 0],
        [0, 2, 0],
        [2, 2, 0]
      ];
      break;
    case "L":
      return [
        [0, 3, 0],
        [0, 3, 0],
        [0, 3, 3]
      ];
      break;
    case "O":
      return [
        [4, 4],
        [4, 4]
      ];
      break;
    case "S":
      return [
        [0, 5, 5],
        [5, 5, 0],
        [0, 0, 0]
      ];
      break;
    case "T":
      return [
        [0, 6, 0],
        [6, 6, 6],
        [0, 0, 0]
      ];
      break;
    case "Z":
      return [
        [7, 7, 0],
        [0, 7, 7],
        [0, 0, 0]
      ];
      break;
  }
}

//const block = 'IJLOSTZ'
// Blocks Colors
const colors = [
  null,
  "cyan",
  "blue",
  "orange",
  "yellow",
  "green",
  "purple",
  "red"
];

// Draw Block
function drawMatrix(matrix, offset) {
  matrix.forEach((row, y) => {
    row.forEach((value, x) => {
      if (value !== 0) {
        context.fillStyle = colors[value];
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
  switch (event.code) {
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

// Iteration 6 - Controls-2 Rotate
//1. Rotate Blocks

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

//player.matrix = createBlocks("O");
//Iteration 5.2. Display Random Blocks
const block = "IJLSOTZ";
player.matrix = createBlocks(block[(block.length * Math.random()) | 0]);


update();
