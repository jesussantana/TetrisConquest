"use strict";
// Create Context
const canvas = document.getElementById("tetris");
const context = canvas.getContext("2d");

// Board 20X10
const rows = 20;
const columns = 10;

let x = 4;
let y = 0;
let speed = 1000;

//Iteration 1 - Create Board
function board() {
  context.fillStyle = "black";
  context.fillRect(0, 0, canvas.width, canvas.height);
  grid();
}

board();

// Create Board-Grid
function grid() {
  const grid = [];
  for (let i = 0; i < rows; i++) {
    grid[i] = [];
    for (let j = 0; j < columns; j++) {
      grid[i][j] = 0;
    }
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
  for (let i = 0; i < block.length; i++) {
    for (let j = 0; j < block.length; j++) {
      // Draw only full positions
      if (block[i][j] != 0) {
        //Delete previous position
        delBlock();
        //Draw next Block
        displayBlock();
      }
    }
  }
}

function displayBlock() {
  context.fillStyle = "yellow";
  context.fillRect(x, y, 1, 1);
}

function delBlock() {
  //Delete previous position
  context.fillStyle = "black";
  context.fillRect(x, y - 1, 1, 1);
}

//Iteration 3 - Move block

//Down Block
function blockDown() {
  // Check is Down
  if (y < rows) {
    drawBlock();
  }
  y++;
}

//Iteration 4 - Controls-1

//1. Left / Right
document.addEventListener("keydown", event => {
  switch (event.key) {
    case "ArrowRight":
      delBlock();
      x++;
      break;

    case "ArrowLeft":
      delBlock();
      x--;
      break;

// Down + speed increase
    case "ArrowDown":
      blockDown();
      break;
  }
});

function display() {
  setInterval(blockDown, speed);
}

display();
