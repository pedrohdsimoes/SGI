import { CGFobject } from "../lib/CGF.js";
import { MyLamp } from "./MyLamp.js";

/**
 * MyTable
 * @constructor
 * @param scene - Reference to MyScene object
 */

export class Lamp1 extends CGFobject {
  constructor(scene) {
    super(scene);

    this.lamp1 = new MyLamp(scene);
  }
  display() {
    this.scene.pushMatrix();
    this.scene.translate(-5, 3.45, -4.1);
    this.lamp1.display();
    this.scene.popMatrix();
  }

  // These are only needed if you are enabling normal visualization in compound objects
  enableNormalViz() {
    this.lamp1.enableNormalViz();
  }
  disableNormalViz() {
    this.lamp1.disableNormalViz();
  }
}
