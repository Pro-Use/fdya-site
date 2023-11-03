import { Engine } from "./Engine";
import * as THREE from "three";

export class RenderLoop {
  private clock!: THREE.Clock;
  public deltaTime: number = 16;
  public currentTime: number = 0;
  private handler?: number;

  constructor(private engine: Engine) {}

  start() {
    this.deltaTime = 0;
    this.currentTime = 0;
    this.clock = new THREE.Clock();
    this.handler = window.requestAnimationFrame(() => this.update());
  }

  pause() {
    if (this.handler !== undefined) {
      window.cancelAnimationFrame(this.handler);
    }
  }

  update() {
    const step = () => {
      this.handler = requestAnimationFrame(step);
      const elapsedTime = this.clock.getElapsedTime();

      this.deltaTime = elapsedTime - this.currentTime;

      this.currentTime = elapsedTime;

      this.engine.update(this.deltaTime);
    };
    step();
  }
}
