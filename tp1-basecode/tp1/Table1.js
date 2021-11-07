import { CGFobject } from "../lib/CGF.js";
import { MyTable } from "./MyTable.js";

/**
 * MyTable
 * @constructor
 * @param scene - Reference to MyScene object
 */

export class Table1 extends CGFobject {
  constructor(scene) {
    super(scene);
    this.table = new MyTable(scene);
  }
  initMaterials(scene){
    //wood color
    this.woodMaterial = new CGFappearance(scene);
    this.woodMaterial.setAmbient(0.1,0.1,0.1,1);
    this.woodMaterial.setDiffuse(1*0.7,0,0,1.0);
    this.woodMaterial.setSpecular(1,0,0,1.0,1.0);
    this.woodMaterial.setShininess(10.0);
  }
  display() {
    this.scene.pushMatrix();
    this.scene.translate(-4, 0, -3);
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
