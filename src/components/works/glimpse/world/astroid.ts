import * as THREE from "three";
import { GameEntity } from "../engine/GameEntity";
import { GLTF } from "three/examples/jsm/loaders/GLTFLoader.js";
import { MAX_SCALE } from "./index";
import { Resources } from "../engine/Resources";

export class Astroid implements GameEntity {
  public scene!: GLTF["scene"];
  private model: THREE.Mesh;
  public scale: number = 1 / 1000;
  private rateX!: number;
  private rateY!: number;

  constructor(resource: Resources) {
    const gltf: GLTF = resource.getItem("astroid");
    console.log(gltf);
    this.scene = gltf.scene;
    this.model = gltf.scene.children[0]! as THREE.Mesh;
    const mesh = this.model.children[0] as THREE.Mesh;
    const material = mesh.material as THREE.MeshStandardMaterial;
    material.normalMap = resource.getItem("normal_1");

    this.reset();
  }

  reset() {
    this.scale = 1 / 1000;
    this.rateX = Math.random() * 150 + 150;
    this.rateY = Math.random() * 150 + 150;

    const x = Math.random() * 40 - 20;
    const y = Math.random() * 30 - 15;
    this.model.position.set(x, y, 0);

    this.model.rotateX(Math.PI * Math.random());
    this.model.rotateY(Math.PI * Math.random());
    this.model.rotateZ(Math.PI * Math.random());

    this.model.scale.setScalar(this.scale);
  }

  update(delta: number): void {
    this.model.rotation.x += (delta / this.rateX) * 50;
    this.model.rotation.y += (delta / this.rateY) * 50;
    if (this.scale < MAX_SCALE) {
      this.scale += delta / 40;
      this.model.scale.setScalar(this.scale);
    }
  }
}
