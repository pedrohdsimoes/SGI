import { CGFobject } from "../lib/CGF.js";
import { MyTable } from "./MyTable.js";

/**
 * MyTable
 * @constructor
 * @param scene - Reference to MyScene object
 */

export class Table3 extends CGFobject {
  constructor(scene) {
    super(scene);

    this.table = new MyTable(scene);
  }
  display() {
    this.scene.pushMatrix();
    this.scene.translate(5, 0, 7);
    this.scene.rotate(Math.PI / 3.7, 0, 1, 0);
    this.table.display();
    this.scene.popMatrix();
  }

  // These are only needed if you are enabling normal visualization in compound objects
  enableNormalViz() {
    this.table.enableNormalViz();
  }
  disableNormalViz() {
    this.table.disableNormalViz();
  }
}
