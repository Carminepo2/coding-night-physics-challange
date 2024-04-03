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
    return this.unsubscribe.bind(this, pid);
  }

  private unsubscribe(pid: string) {
    this.subscribers = this.subscribers.filter((subscriber) => subscriber.pid !== pid);
  }

  start() {
    setInterval(this.loop.bind(this), 5);
  }

  private loop() {
    const { state } = this;
    const currentTime = now();

    if (!state) return;
    if (!state.time) {
      state.time = currentTime;
      return;
    }

    const dTime = currentTime - state.time;

    this.state.entities = state.entities.map((entity) => {
      entity.position = entity.position.sum(entity.velocity.mult(dTime));
      const forceGrav = new Vector(0, state.gravity).mult(entity.mass);
      entity.velocity = entity.velocity.sum(forceGrav.mult(dTime / entity.mass));

      this.handleDragForces(entity, state, dTime);
      this.handleEntityBounds(entity, state);

      return entity;
    });

    state.time = currentTime;

    this.subscribers.forEach((subscriber) => subscriber.callback(state));
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
    if (state.bounds) {
      if (entity.position.x < 0 || entity.position.x > state.bounds.x) {
        entity.velocity = new Vector(-entity.velocity.x, entity.velocity.y);
        entity.position = new Vector(state.bounds.x, entity.position.y);
      }

      if (entity.position.y < 0 || entity.position.y > state.bounds.y) {
        entity.velocity = new Vector(entity.velocity.x, -entity.velocity.y * 0.9);
        entity.position = new Vector(entity.position.x, state.bounds.y);
      }
    }
  }
}
