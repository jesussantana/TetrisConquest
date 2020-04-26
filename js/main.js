"use strict";
// Create Context
const canvas = document.getElementById("tetris");
const context = canvas.getContext("2d");

// Board 20X10
const rows = 20;
const columns = 10;

let x = 4;
let y = 0;

//Iteration 1 - Create Board
function board() {
  context.fillStyle = "black";
  context.fillRect(0, 0, canvas.width, canvas.height);
}

board();

// Create Board-Grid
const grid = [];
for (let i = 0; i < rows; i++) {
  grid[i] = [];
  for (let j = 0; j < columns; j++) {
    grid[i][j] = 0;
  }
}

// Iteration 2 - Create Block

// Scale Blocks
context.scale(20, 20);

//Create Block
const block = [
  [
    [0, 0, 0, 0],
    [0, 1, 1, 0],
    [0, 1, 1, 0],
    [0, 0, 0, 0]
  ]
];

// Draw Block
function drawBlock() {
  // Check is Down
  if (y <= rows) {
    for (let i = 0; i < block.length; i++) {
      for (let j = 0; j < block.length; j++) {
        // Draw only full positions
        if (block[i][j] != 0) {
          //Delete previous position
          context.fillStyle = "black";
          context.fillRect(x, y - 1, 1, 1);
          //Draw next Block
          context.fillStyle = "yellow";
          context.fillRect(x, y, 1, 1);
        }
      }
    }
  }
  y++;
}

//Iteration 3 - Block Move

//Down Block
function blockDown() {
  setInterval(drawBlock, 1000);
};

blockDown();
