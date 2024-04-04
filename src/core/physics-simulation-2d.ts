import { Entity } from "../models/entity";
import { Vector } from "../models/vector";
import { Processor } from "./processor";
import { Renderer } from "./renderer";

export type PhysicsState2D = {
  entities: Entity[];
  gravity: number;
  dragCoefficient: number;
  bounds?: { x: number; y: number };
  time?: number;
};

type PhysicsSimulation2DOptions = {
  canvasOptions: { showAxis?: boolean } & ({ width: number; height: number } | { fullscreen: true });
};

export class PhysicsSimulation2D {
  private state: PhysicsState2D;

  constructor(private options: PhysicsSimulation2DOptions) {
    this.state = {
      entities: [],
      gravity: 0,
      dragCoefficient: 0,
    };
  }

  public start() {
    const renderer = new Renderer(this.options.canvasOptions);
    const processor = new Processor(this.state);

    processor.subscribe((newState) => {
      this.state = newState;
    });

    processor.start();

    const drawState = () => {
      renderer.draw(this.state);
      requestAnimationFrame(drawState);
    };

    requestAnimationFrame(() => {
      drawState();
    });
  }

  public addEntity(...entities: Entity[]) {
    this.state.entities.push(...entities);
  }

  set gravity(gravity: number) {
    this.state.gravity = gravity;
  }

  set dragCoefficient(dragCoefficient: number) {
    this.state.dragCoefficient = dragCoefficient;
  }

  set bounds(bounds: Vector) {
    this.state.bounds = bounds;
  }
}
