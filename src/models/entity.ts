import { Canvas } from "./canvas";
import { Vector } from "./vector";

export class Entity {
  public id = crypto.randomUUID();

  constructor(public position: Vector, public velocity: Vector, public mass: number) {}

  public draw(_canvas: Canvas) {
    console.warn("draw method not implemented");
  }
}

export class Point extends Entity {
  public draw(canvas: Canvas) {
    canvas.drawCircle(this.position, 10);
  }
}
