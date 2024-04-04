export class Vector {
  x: number;
  y: number;
  constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
  }

  public sum(v: Vector) {
    return new Vector(this.x + v.x, this.y + v.y);
  }

  public mult(n: number) {
    return new Vector(this.x * n, this.y * n);
  }

  public scalar(v: Vector) {
    return this.x * v.x + this.y * v.y;
  }

  public length() {
    return Math.sqrt(this.x ** 2 + this.y ** 2);
  }

  static get ZERO() {
    return new Vector(0, 0);
  }
}
