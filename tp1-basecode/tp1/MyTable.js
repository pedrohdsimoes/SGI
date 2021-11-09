import { CGFobject } from "../lib/CGF.js";
import { MyCube } from "./MyCube.js";

/**
 * MyTable
 * @constructor
 * @param scene - Reference to MyScene object
 */

export class MyTable extends CGFobject {
  constructor(scene, material) {
    super(scene);
    this.material = material;
    this.cube = new MyCube(scene, material);
  }
  display() {
    this.material.apply();
    // Tampo
    this.scene.pushMatrix();
    this.scene.translate(0, 3.5, 0);
    this.scene.scale(5, 0.3, 3);
    this.cube.display();
    this.scene.popMatrix();

    // Pernas
    this.scene.pushMatrix();
    this.scene.translate(-2.35, 1.75, -1.35);
    this.scene.scale(0.3, 3.5, 0.3);
    this.cube.display();
    this.scene.popMatrix();

    this.scene.pushMatrix();
    this.scene.translate(-2.35, 1.75, 1.35);
    this.scene.scale(0.3, 3.5, 0.3);
    this.cube.display();
    this.scene.popMatrix();

    this.scene.pushMatrix();
    this.scene.translate(2.35, 1.75, 1.35);
    this.scene.scale(0.3, 3.5, 0.3);
    this.cube.display();
    this.scene.popMatrix();

    this.scene.pushMatrix();
    this.scene.translate(2.35, 1.75, -1.35);
    this.scene.scale(0.3, 3.5, 0.3);
    this.cube.display();
    this.scene.popMatrix();
  }

  // These are only needed if you are enabling normal visualization in compound objects
  enableNormalViz() {
    this.cube.enableNormalViz();
  }
  disableNormalViz() {
    this.cube.disableNormalViz();
  }
}
