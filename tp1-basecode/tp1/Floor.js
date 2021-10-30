import { CGFobject } from "../lib/CGF.js";
import { MyQuad } from "./MyQuad.js";

/**
 * Floor
 * @constructor
 * @param scene - Reference to MyScene object
 */
export class Floor extends CGFobject {
  constructor(scene) {
    super(scene);

    this.face = new MyQuad(scene);
  }
  display() {
    this.scene.pushMatrix();
    this.scene.translate(0, 0, 0);
    this.scene.scale(20, 20, 20);
    this.scene.rotate(-Math.PI / 2, 1, 0, 0);
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
