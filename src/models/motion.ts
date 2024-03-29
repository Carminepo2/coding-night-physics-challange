import { Vector } from "./vector";

export class Motion {
  static linearMotion(time: number, initPos: Vector, velocity: Vector) {
    return new Vector(initPos.x + velocity.x * time, initPos.y + velocity.y * time);
  }

  static circularMotion(time: number, initPos: Vector, radius: number, angularVelocity: number, phase: number = 0) {
    return new Vector(
      initPos.x + radius * Math.cos(((angularVelocity * 2 * Math.PI) / 1000) * time - (phase / 180) * Math.PI),
      initPos.y + radius * Math.sin(((angularVelocity * 2 * Math.PI) / 1000) * time - (phase / 180) * Math.PI)
    );
  }
}
