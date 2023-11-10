import * as THREE from "three";
import { RenderEngine } from "./RenderEngine";
import { RenderLoop } from "./RenderLoop";
import { Sizes } from "./Sizes";
import { Camera } from "./Camera";
import { Resources } from "./Resources";
import { Experience, ExperienceConstructor } from "./Experience";
import type { ResourceMap } from "../world";

export class Engine {
  public readonly camera!: Camera;
  public readonly scene!: THREE.Scene;
  public readonly renderEngine!: RenderEngine;
  public readonly time!: RenderLoop;
  public readonly sizes!: Sizes;
  public readonly canvas!: HTMLCanvasElement;
  public readonly resources!: Resources;
  public readonly experience!: Experience;
  private isComplete: boolean = false;

  constructor({
    canvas,
    experience,
    onLoaded,
    resource,
  }: {
    canvas: HTMLCanvasElement;
    experience: ExperienceConstructor;
    onLoaded: () => void;
    resource: ResourceMap;
  }) {
    if (!canvas) {
      throw new Error("No canvas provided");
    }

    this.canvas = canvas;
    this.sizes = new Sizes(this, canvas);
    this.time = new RenderLoop(this);
    this.scene = new THREE.Scene();
    this.camera = new Camera(this);
    this.renderEngine = new RenderEngine(this);
    this.experience = new experience(this, resource);
    this.resources = new Resources(this.experience.resources);

    this.resources.on("loaded", () => {
      this.experience.init();
      this.isComplete = true;
      onLoaded();
    });

    this.resources.on("progress", (_progress: number) => {});
  }

  start() {
    this.experience.reset();
    this.time.start();
  }

  pause() {
    this.time.pause();
  }

  reset() {
    this.time.pause();
    this.experience.reset();
    this.update(0);
  }

  update(delta: number) {
    if (!this.isComplete) return;

    this.camera.update();
    this.renderEngine.update();
    this.experience.update(delta);
  }

  resize() {
    this.camera.resize();
    this.renderEngine.resize();
    if (this.experience.resize) {
      this.experience.resize();
    }
  }
}
