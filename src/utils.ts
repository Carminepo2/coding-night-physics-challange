export function getCanvasById(canvasId: string) {
  const canvas = document.getElementById("myCanvas") as HTMLCanvasElement;
  if (!canvas) throw new Error("Canvas not found");
  const ctx = canvas.getContext("2d");
  if (!ctx) throw new Error("2D context not found");
  return { ctx, canvas };
}

export const motions = {
  linearMotion: (time: number, initPos: Vector, velocity: Vector) => {
    return new Vector(initPos.x + velocity.x * time, initPos.y + velocity.y * time);
  },
  circularMotion: (time: number, initPos: Vector, radius: number, angularVelocity: number, phase: number = 0) => {
    return new Vector(
      initPos.x + radius * Math.cos(((angularVelocity * 2 * Math.PI) / 1000) * time - (phase / 180) * Math.PI),
      initPos.y + radius * Math.sin(((angularVelocity * 2 * Math.PI) / 1000) * time - (phase / 180) * Math.PI)
    );
  },
};

export class Vector {
  x: number;
  y: number;
  constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
  }

  public sum(v: Vector) {
    this.x += v.x;
    this.y += v.y;
    return this;
  }

  static get ZERO() {
    return new Vector(0, 0);
  }
}
