import { FullscreenCanvas } from "./models/canvas";
import { Motion } from "./models/motion";
import { RenderLoop } from "./models/render-loop";
import { VectorBuffer } from "./models/vector-buffer";

const vectorBuffer1 = new VectorBuffer(100);
const vectorBuffer2 = new VectorBuffer(100);

const canvas = new FullscreenCanvas();

new RenderLoop((time) => {
  canvas.clearCanvas();
  canvas.drawAxes();

  const circularMotionPos = Motion.circularMotion(time, canvas.center, 100, 1, 0);
  vectorBuffer1.addVector(circularMotionPos);
  canvas.drawCircle(circularMotionPos, 5);

  const circulatMotionPos2 = Motion.circularMotion(time, circularMotionPos, 100, -2, 180);
  vectorBuffer2.addVector(circulatMotionPos2);
  canvas.drawCircle(circulatMotionPos2, 5);

  canvas.drawTrajectory(vectorBuffer1);
  canvas.drawTrajectory(vectorBuffer2);
}).start();
