import { WebGLRenderer } from "three";
import { Engine } from "./Engine";
import * as THREE from "three";
import { GameEntity } from "./GameEntity";
import { EffectComposer } from "three/examples/jsm/postprocessing/EffectComposer.js";
import { RenderPass } from "three/examples/jsm/postprocessing/RenderPass.js";

export class RenderEngine implements GameEntity {
  private readonly renderer: WebGLRenderer;
  pmremGenerator: THREE.PMREMGenerator;
  composer: EffectComposer;

  constructor(private engine: Engine) {
    this.renderer = new WebGLRenderer({
      canvas: this.engine.canvas,
      antialias: true,
      alpha: true,
    });

    this.renderer.outputColorSpace = THREE.SRGBColorSpace;
    this.renderer.toneMapping = THREE.LinearToneMapping;
    this.renderer.toneMappingExposure = Math.pow(2, 0);
    this.renderer.shadowMap.enabled = true;
    this.renderer.setSize(this.engine.sizes.width, this.engine.sizes.height);
    this.renderer.setPixelRatio(Math.min(this.engine.sizes.pixelRatio, 2));

    const pmremGenerator = new THREE.PMREMGenerator(this.renderer);
    pmremGenerator.compileEquirectangularShader();
    this.pmremGenerator = pmremGenerator;

    this.composer = new EffectComposer(this.renderer);

    const renderPass = new RenderPass(
      this.engine.scene,
      this.engine.camera.instance
    );
    this.composer.addPass(renderPass);
  }

  update() {
    this.composer.render();
  }

  resize() {
    this.renderer.setSize(this.engine.sizes.width, this.engine.sizes.height);
    this.composer.setSize(this.engine.sizes.width, this.engine.sizes.height);
    this.composer.render();
  }
}
