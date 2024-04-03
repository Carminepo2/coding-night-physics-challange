import { Entity } from "../models/entity";
import { Processor } from "./processor";
import { Renderer } from "./renderer";

export interface PhysicsState2D {
  entities: Entity[];
  gravity: number;
  dragCoefficient: number;
  bounds?: { x: number; y: number };
  time?: number;
}

export class PhysicsSimulation2D {
  private state: PhysicsState2D;
  private renderer: Renderer;
  private processor: Processor;

  constructor(initialState: { entities: Array<Entity>; gravity: number; dragCoefficient: number }) {
    this.renderer = new Renderer();
    this.state = {
      ...initialState,
      bounds: { x: this.renderer.canvasSize.width - 40, y: this.renderer.canvasSize.height - 40 },
    };
    this.processor = new Processor(this.state);
  }

  public start() {
    const { processor, renderer } = this;

    processor.subscribe((state) => {
      this.state = state;
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
}
