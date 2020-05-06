"use strict";

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

// Iteration 14 Music ON/OFF
function generateMusic() {
  buttonMusic();
  return audio.paused ? audio.play() : audio.pause();
  //audio1.paused ? audio1.play() : audio1.pause();
}
// Iteration 17 Buttons
function buttonMusic() {
  let music = document.getElementById("music");
  if (music.value == "MUSIC OFF") music.value = "MUSIC ON";
  else music.value = "MUSIC OFF";
  document.getElementById("music").innerText = music.value;
}
function buttonStart() {
  let reset = document.getElementById("start");
  if (reset.value == "RESET") reset.value = "START";
  else reset.value = "RESET";
  document.getElementById("start").innerText = reset.value;
}
