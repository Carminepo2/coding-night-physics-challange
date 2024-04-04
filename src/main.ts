import { PhysicsSimulation2D } from "./core/physics-simulation-2d";
import { Point } from "./models/entity";
import { Vector } from "./models/vector";

const simulation = new PhysicsSimulation2D({ canvasOptions: { fullscreen: true } });

simulation.start();

simulation.bounds = new Vector(window.innerWidth - 20, window.innerHeight - 20);
simulation.dragCoefficient = 0.01;
simulation.gravity = 0.01;

const entities = Array.from({ length: 50 }, () => {
  return new Point(
    new Vector(Math.random() * window.innerWidth, Math.random() * window.innerHeight),
    new Vector(Math.random() * 100, Math.random() * 100),
    10
  );
});

simulation.addEntity(...entities);
