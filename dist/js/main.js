"use strict";

function init() {
  buttonStart();
  eventGo();
  main();
}

const main = () => {
  if (start === 1) {
    location.reload();
  }
  player.reset();
  //audio1.pause();
  generateMusic();
  update();
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

document.addEventListener("keydown", eventList);

// Board 20X15
let board = createMatrix(15, 20);
const boardNext = createMatrix(2, 2);
// Initialize Instances
const block = new Blocks();
const nextPlayer = new Player();
const player = new Player();

const eventStart = () => {
  contextDefault.clearRect(0, 0, canvasDefault.width, canvasDefault.height);
  contextDefault.drawImage(
    imageStart,
    xImageStart,
    yImageStart,
    imageStart.width * scaleImageStart,
    imageStart.height * scaleImageStart
  );
};

const eventGo = () => {
  contextDefault.clearRect(0, 0, canvasDefault.width, canvasDefault.height);
  contextDefault.drawImage(
    imageGo,
    xImageGo,
    yImageGo,
    imageGo.width * scaleImageGo,
    imageGo.height * scaleImageGo
  );
};

eventStart();
//window.addEventListener("load", eventStart);
