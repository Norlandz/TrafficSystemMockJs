class Point {
  x: number;
  y: number;

  constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
  }

  toString() {
    return `(${Math.round(this.x * 100) / 100}, ${Math.round(this.y * 100) / 100})`;
  }
}

export { Point };
