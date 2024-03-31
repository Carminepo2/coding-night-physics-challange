import { Entity } from "../models/entity";
import { Renderer } from "./renderer";

export interface PhysicsState2D {
  entities: Entity[];
  gravity: number;
  time?: number;
}

export class PhysicsSimulation2D {
  private state: PhysicsState2D;
  private renderer = new Renderer();

  constructor(entities: Array<Entity>, gravity: number) {
    this.state = { entities, gravity };
  }

  public start() {
    const processor = new Worker(new URL("./processor.ts", import.meta.url), {
      type: "module",
    });

    processor.postMessage(this.state);
    processor.onmessage = (event: MessageEvent<PhysicsState2D>) => {
      this.state = event.data;
    };

    const drawState = () => {
      this.renderer.draw(this.state);
      requestAnimationFrame(drawState);
    };

    requestAnimationFrame(() => {
      drawState();
    });
  }
}
