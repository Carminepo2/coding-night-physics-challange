import { debounce } from "../lib/utils";
import { Vector } from "./vector";
import { VectorBuffer } from "./vector-buffer";

export class Canvas {
  protected canvas: HTMLCanvasElement;
  protected ctx: CanvasRenderingContext2D;

  public mousePosition: Vector = new Vector(0, 0);

  constructor(height: number, width: number) {
    this.canvas = document.createElement("canvas");
    this.canvas.height = height;
    this.canvas.width = width;
    document.body.appendChild(this.canvas);
    const ctx = this.canvas.getContext("2d")!;
    if (!ctx) throw new Error("2D context not found");
    this.ctx = ctx;

    this.canvas.addEventListener("mousemove", (event) => {
      const rect = this.canvas.getBoundingClientRect();
      const scaleX = this.canvas.width / rect.width;
      const scaleY = this.canvas.height / rect.height;
      return new Vector((event.clientX - rect.left) * scaleX, (event.clientY - rect.top) * scaleY);
    });
  }

  // Getters

  public get width() {
    return this.canvas.width;
  }

  public get height() {
    return this.canvas.height;
  }

  public get center() {
    return new Vector(this.canvas.width / 2, this.canvas.height / 2);
  }

  // Drawing methods

  public clearCanvas() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
  }

  public drawLine(start: Vector, end: Vector, color: string = "black") {
    this.ctx.beginPath();
    this.ctx.moveTo(start.x, start.y);
    this.ctx.lineTo(end.x, end.y);
    this.ctx.strokeStyle = color;
    this.ctx.stroke();
  }

  public drawCircle(position: Vector, radius: number, color: string = "black") {
    this.ctx.fillStyle = color;
    this.ctx.beginPath();
    this.ctx.arc(position.x, position.y, radius, 0, Math.PI * 2);
    this.ctx.closePath();
    this.ctx.fill();
  }

  public drawAxes() {
    this.drawLine(new Vector(0, this.canvas.height / 2), new Vector(this.canvas.width, this.canvas.height / 2));
    this.drawLine(new Vector(this.canvas.width / 2, 0), new Vector(this.canvas.width / 2, this.canvas.height));
  }

  public drawTrajectory(buffer: VectorBuffer, color: string = "black") {
    if (buffer.length <= 1) return;
    for (let i = 0; i < buffer.length - 1; i++) {
      const startVector = buffer.get(i);
      const endVector = buffer.get(i + 1);
      this.ctx.globalAlpha = (1 - (buffer.length - i) / buffer.length) ** 2;
      this.drawLine(startVector, endVector, color);
    }
  }
}

export class FullscreenCanvas extends Canvas {
  constructor() {
    super(window.innerHeight, window.innerWidth);
    window.addEventListener(
      "resize",
      debounce(() => {
        this.canvas.height = window.innerHeight;
        this.canvas.width = window.innerWidth;
      }, 500)
    );
  }
}
