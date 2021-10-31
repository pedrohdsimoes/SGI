import { CGFobject } from "../lib/CGF.js";
import { MyFloor } from "./MyFloor.js";


/**
 * MyFloor
 * @constructor
 * @param scene - Reference to MyScene object
 */
export class Floor extends CGFobject {
  constructor(scene) {
    super(scene);

    this.floor = new MyFloor(scene);
  }
  display() {
    this.scene.pushMatrix();
    this.floor.display();
    this.scene.popMatrix();
  }

  // These are only needed if you are enabling normal visualization in compound objects
  enableNormalViz() {
    this.floor.enableNormalViz();
  }
  disableNormalViz() {
    this.floor.disableNormalViz();
  }
}