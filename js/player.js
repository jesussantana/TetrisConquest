// Player Start
class Player {
  constructor() {
    this.position = { x: 4, y: 0 };
    this.matrix = null;
  }
  // Rotate Player
  Rotate(direction) {
    const position = this.position.x;
    let offset = 1;
    rotate(this.matrix, direction);
    while (collision(board, player)) {
      this.position.x += offset;
      offset = -(offset + (offset > 0 ? 1 : -1));
      if (offset > this.matrix[0].length) {
        rotate(this.matrix, -direction);
        this.position.x = position;
        return;
      }
    }
  }
}
