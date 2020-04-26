// Create Context
const canvas = document.getElementById("tetris");
const context = canvas.getContext("2d");

// Board 20X10
const rows = 20;
const columns = 10;

const x = 0;
const y = 0;

//Iteration 1 - Create Board
context.fillStyle = "black";
context.fillRect(x, y, canvas.width, canvas.height);

// Create Board-Grid
const board = [];
for (i = 0; i < rows; i++) {
  board[i] = [];
  for (j = 0; j < columns; j++) {
    board[i][j] = 0;
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

for (i = 0; i < block.length; i++) {
  for (j = 0; j < block.length; j++) {
    // Draw only full positions
    if (block[i][j] != 0) {
      context.fillStyle = "yellow";
      context.fillRect(x, y, 1, 1);
    }
  }
}
