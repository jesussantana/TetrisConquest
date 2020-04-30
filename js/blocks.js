"use strict";

class Blocks {
  constructor() {
    //this.position = { x: 4, y: 0 };
    //this.matrix = null;

    this.type = "IJLSOTZ";
    this.colors = [
      null,
      "cyan",
      "blue",
      "orange",
      "yellow",
      "green",
      "purple",
      "red"
    ];
    this.I = [
      [0, 1, 0, 0],
      [0, 1, 0, 0],
      [0, 1, 0, 0],
      [0, 1, 0, 0]
    ];
    this.J = [
      [0, 2, 0],
      [0, 2, 0],
      [2, 2, 0]
    ];
    this.L = [
      [0, 3, 0],
      [0, 3, 0],
      [0, 3, 3]
    ];
    this.O = [
      [4, 4],
      [4, 4]
    ];
    this.S = [
      [0, 5, 5],
      [5, 5, 0],
      [0, 0, 0]
    ];
    this.T = [
      [0, 6, 0],
      [6, 6, 6],
      [0, 0, 0]
    ];
    this.Z = [
      [7, 7, 0],
      [0, 7, 7],
      [0, 0, 0]
    ];
  }

  // Iteration 5 - Create Blocks
  //1. Create Blocks
  create(type) {
    switch (type) {
      case "I":
        return this.I;
        break;
      case "J":
        return this.J;
        break;
      case "L":
        return this.L;
        break;
      case "O":
        return this.O;
        break;
      case "S":
        return this.S;
        break;
      case "T":
        return this.T;
        break;
      case "Z":
        return this.Z;
        break;
    }
  }
}
