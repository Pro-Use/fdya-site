import { Engine } from "../engine/Engine";
import * as THREE from "three";
import { Experience } from "../engine/Experience";
import { Resource } from "../engine/Resources";
import { Astroid } from "./astroid";
import { GameEntity } from "../engine/GameEntity";

export const MAX_SCALE = 0.6;
export const DEBUG = false;
export interface ResourceMap {
  gltf: string;
  normal: string;
  environment: string;
}

function getLightPosition() {
  let hour = new Date().getHours();
  let r = 100;
  let cos45 = Math.cos((45 / 180) * Math.PI);
  let angle = (hour / 24) * 270 - 45;
  // console.log("angle", angle);
  let xy = r * Math.cos((angle / 180) * Math.PI);
  // console.log("xy = ", xy);
  let x = xy * cos45;
  let y = xy * cos45;
  let z = r * cos45 * Math.sin((hour / 24) * Math.PI);
  return { x, y, z };
}


export class World implements Experience {
  resources: Resource[];
  entities: GameEntity[] = [];
  astroid!: Astroid;
  light2!: THREE.DirectionalLight;

  constructor(private engine: Engine, resource: ResourceMap) {
    this.resources = [
      {
        name: "astroid",
        type: "gltf",
        path: resource.gltf,
      },
      { name: "normal_1", type: "texture", path: resource.normal },
      {
        name: "iStock",
        type: "texture",
        path: resource.environment,
      },
    ];
  }

  init() {
    const iStock: THREE.Texture = this.engine.resources.getItem("iStock");
    iStock.colorSpace = THREE.SRGBColorSpace;
    iStock.mapping = THREE.EquirectangularReflectionMapping;

    const astroid = new Astroid(this.engine.resources, iStock);
    this.astroid = astroid;
    this.entities.push(astroid);
    this.engine.scene.add(astroid.scene);

    const light1 = new THREE.AmbientLight(0xffffff, 0.3);
    this.engine.scene.add(light1);
    // if (DEBUG) {
    //   const afolder = this.engine.debug.gui.addFolder("AmbientLight");
    //   afolder
    //     .addColor({ cssColor: "0xffffff" }, "cssColor")
    //     .onChange((v: string) => {
    //       light1.color.setStyle(v);
    //     });
    //   afolder
    //     .add({ intensity: 0.3 }, "intensity", 0, 1)
    //     .onChange((intensity: number) => {
    //       light1.intensity = intensity;
    //     });
    // }

    const light2 = new THREE.DirectionalLight(0xffffff, 3.5);
    light2.name = "main_light";

    let { x, y, z } = getLightPosition();
    light2.position.set(x, y, z);

    light2.castShadow = true;
    light2.shadow.mapSize.width = 2048; // default
    light2.shadow.mapSize.height = 2048; // default
    light2.shadow.camera.near = 0.5; // default
    light2.shadow.camera.far = 500; // default
    light2.target = astroid.scene;
    this.engine.scene.add(light2);

    this.light2 = light2;

    // if (DEBUG) {
    //   const helper = new THREE.DirectionalLightHelper(light2, 50);
    //   this.engine.scene.add(helper);
    // }

    // const folder = this.engine.debug.gui.addFolder("DirectionalLight");
    // folder
    //   .addColor({ cssColor: "0xffffff" }, "cssColor")
    //   .onChange((v: string) => {
    //     light2.color.setStyle(v);
    //   });
    // folder
    //   .add({ intensity: 3.5 }, "intensity", 0, 5, 0.1)
    //   .onChange((intensity: number) => {
    //     light2.intensity = intensity;
    //   });
    // folder.add({ hour: 0 }, "hour", 0, 24, 1).onChange((hour: number) => {
    //   // 0,24 -> 180 + 30 * 2 = 240
    //   let r = 100;
    //   let cos45 = Math.cos((45 / 180) * Math.PI);
    //   let angle = (hour / 24) * 270 - 45;
    //   console.log("angle", angle);
    //   let xy = r * Math.cos((angle / 180) * Math.PI);
    //   console.log("xy = ", xy);
    //   let x = xy * cos45;
    //   let y = xy * cos45;
    //   let z = r * cos45 * Math.sin((hour / 24) * Math.PI);
    //   console.log(`(${x.toFixed(2)}, ${y.toFixed(2)}, ${z.toFixed(2)})`);
    //   light2.position.set(x, y, z);
    // });
  }

  resize() {}

  reset() {
    this.astroid.reset();
    this.engine.camera.instance.zoom = 1;
    this.engine.camera.instance.updateProjectionMatrix();
    let { x, y, z } = getLightPosition();
    this.light2.position.set(x, y, z);
    this.engine.camera.instance.zoom = 1;
    this.engine.camera.instance.updateProjectionMatrix();

  }

  update(delta: number) {
    for (const entity of this.entities) {
      entity.update(delta);
    }
    if (this.astroid.scale >= MAX_SCALE) {
      this.engine.camera.instance.zoom += delta * 0.1;
      this.engine.camera.instance.updateProjectionMatrix();
    }
  }
}
