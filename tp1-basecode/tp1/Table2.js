import { CGFobject } from "../lib/CGF.js";
import { MyCube } from "./MyCube.js";

/**
 * MyTable
 * @constructor
 * @param scene - Reference to MyScene object
 */

export class Table2 extends CGFobject {
  constructor(scene) {
    super(scene);

    this.face = new MyCube(scene);
  }
  display() {
    // Tampo
    this.scene.pushMatrix();
    this.scene.translate(6, 3.5, -3);
    this.scene.rotate(Math.PI / 2, 0, 1, 0);
    this.scene.scale(5, 0.3, 3);
    this.face.display();
    this.scene.popMatrix();

    // Pernas
    this.scene.pushMatrix();
    this.scene.translate(4.65, 1.75, -0.65);
    this.scene.scale(0.3, 3.5, 0.3);
    this.face.display();
    this.scene.popMatrix();

    this.scene.pushMatrix();
    this.scene.translate(4.65, 1.75, -5.35);
    this.scene.scale(0.3, 3.5, 0.3);
    this.face.display();
    this.scene.popMatrix();

    this.scene.pushMatrix();
    this.scene.translate(7.35, 1.75, -0.65);
    this.scene.scale(0.3, 3.5, 0.3);
    this.face.display();
    this.scene.popMatrix();

    this.scene.pushMatrix();
    this.scene.translate(7.35, 1.75, -5.35);
    this.scene.scale(0.3, 3.5, 0.3);
    this.face.display();
    this.scene.popMatrix();
  }

  // These are only needed if you are enabling normal visualization in compound objects
  enableNormalViz() {
    this.face.enableNormalViz();
  }
  disableNormalViz() {
    this.face.disableNormalViz();
  }
}
