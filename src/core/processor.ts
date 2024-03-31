import { now } from "../lib/utils";
import { Vector } from "../models/vector";
import { PhysicsState2D } from "./physics-simulation-2d";

class Processor {}

let state: PhysicsState2D;

addEventListener("message", function (event: MessageEvent<PhysicsState2D>) {
  state = event.data;
});

async function loop() {
  if (!state) return;
  if (!state.time) {
    state.time = now();
    postMessage(state);
    setTimeout(loop, 5);
    return;
  }

  const currentTime = now();
  const dTime = currentTime - state.time;

  const newEntities = state.entities.map((entity) => {
    entity.position = entity.position.sum(entity.velocity.mult(dTime));
    const force = new Vector(0, state.gravity).mult(entity.mass);
    entity.velocity = entity.velocity.sum(force.mult(dTime / entity.mass));
    return entity;
  });

  postMessage({ ...state, entities: newEntities, time: currentTime } satisfies PhysicsState2D);
  setTimeout(loop, 5);
}

setTimeout(loop, 5);
