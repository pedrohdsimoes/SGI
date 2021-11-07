import { CGFappearance, CGFobject } from "../lib/CGF.js";
import { MyChair } from "./MyChair.js";
import { MyFloor } from "./MyFloor.js";
import { MyLamp } from "./MyLamp.js";
import { MyQuad } from "./MyQuad.js";
import { MyTable } from "./MyTable.js";
import { MyWall } from "./MyWall.js";

/**
 * MyTable
 * @constructor
 * @param scene - Reference to MyScene object
 */

export class MyRoom extends CGFobject {
  constructor(scene) {
    super(scene);
    this.initMaterials(scene);
    
    this.table = new MyTable(scene,this.wood);
    this.floor = new MyFloor(scene);
    this.wall = new MyWall(scene);
    this.doorWall = new MyWall(scene);
    this.lamp = new MyLamp(scene);
    this.chair = new MyChair(scene);
  }
  initMaterials(scene) {
    this.wood = new CGFappearance(scene);
    this.wood.setAmbient(0.1,0.1,0.1,1);
    this.wood.setDiffuse(1*0.7,0,0,1.0);
    this.wood.setSpecular(1,0,0,1.0,1.0);
    this.wood.setShininess(10.0);

    this.white = new CGFappearance(scene);
    this.white.setAmbient(0.1, 0.1, 0.1, 1);
    this.white.setDiffuse(0.9, 0.9, 0.9, 1);
    this.white.setSpecular(0.1, 0.1, 0.1, 1);
    this.white.setShininess(10.0);
  }
  display() {
    //table1
    this.scene.pushMatrix();
    this.scene.translate(-4, 0, -3);
    this.table.display();
    this.scene.popMatrix();
     //table2
     this.scene.pushMatrix();
     this.scene.translate(6, 0, -3);
     this.scene.scale(1,0.6,1.7);
     this.scene.rotate(Math.PI / 2, 0, 1, 0);
     this.table.display();
     this.scene.popMatrix();
     //table3
     this.scene.pushMatrix();
     this.scene.translate(5, 0, 7);
     this.scene.rotate(Math.PI / 3.7, 0, 1, 0);
     this.table.display();
     this.scene.popMatrix();
     //chair1
     this.scene.pushMatrix();
     this.scene.translate(-4, 0, -1.5);
     this.chair.display();
     this.scene.popMatrix();
     //chair2
     this.scene.pushMatrix();
     this.scene.translate(5, 0.73, 5);
     this.scene.rotate(-Math.PI /2 , 0, 1, 0);
     this.scene.rotate(Math.PI / 2, 1, 0, 0);
     this.chair.display();
     this.scene.popMatrix();
     //floor
     this.scene.pushMatrix();
     this.floor.display();
     this.scene.popMatrix();
     //wall1 facing -ZZ
     this.scene.pushMatrix();
     this.scene.translate(0, 5, -10);
     this.scene.scale(20, 10, 20);
     this.wall.display();
     this.scene.popMatrix();
     //wall2 facing +XX
     this.scene.pushMatrix();
     this.scene.translate(10, 5, 0);
     this.scene.rotate(-Math.PI / 2, 0, 1, 0);
     this.scene.scale(20, 10, 20);
     this.wall.display();
     this.scene.popMatrix();
     //wall3 facing +ZZ
     this.scene.pushMatrix();
     this.scene.translate(0, 5, 10);
     this.scene.rotate(Math.PI, 0, 1, 0);
     this.scene.scale(20, 10, 20);
     this.wall.display();
     this.scene.popMatrix();
     //wall4 facing -XX
        // Parte de baixo da janela
        this.scene.pushMatrix();
        this.scene.translate(-10, 3, -3);
        this.scene.rotate(Math.PI / 2, 0, 1, 0);
        this.scene.scale(14, 6, 20);
        this.doorWall.display();
        this.scene.popMatrix();

        // Parte de cima da janela
        this.scene.pushMatrix();
        this.scene.translate(-10, 9, 0);
        this.scene.rotate(Math.PI / 2, 0, 1, 0);
        this.scene.scale(20, 2, 20);
        this.doorWall.display();
        this.scene.popMatrix();

        // Parte direita da janela
        this.scene.pushMatrix();
        this.scene.translate(-10, 7, -9);
        this.scene.rotate(Math.PI / 2, 0, 1, 0);
        this.scene.scale(2, 2, 20);
        this.doorWall.display();
        this.scene.popMatrix();

        // Parte esquerda da janela
        this.scene.pushMatrix();
        this.scene.translate(-10, 7, -0.5);
        this.scene.rotate(Math.PI / 2, 0, 1, 0);
        this.scene.scale(9, 2, 20);
        this.doorWall.display();
        this.scene.popMatrix();

        // Parte esquerda da porta
        this.scene.pushMatrix();
        this.scene.translate(-10, 5, 9);
        this.scene.rotate(Math.PI / 2, 0, 1, 0);
        this.scene.scale(2, 10, 20);
        this.doorWall.display();
        this.scene.popMatrix();

        // Parte de cima da porta
        this.scene.pushMatrix();
        this.scene.translate(-10, 7.5, 6);
        this.scene.rotate(Math.PI / 2, 0, 1, 0);
        this.scene.scale(4, 1, 20);
        this.doorWall.display();
        this.scene.popMatrix();
      //lamp
      this.scene.pushMatrix();
      this.scene.translate(-5, 3.45, -4.1);
      this.lamp.display();
      this.scene.popMatrix();
      
   
  }

  // These are only needed if you are enabling normal visualization in compound objects
  enableNormalViz() {
    this.table.enableNormalViz();
    this.floor.enableNormalViz();
  }
  disableNormalViz() {
    this.table.disableNormalViz();
    this.floor.disableNormalViz();
  }
}

