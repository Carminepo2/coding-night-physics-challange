export class RenderLoop {
  private t0 = new Date().getTime();
  private running = false;

  constructor(private callback: (time: number) => void) {}

  start() {
    this.running = true;
    this._loop(this.t0);
  }

  stop() {
    this.running = false;
  }

  private _loop(time: number) {
    if (!this.running) return;

    requestAnimationFrame(() => {
      try {
        this.callback(time);
      } catch (error) {
        console.error("Error in render loop callback:", error);
        this.stop();
        return;
      }

      this._loop(new Date().getTime() - this.t0);
    });
  }
}
