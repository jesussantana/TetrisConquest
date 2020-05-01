"use strict";

const main = () => {
  playerReset();
  audio.play();
  update();
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
        //Next block
        contextNext.fillStyle = block.colors[value];
        contextNext.fillRect(x, y, 1, 1);
      }
    });
  });
}
// Draw Game
function drawGame() {
  // Draw Board
  context.fillStyle = "black";
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
      player.Move(1);
      break;
    case "ArrowLeft":
      player.Move(-1);
      break;
    // Down
    case "ArrowDown":
      player.Drop();
      break;
    // Rotate Left
    case "KeyZ":
      player.Rotate(-1);
      break;
    // Rotate Rightz
    case "KeyX":
      playerRotate(1);
      break;
  }
});

// Iteration 6 - Controls-2 Rotate
//1. Rotate Blocksl

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
  direction > 0 ? matrix.forEach((row) => row.reverse()) : matrix.reverse();
}

// Iteration 7

// Player Reset
function playerReset() {
  if (nextPlayer.matrix === null) {
    player.matrix = block.create(
      block.type[(block.type.length * Math.random()) | 0]
    );
  } else {
    player.matrix = nextPlayer.matrix;
  }
  //Next block
  nextPlayer.matrix = block.create(
    block.type[(block.type.length * Math.random()) | 0]
  );
  player.position.y = 0;
  player.position.x =
    ((board[0].length / 2) | 0) - ((player.matrix[0].length / 2) | 0);
  if (player.Collision(board, player)) {
    board.forEach((row) => row.fill(0));
    // Score
    player.score = 0;
    player.lines = 0;
    updateScore();
  }
}

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
    player.score += rowCount * 10;
    player.lines += rowCount;
    rowCount *= 2;
  }
}
//Iteration 9- Score
function updateScore() {
  document.getElementById("score").innerText = player.score;
  document.getElementById("lines").innerText = player.lines;
}

// Update Game
function update(time = 0) {
  const deltaTime = time - lastTime;
  dropCounter += deltaTime;
  if (dropCounter > dropInterval) {
    player.Drop();
  }
  lastTime = time;
  drawGame();
  requestAnimationFrame(update);
}
// Board 20X15
const board = createMatrix(15, 20);
const boardNext = createMatrix(2, 2);
// Initialize Instances
const block = new Blocks();
const nextPlayer = new Player();
const player = new Player();

//window.addEventListener("load", init);
