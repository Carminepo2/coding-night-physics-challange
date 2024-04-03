import { PhysicsSimulation2D } from "./core/physics-simulation-2d";
import { Point } from "./models/entity";
import { Vector } from "./models/vector";

const points = Array.from({ length: 1000 }, () => {
  return new Point(
    new Vector(Math.random() * 1000, Math.random() * 1000),
    new Vector(Math.random() - 0.5, Math.random() - 0.5),
    0.1
  );
});

new PhysicsSimulation2D({ entities: points, gravity: 0.001, dragCoefficient: 0.00001 }).start();
