import { FullscreenCanvas } from "../models/canvas";
import { Point } from "../models/entity";
import { PhysicsState2D } from "./physics-simulation-2d";

export class Renderer {
  private canvas = new FullscreenCanvas();

  public draw(state: PhysicsState2D) {
    this.canvas.clearCanvas();
    this.canvas.drawAxes();
    state.entities.forEach((entity) => {
      const point = new Point(entity.position, entity.velocity, entity.mass);
      point.draw(this.canvas);
    });
  }

  get canvasSize() {
    return {
      width: this.canvas.width,
      height: this.canvas.height,
    };
  }
}
