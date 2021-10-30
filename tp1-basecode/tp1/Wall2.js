import { CGFobject } from "../lib/CGF.js";
import { MyQuad } from "./MyQuad.js";

/**
 * MyCube
 * @constructor
 * @param scene - Reference to MyScene object
 */
export class Wall2 extends CGFobject {
  constructor(scene) {
    super(scene);

    this.face = new MyQuad(scene);
  }
  display() {
    // Wall facing +XX
    this.scene.pushMatrix();
    this.scene.translate(10, 5, 0);
    this.scene.rotate(-Math.PI / 2, 0, 1, 0);
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
