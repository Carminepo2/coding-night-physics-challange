import { now } from "../lib/utils";
import { Entity } from "../models/entity";
import { Vector } from "../models/vector";
import { PhysicsState2D } from "./physics-simulation-2d";

export class Processor {
  private subscribers: { pid: string; callback: (state: PhysicsState2D) => void }[] = [];

  constructor(private state: PhysicsState2D) {}

  subscribe(callback: (state: PhysicsState2D) => void) {
    const pid = crypto.randomUUID();
    this.subscribers.push({ pid, callback });
    return () => {
      this.subscribers = this.subscribers.filter((subscriber) => subscriber.pid !== pid);
    };
  }

  start() {
    setInterval(this.loop.bind(this), 5);
  }

  private loop() {
    const currentTime = now();

    if (!this.state.time) {
      this.state.time = currentTime;
      return;
    }

    const dTime = currentTime - this.state.time;

    this.state.entities = this.state.entities.map((entity) => {
      entity.position = entity.position.sum(entity.velocity.mult(dTime));
      const forceGrav = new Vector(0, this.state.gravity).mult(entity.mass);
      entity.velocity = entity.velocity.sum(forceGrav.mult(dTime / entity.mass));

      this.handleDragForces(entity, this.state, dTime);
      this.handleEntityBounds(entity, this.state);

      return entity;
    });

    this.state.time = currentTime;

    this.subscribers.forEach((subscriber) => subscriber.callback(this.state));
  }

  private handleDragForces(entity: Entity, state: PhysicsState2D, dTime: number) {
    const forceDrag = entity.velocity.mult(entity.velocity.length() * -state.dragCoefficient);
    const newVelocity = entity.velocity.sum(forceDrag.mult(dTime / entity.mass));
    if (entity.velocity.scalar(newVelocity) > 0) {
      entity.velocity = newVelocity;
    } else {
      entity.velocity = new Vector(0, 0);
    }
  }

  private handleEntityBounds(entity: Entity, state: PhysicsState2D) {
    if (!state.bounds) return;

    if (entity.position.x < 0 || entity.position.x > state.bounds.x) {
      entity.velocity = new Vector(-entity.velocity.x, entity.velocity.y);
      if (entity.position.x < 0) {
        entity.position = new Vector(0, entity.position.y);
      }
      if (entity.position.x > state.bounds.x) {
        entity.position = new Vector(state.bounds.x, entity.position.y);
      }
    }

    if (entity.position.y < 0 || entity.position.y > state.bounds.y) {
      entity.velocity = new Vector(entity.velocity.x, -entity.velocity.y * 0.9);
      if (entity.position.y < 0) {
        entity.position = new Vector(entity.position.x, 0);
      }
      if (entity.position.y > state.bounds.y) {
        entity.position = new Vector(entity.position.x, state.bounds.y);
      }
    }
  }
}
