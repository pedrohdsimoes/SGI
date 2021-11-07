import { CGFobject } from "../lib/CGF.js";
import { MyCube } from "./MyCube.js";
import { MyTable } from "./MyTable.js";

/**
 * MyTable
 * @constructor
 * @param scene - Reference to MyScene object
 */

export class MyChair extends CGFobject {
  constructor(scene,material) {
    super(scene);
    this.material = material;
    this.seat = new MyTable(scene);
    this.cube = new MyCube(scene);
  }
  display() {
    this.material.apply();
    // Back
    this.scene.pushMatrix();
    this.scene.translate(0.675, 3.1, 0.675);
    this.scene.scale(0.15, 2.2, 0.15);
    this.cube.display();
    this.scene.popMatrix();

    this.scene.pushMatrix();
    this.scene.translate(-0.675, 3.1, 0.675);
    this.scene.scale(0.15, 2.2, 0.15);
    this.cube.display();
    this.scene.popMatrix();
        //Support
    this.scene.pushMatrix();
    this.scene.translate(0, 3.8, 0.68);
    this.scene.scale(1.8, 0.6, 0.15);
    this.cube.display();
    this.scene.popMatrix();

    // Seat
    this.scene.pushMatrix();
    this.scene.scale(0.3, 0.6, 0.5);
    this.seat.display();
    this.scene.popMatrix();

  }

  // These are only needed if you are enabling normal visualization in compound objects
  enableNormalViz() {
    this.seat.enableNormalViz();
    this.cube.enableNormalViz();
  }
  disableNormalViz() {
    this.seat.disableNormalViz();
    this.cube.disableNormalViz();
  }
}
