"use strict";

// Draw Game
// Draw Game
function drawGame() {
  // Draw Board
  drawContext(context, canvas);
  drawMatrix(board, { x: 0, y: 0 });
  drawMatrix(player.matrix, player.position);
  //Iteration 11 - Next block
  drawContext(contextNext, canvasNext);
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
  document.getElementById("highscore").innerText = highscore;
  document.getElementById("score").innerText = player.score;
  document.getElementById("lines").innerText = player.lines;
  document.getElementById("level").innerText = player.level;
}

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

// Draw Events Game
const scaleImage = (image) => {
  return Math.min(
    canvasDefault.width / image.width,
    canvasDefault.height / image.height
  );
};
// x y for Image Scaled
const xImage = (image, scale) => {
  return canvasDefault.width / 2 - (image.width / 2) * scale;
};
const yImage = (image, scale) => {
  return canvasDefault.height / 2 - (image.height / 2) * scale;
};

// Draw Events Start - Go - Game Over
const eventImage = (context, canvas, image, x, y, scale) => {
  context.clearRect(0, 0, canvas.width, canvas.height);
  context.drawImage(image, x, y, image.width * scale, image.height * scale);
};
// Iteration 13 - Win
// Iteration 14 - Game Over
const eventGameOver = () => {
  eventImage(
    contextDefault,
    canvasDefault,
    imageGameOver,
    xImage(imageGameOver, scaleImage(imageGameOver)),
    yImage(imageGameOver, scaleImage(imageGameOver)),
    scaleImage(imageGameOver)
  );
};
// Draw Press Start
const eventStart = () => {
  eventImage(
    contextDefault,
    canvasDefault,
    imageStart,
    xImage(imageStart, scaleImage(imageStart)),
    yImage(imageStart, scaleImage(imageStart)),
    scaleImage(imageStart)
  );
};
// Draw Image Game On
const eventGo = () => {
  eventImage(
    contextDefault,
    canvasDefault,
    imageGo,
    xImage(imageGo, scaleImage(imageGo)),
    yImage(imageGo, scaleImage(imageGo)),
    scaleImage(imageGo)
  );
};

const eventBack = () => {
  eventImage(
    context,
    canvas,
    imageBackground,
    xImage(imageBackground, scaleImage(imageBackground)),
    yImage(imageBackground, scaleImage(imageBackground)),
    scaleImage(imageBackground)
  );
};
