import { CGFobject } from "../lib/CGF.js";
import { MyCube } from "./MyCube.js";

/**
 * MyTable
 * @constructor
 * @param scene - Reference to MyScene object
 */

export class Table3 extends CGFobject {
  constructor(scene) {
    super(scene);

    this.face = new MyCube(scene);
  }
  display() {
    // Tampo
    this.scene.pushMatrix();
    this.scene.translate(5, 3.5, 7);
    this.scene.scale(5, 0.3, 3);
    this.face.display();
    this.scene.popMatrix();

    // Pernas
    this.scene.pushMatrix();
    this.scene.translate(2.65, 1.75, 5.65);
    this.scene.scale(0.3, 3.5, 0.3);
    this.face.display();
    this.scene.popMatrix();

    this.scene.pushMatrix();
    this.scene.translate(2.65, 1.75, 8.35);
    this.scene.scale(0.3, 3.5, 0.3);
    this.face.display();
    this.scene.popMatrix();

    this.scene.pushMatrix();
    this.scene.translate(7.35, 1.75, 5.65);
    this.scene.scale(0.3, 3.5, 0.3);
    this.face.display();
    this.scene.popMatrix();

    this.scene.pushMatrix();
    this.scene.translate(7.35, 1.75, 8.35);
    this.scene.scale(0.3, 3.5, 0.3);
    this.face.display();
    this.scene.popMatrix();

    // this.scene.pushMatrix();
    // this.scene.translate(-6.35, 1.75, -4.35);
    // this.scene.scale(0.3, 3.5, 0.3);
    // this.face.display();
    // this.scene.popMatrix();
  }

  // These are only needed if you are enabling normal visualization in compound objects
  enableNormalViz() {
    this.face.enableNormalViz();
  }
  disableNormalViz() {
    this.face.disableNormalViz();
  }
}
