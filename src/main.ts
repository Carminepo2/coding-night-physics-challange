import { PhysicsSimulation2D } from "./core/physics-simulation-2d";
import { Point } from "./models/entity";
import { Vector } from "./models/vector";

new PhysicsSimulation2D([new Point(Vector.ZERO, new Vector(5, 0), 1)], 1).start();
