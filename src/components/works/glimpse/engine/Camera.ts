import { Engine } from "./Engine";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { GameEntity } from "./GameEntity";

export class Camera implements GameEntity {
  public instance!: THREE.PerspectiveCamera;
  private controls!: OrbitControls;

  constructor(private engine: Engine) {
    this.initCamera();
    this.initControls();
  }

  private initCamera() {
    this.instance = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      // 1,
      0.1,
      1000
    );
    this.instance.position.y = 50;
    this.instance.position.z = 50;
    this.engine.scene.add(this.instance);
  }

  private initControls() {
    this.controls = new OrbitControls(this.instance, this.engine.canvas);
    this.controls.update();
  }

  resize() {
    this.instance.aspect = this.engine.sizes.aspectRatio;
    this.instance.updateProjectionMatrix();
  }

  update() {
    this.controls.update();
  }
}
