import { CGFobject } from "../lib/CGF.js";
import { MyCube } from "./MyCube.js";
import { MyPyramid4 } from "./MyPyramid4.js";

/**
 * MyTable
 * @constructor
 * @param scene - Reference to MyScene object
 */

export class MyLamp extends CGFobject {
  constructor(scene) {
    super(scene);

    this.cube = new MyCube(scene);
    this.pyramid = new MyPyramid4(scene);
  }
  display() {

    // Base
    this.scene.pushMatrix();
    this.scene.translate(0, 0.25, 0);
    this.scene.scale(0.2, 0.5, 0.2);
    this.cube.display();
    this.scene.popMatrix();

    // Pé
    this.scene.pushMatrix();
    this.scene.translate(0, 0.5, 0);
    this.scene.scale(0.05, 0.5, 0.05);
    this.cube.display();
    this.scene.popMatrix();

    // Quebra-luz

    this.scene.pushMatrix();
    this.scene.translate(0, 0.75, 0);
    this.scene.scale(0.4, 0.5, 0.4);
    this.pyramid.display();
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