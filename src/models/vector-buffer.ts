import { Vector } from "./vector";

export class VectorBuffer {
  public vectors: Array<Vector> = [];
  constructor(public limit: number) {}

  addVector(v: Vector) {
    if (this.vectors.length > this.limit) {
      this.vectors.shift();
    }
    this.vectors.push(v);
  }

  get length() {
    return this.vectors.length;
  }

  get(index: number) {
    return this.vectors[index];
  }
}
