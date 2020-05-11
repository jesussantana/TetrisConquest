"use strict";

class Blocks {
  constructor() {
    this.type = "IJLSOTUZX";
    this.colors = [
      null,
      "#33FFEE",
      "#33A9FF",
      "#FFBF00",
      "#FFFE33",
      "#62FF33",
      "#5E33FF",
      "#FF7F50",
      "#D533FF",
      "#FF334A",
    ];
  }
  // Iteration 5 - Create Blocks
  //1. Create Blocks
  create(type) {
    switch (type) {
      case "I":
        return [
          [0, 1, 0, 0],
          [0, 1, 0, 0],
          [0, 1, 0, 0],
          [0, 1, 0, 0],
        ];
        break;
      case "J":
        return [
          [0, 2, 0],
          [0, 2, 0],
          [2, 2, 0],
        ];
        break;
      case "L":
        return [
          [0, 3, 0],
          [0, 3, 0],
          [0, 3, 3],
        ];
        break;
      case "O":
        return [
          [4, 4],
          [4, 4],
        ];
        break;
      case "S":
        return [
          [0, 5, 5],
          [5, 5, 0],
          [0, 0, 0],
        ];
        break;
      case "T":
        return [
          [0, 6, 0],
          [6, 6, 6],
          [0, 0, 0],
        ];
        break;
      case "U":
        return [
          [7, 0, 7],
          [7, 7, 7],
          [0, 0, 0],
        ];
        break;
      case "X":
        return [
          [0, 8, 0],
          [8, 8, 8],
          [0, 8, 0],
        ];
        break;
      case "Z":
        return [
          [9, 9, 0],
          [0, 9, 9],
          [0, 0, 0],
        ];
        break;
    }
  }
  // Iteration 6 - Controls-2 Rotate
  //1. Rotate Blocksl

  // Rotate Matrix
  rotate(matrix, direction) {
    // We go through the matrix
    for (let y = 0; y < matrix.length; y++) {
      for (let x = 0; x < y; ++x) {
        // For each two positions
        [matrix[x][y], matrix[y][x]] =
          // Invert the positions to rotate
          [matrix[y][x], matrix[x][y]];
      }
    }
    // According to one direction or another we do a reverse
    direction > 0 ? matrix.forEach((row) => row.reverse()) : matrix.reverse();
  }
}
