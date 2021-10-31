import { CGFobject } from "../lib/CGF.js";
import { MyChair } from "./MyChair.js";


/**
 * MyTable
 * @constructor
 * @param scene - Reference to MyScene object
 */

export class Chair1 extends CGFobject {
  constructor(scene) {
    super(scene);

    this.chair1 = new MyChair(scene);
  }
  display() {
    this.scene.pushMatrix();
    this.scene.translate(-4, 0, -1.5);
    this.chair1.display();
    this.scene.popMatrix();
  }

  // These are only needed if you are enabling normal visualization in compound objects
  enableNormalViz() {
    this.chair1.enableNormalViz();
  }
  disableNormalViz() {
    this.chair1.disableNormalViz();
  }
}
