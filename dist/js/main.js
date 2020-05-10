"use strict";
// Press Button Start
const init = () => {
  // Change Info button Start
  buttonStart();
  // Draw image Game
  eventGo();
  // Run Game
  main();
};

// Run Game
const main = () => {
  // if button Reset Reload
  if (start === 1) {
    location.reload();
  }
  // Reset Info Player
  player.reset();
  // Music On
  generateMusic();
  // Execute game
  update();
  // Modify value for button Reset
  start = 1;
};

//Iteration 4 - Controls-1

//1. Left / Right / Down / Rotate
const eventList = () => {
  switch (event.code) {
    case "ArrowRight":
      player.move(1);
      break;
    case "ArrowLeft":
      player.move(-1);
      break;
    // Down
    case "ArrowDown":
      player.drop();
      break;
    // Rotate Left
    case "KeyZ":
      player.rotate(-1);
      break;
    // Rotate Right
    case "KeyX":
      player.rotate(1);
      break;
  }
};

// Board 20X17
const board = createMatrix(17, 20);
const boardNext = createMatrix(2, 2);
// Initialize Instances
const block = new Blocks();
const nextPlayer = new Player();
const player = new Player();
//eventStart();
updateScore();
// Draw Press Start

window.addEventListener("load", eventStart);
document.addEventListener("keydown", eventList);
