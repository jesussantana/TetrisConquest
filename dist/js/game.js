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

// Join Player & Board
function joinBoard(board, player) {
  player.matrix.forEach((row, y) => {
    row.forEach((value, x) => {
      if (value !== 0) {
        board[y + player.position.y][x + player.position.x] = value;
      }
    });
  });
}

// Update Game - Run Game
let update = (time = 0) => {
  const deltaTime = time - lastTime;
  dropCounter += deltaTime;
  // Check counter and Interval for drop
  if (dropCounter > dropInterval) {
    player.drop();
  }
  lastTime = time;
  // Draw game
  drawGame();
  // Run animation
  requestAnimationFrame(update);
};

//Iteration 9- Score
function updateScore() {
  document.getElementById("score").innerText = player.score;
  document.getElementById("lines").innerText = player.lines;
  document.getElementById("level").innerText = player.level;
}

// Iteration 13 - Win --- Next Level
/*function drawNextLevel() {
  context.fillStyle = "../images/nave.jpg";
  context.fillRect(0, 0, canvas.width, canvas.height);
  cancelAnimationFrame(update);
  player.gameOver();
}*/

// Iteration 14 Music ON/OFF
function generateMusic() {
  buttonMusic();
  return audioA.paused ? audioA.play() : audioA.pause();
}
// Iteration 17 Buttons
// Change Value Button Music
function buttonMusic() {
  let music = document.getElementById("music");
  music.value == "MUSIC OFF"
    ? (music.value = "MUSIC ON")
    : (music.value = "MUSIC OFF");
  document.getElementById("music").innerText = music.value;
}
// Change Value Button Start
function buttonStart() {
  let reset = document.getElementById("start");
  reset.value == "RESET" ? (reset.value = "START") : (reset.value = "RESET");
  document.getElementById("start").innerText = reset.value;
}

// Draw Events Start - Go - Game Over
const eventImage = (image, x, y, scale) => {
  contextDefault.clearRect(0, 0, canvasDefault.width, canvasDefault.height);
  contextDefault.drawImage(
    image,
    x,
    y,
    image.width * scale,
    image.height * scale
  );
};
// Iteration 13 - Win
// Iteration 14 - Game Over
const eventGameOver = () =>{
  //eventImage(imageGameOver, xImage(imageGameOver),yImage(imageGameOver), scaleImage(imageGameOver));
  contextDefault.clearRect(0, 0, canvasDefault.width, canvasDefault.height);
    contextDefault.drawImage(
      imageGameOver,
      xImageGameOver,
      yImageGameOver,
      imageGameOver.width * scaleImageGameOver,
      imageGameOver.height * scaleImageGameOver
    );
}
// Draw Press Start
const eventStart = () => {
  //eventImage(imageStart, xImage(imageStart),yImage(imageStart), scaleImage(imageStart));
  contextDefault.clearRect(0, 0, canvasDefault.width, canvasDefault.height);
  contextDefault.drawImage(
    imageStart,
    xImageStart,
    yImageStart,
    imageStart.width * scaleImageStart,
    imageStart.height * scaleImageStart
  );
};
// Draw Image Game On
const eventGo = () => {
  //eventImage(imageGo, xImage(imageGo),yImage(imageGo), scaleImage(imageGo));
  contextDefault.clearRect(0, 0, canvasDefault.width, canvasDefault.height);
  contextDefault.drawImage(
    imageGo,
    xImageGo,
    yImageGo,
    imageGo.width * scaleImageGo,
    imageGo.height * scaleImageGo
  );
};
