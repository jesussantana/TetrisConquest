"use strict";

const main = () => {
  playerReset();
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
  drawMatrix(boardNext, { x: 0, y: 0 })
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

//1. Left / Right
document.addEventListener("keydown", (event) => {
  switch (event.code) {
    case "ArrowRight":
      move(1);
      break;
    case "ArrowLeft":
      move(-1);
      break;
    // Down
    case "ArrowDown":
      drop();
      break;
    // Rotate Left
    case "KeyZ":
      playerRotate(-1);
      break;
    // Rotate Rightz
    case "KeyX":
      playerRotate(1);
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

// Rotate Player
function playerRotate(direction) {
  const position = player.position.x;
  let offset = 1;
  rotate(player.matrix, direction);
  while (collision(board, player)) {
    player.position.x += offset;
    offset = -(offset + (offset > 0 ? 1 : -1));
    if (offset > player.matrix[0].length) {
      rotate(player.matrix, -direction);
      player.position.x = position;
      return;
    }
  }
}

//Iteration 3 - Move block

//Down Block

function drop() {
  player.position.y++;
  if (collision(board, player)) {
    player.position.y--;
    joinBoard(board, player);

    playerReset();
    boardSweep();
    updateScore();
    update(+10);
  }
  dropCounter = 0;
}
//Left/Right Block
function move(offset) {
  // Check is Left and Right
  player.position.x += offset;
  if (collision(board, player)) {
    player.position.x -= offset;
  }
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
  if (collision(board, player)) {
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

// update Game
function update(time = 0) {
  const deltaTime = time - lastTime;
  dropCounter += deltaTime;
  if (dropCounter > dropInterval) {
    drop();
  }
  lastTime = time;
  drawGame();
  requestAnimationFrame(update);
}
// Board 20X15
const board = createMatrix(15, 20);
const boardNext= createMatrix(2, 2);
// Initialize Instances
const block = new Blocks();
const nextPlayer = new Player();
const player = new Player();

//window.addEventListener("load", main);
