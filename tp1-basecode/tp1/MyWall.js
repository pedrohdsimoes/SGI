import { CGFobject } from "../lib/CGF.js";
import { MyQuad } from "./MyQuad.js";


/**
 * MyTable
 * @constructor
 * @param scene - Reference to MyScene object
 */

export class MyWall extends CGFobject {
  constructor(scene,material) {
    super(scene);

    this.wall = new MyQuad(scene);
    this.material = material;
  }
  display() {
    this.material.apply();
    
    this.scene.pushMatrix();
    this.wall.display();
    this.scene.popMatrix();
  }

  // These are only needed if you are enabling normal visualization in compound objects
  enableNormalViz() {
    this.wall.enableNormalViz();
  }
  disableNormalViz() {
    this.wall.disableNormalViz();
  }
}
