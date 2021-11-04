import { CGFobject } from "../lib/CGF.js";
import { MyQuad } from "./MyQuad.js";

/**
 * MyCube
 * @constructor
 * @param scene - Reference to MyScene object
 */
export class Wall4 extends CGFobject {
  constructor(scene) {
    super(scene);

    this.face = new MyQuad(scene);
  }
  display() {
    // Wall facing -XX
    // Parte de baixo da janela
    this.scene.pushMatrix();
    this.scene.translate(-10, 3, -3);
    this.scene.rotate(Math.PI / 2, 0, 1, 0);
    this.scene.scale(14, 6, 20);
    this.face.display();
    this.scene.popMatrix();

    // Parte de cima da janela
    this.scene.pushMatrix();
    this.scene.translate(-10, 9, 0);
    this.scene.rotate(Math.PI / 2, 0, 1, 0);
    this.scene.scale(20, 2, 20);
    this.face.display();
    this.scene.popMatrix();

    // Parte direita da janela
    this.scene.pushMatrix();
    this.scene.translate(-10, 7, -9);
    this.scene.rotate(Math.PI / 2, 0, 1, 0);
    this.scene.scale(2, 2, 20);
    this.face.display();
    this.scene.popMatrix();

    // Parte esquerda da janela
    this.scene.pushMatrix();
    this.scene.translate(-10, 7, -0.5);
    this.scene.rotate(Math.PI / 2, 0, 1, 0);
    this.scene.scale(9, 2, 20);
    this.face.display();
    this.scene.popMatrix();

    // Parte esquerda da porta
    this.scene.pushMatrix();
    this.scene.translate(-10, 5, 9);
    this.scene.rotate(Math.PI / 2, 0, 1, 0);
    this.scene.scale(2, 10, 20);
    this.face.display();
    this.scene.popMatrix();

    // Parte de cima da porta
    this.scene.pushMatrix();
    this.scene.translate(-10, 7.5, 6);
    this.scene.rotate(Math.PI / 2, 0, 1, 0);
    this.scene.scale(4, 1, 20);
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
