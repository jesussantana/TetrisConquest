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