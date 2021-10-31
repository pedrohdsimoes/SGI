import { CGFobject } from "../lib/CGF.js";
import { MyChair } from "./MyChair.js";


/**
 * MyTable
 * @constructor
 * @param scene - Reference to MyScene object
 */

export class Chair2 extends CGFobject {
  constructor(scene) {
    super(scene);

    this.chair2 = new MyChair(scene);
  }
  display() {
    this.scene.pushMatrix();
    this.scene.translate(5, 0.73, 5);
    this.scene.rotate(-Math.PI /2 , 0, 1, 0);
    this.scene.rotate(Math.PI / 2, 1, 0, 0);
    this.chair2.display();
    this.scene.popMatrix();
  }

  // These are only needed if you are enabling normal visualization in compound objects
  enableNormalViz() {
    this.chair2.enableNormalViz();
  }
  disableNormalViz() {
    this.chair2.disableNormalViz();
  }
}