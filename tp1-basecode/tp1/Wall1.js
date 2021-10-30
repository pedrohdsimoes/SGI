import { CGFobject } from "../lib/CGF.js";
import { MyQuad } from "./MyQuad.js";

/**
 * MyCube
 * @constructor
 * @param scene - Reference to MyScene object
 */
export class Wall1 extends CGFobject {
  constructor(scene) {
    super(scene);

    this.face = new MyQuad(scene);
  }
  display() {
    // Wall facing -ZZ
    this.scene.pushMatrix();
    this.scene.translate(0, 5, -10);
    this.scene.scale(20, 10, 20);
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
