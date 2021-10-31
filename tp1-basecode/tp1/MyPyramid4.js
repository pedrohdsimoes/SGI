import { CGFobject } from "../lib/CGF.js";
import { MyQuad } from "./MyQuad.js";
import { MyTriangule } from "./MyTriangule.js";

/**
 * MyTable
 * @constructor
 * @param scene - Reference to MyScene object
 */

export class MyPyramid4 extends CGFobject {
  constructor(scene) {
    super(scene);

    this.quad = new MyQuad(scene);
    this.triangule = new MyTriangule(scene);
  }

  display() {
    // quad facing +ZZ
    this.scene.pushMatrix();
    this.scene.translate(0, 0.5, 0.0);
    this.scene.rotate(-Math.PI / 4, 1, 0, 0);
    this.triangule.display();
    this.scene.popMatrix();

    // quad facing -XX
    this.scene.pushMatrix();
    this.scene.translate(0.0, 0.5, 0.0);
    this.scene.rotate(-Math.PI / 4, 0, 0, 1);
    this.scene.rotate(-Math.PI / 2, 0, 1, 0);
    this.triangule.display();
    this.scene.popMatrix();

    // quad facing -ZZ
    this.scene.pushMatrix();
    this.scene.translate(0, 0.5, 0.0);
    this.scene.rotate(Math.PI / 4, 1, 0, 0);
    this.scene.rotate(Math.PI, 0, 1, 0);
    this.triangule.display();
    this.scene.popMatrix();

    // quad facing +XX
    this.scene.pushMatrix();
    this.scene.translate(0.0, 0.5, 0.0);
    this.scene.rotate(Math.PI / 4, 0, 0, 1);
    this.scene.rotate(Math.PI / 2, 0, 1, 0);
    this.triangule.display();
    this.scene.popMatrix();

    // Base
    this.scene.pushMatrix();
    this.scene.rotate(Math.PI / 2, 1, 0, 0);
    this.quad.display();
    this.scene.popMatrix();
    this.scene.pushMatrix();
  }

  // These are only needed if you are enabling normal visualization in compound objects
  enableNormalViz() {
    this.quad.enableNormalViz();
    this.triangule.enableNormalViz();
  }
  disableNormalViz() {
    this.quad.disableNormalViz();
    this.triangule.disableNormalViz();
  }
}
