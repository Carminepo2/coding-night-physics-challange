import { Canvas, FullscreenCanvas } from "../models/canvas";
import { PhysicsState2D } from "./physics-simulation-2d";

type RendererOptions = { showAxis?: boolean } & ({ width: number; height: number } | { fullscreen: true });

export class Renderer {
  private _canvas: Canvas;

  constructor(private canvasOptions: RendererOptions) {
    if ("fullscreen" in canvasOptions) {
      this._canvas = new FullscreenCanvas();
    } else {
      this._canvas = new Canvas(canvasOptions.width, canvasOptions.height);
    }
  }

  public draw(state: PhysicsState2D) {
    this._canvas.clearCanvas();

    if (this.canvasOptions.showAxis) this._canvas.drawAxes();

    state.entities.forEach((entity) => {
      entity.draw(this._canvas);
    });
  }

  public get canvas() {
    return {
      width: this._canvas.width,
      height: this._canvas.height,
    };
  }
}
