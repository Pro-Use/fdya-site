import { Engine } from "./Engine";
import { EventEmitter } from "./utilities/EventEmitter";

type Sizing = "cover" | "contain";

export class Sizes extends EventEmitter {
  public width!: number;
  public height!: number;
  public pixelRatio: number = Math.min(window.devicePixelRatio, 2);
  public aspectRatio!: number;

  public sizing: Sizing = "contain";

  constructor(private engine: Engine, private container: HTMLCanvasElement) {
    super();
    this.setContainsSizing();

    window.addEventListener("resize", () => {
      this.resize();
      this.engine.resize();
      this.emit("resize");
    });
  }

  public setContainsSizing() {
    this.width = this.container.clientWidth;
    this.height = this.container.clientHeight;

    this.aspectRatio = this.width / this.height;
  }

  public setCoverSizing() {
    const maxWidth = this.container.clientWidth;
    const maxHeight = this.container.clientHeight;

    if (maxWidth / maxHeight < this.aspectRatio) {
      this.width = maxWidth;
      this.height = maxWidth / this.aspectRatio;
    } else {
      this.width = maxHeight * this.aspectRatio;
      this.height = maxHeight;
    }
  }

  setAspectRatio(aspectRatio: number) {
    this.aspectRatio = aspectRatio;
  }

  setSizing(sizing: Sizing) {
    this.sizing = sizing;

    this.resize();
  }

  resize() {
    if (this.sizing === "contain") {
      this.setContainsSizing();
    } else {
      this.setCoverSizing();
    }
  }
}
