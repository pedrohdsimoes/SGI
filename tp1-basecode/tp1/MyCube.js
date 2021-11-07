import { CGFobject } from "../lib/CGF.js";
import { MyQuad } from "./MyQuad.js";

/**
 * MyCube
 * @constructor
 * @param scene - Reference to MyScene object
 */
export class MyCube extends CGFobject {
  constructor(scene) {
    super(scene);
    //this.material = material;
    this.cube = new MyQuad(scene);
  }
  display() {
   // this.material.apply();
    // quad facing +ZZ
    this.scene.pushMatrix();
    this.scene.translate(0, 0, 0.5);
    this.cube.display();
    this.scene.popMatrix();

    // quad facing -XX
    this.scene.pushMatrix();
    this.scene.translate(-0.5, 0, 0);
    this.scene.rotate(-Math.PI / 2, 0, 1, 0);
    this.cube.display();
    this.scene.popMatrix();

    // quad facing +YY
    this.scene.pushMatrix();
    this.scene.translate(0, 0.5, 0);
    this.scene.rotate(-Math.PI / 2, 1, 0, 0);
    this.cube.display();
	this.scene.popMatrix();
	  
	//-------------
    
	// quad facing -ZZ
    this.scene.pushMatrix();
	this.scene.translate(0, 0, -0.5);
	this.scene.rotate(Math.PI, 0, 1, 0);
    this.cube.display();
    this.scene.popMatrix();

    // quad facing +XX
    this.scene.pushMatrix();
    this.scene.translate(0.5, 0, 0);
    this.scene.rotate(Math.PI / 2, 0, 1, 0);
    this.cube.display();
    this.scene.popMatrix();

    // quad facing -YY
    this.scene.pushMatrix();
    this.scene.translate(0, -0.5, 0);
    this.scene.rotate(Math.PI / 2, 1, 0, 0);
    this.cube.display();
    this.scene.popMatrix();

    /* NOTE: WHEN PERFORMING THE ENTIRE CUBE IT IS EXPECTED 
        THAT ALL CUBE FACES ARE FACED OUTWARDS! */
  }

  // These are only needed if you are enabling normal visualization in compound objects
  enableNormalViz() {
    this.cube.enableNormalViz();
  }
  disableNormalViz() {
    this.cube.disableNormalViz();
  }
}
