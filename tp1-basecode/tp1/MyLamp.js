import { CGFobject } from "../lib/CGF.js";
import { MyCube } from "./MyCube.js";
import { MyPyramid4 } from "./MyPyramid4.js";

/**
 * MyTable
 * @constructor
 * @param scene - Reference to MyScene object
 */

export class MyLamp extends CGFobject {
  constructor(scene,material) {
    super(scene);
    this.material = material;

    this.cube = new MyCube(scene);
    this.pyramid = new MyPyramid4(scene);
  }
  display() {
    this.material.apply();
    // Base
    this.scene.pushMatrix();
    this.scene.translate(0, 0.25, 0);
    this.scene.scale(0.3, 0.1, 0.3);
    this.cube.display();
    this.scene.popMatrix();

    // Pé
    this.scene.pushMatrix();
    this.scene.translate(0, 0.7, 0);
    this.scene.scale(0.05, 0.8, 0.05);
    this.cube.display();
    this.scene.popMatrix();

    // Quebra-luz

    this.scene.pushMatrix();
    this.scene.translate(0, 0.95, 0);
    this.scene.scale(0.8, 1, 0.8);
    this.pyramid.display();
    this.scene.popMatrix();
  }

  // These are only needed if you are enabling normal visualization in compound objects
  enableNormalViz() {
    this.cube.enableNormalViz();
    this.pyramid.enableNormalViz();
  }
  disableNormalViz() {
    this.cube.disableNormalViz();
    this.pyramid.disableNormalViz();
  }
}
