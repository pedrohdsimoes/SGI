import {
    CGFscene,
    CGFaxis,
    CGFcamera,
    CGFplane,
    CGFappearance,
    CGFobject
} from '../../lib/CGF.js';
import { MyQuad } from '../../TextExample/MyQuad.js';
import { MyCylinder } from '../primitives/MyCylinder.js';
import {
    MyPlane
} from '../primitives/MyPlane.js';
import { MyRectangle } from '../primitives/MyRectangle.js';
import { MyBuilding } from './MyBuilding.js';
import { MyBuilding2 } from './MyBuilding2.js';
import { MyTree } from './MyTree.js';



/**
 * MyAbuDhabi
 * @constructor
 * @param scene - Reference to MyScene object
 */

export class MyAbuDhabi extends CGFobject {
    constructor(scene) {
        super(scene);

        this.scene = scene;

        this.trackTex = new CGFappearance(this.scene);
        this.trackTex.setAmbient(1, 1, 1, 1);
        this.trackTex.setDiffuse(1, 1, 1, 1);
        this.trackTex.setSpecular(1, 1, 1, 1);
        this.trackTex.setShininess(10.0);
        this.trackTex.loadTexture('scenes/images/trackbackground.png');
        this.trackTex.setTextureWrap('REPEAT', 'REPEAT');

        this.fans = new CGFappearance(this.scene);
        this.fans.setAmbient(1, 1, 1, 1);
        this.fans.setDiffuse(1, 1, 1, 1);
        this.fans.setSpecular(1, 1, 1, 1);
        this.fans.setShininess(10.0);
        this.fans.loadTexture('scenes/images/fans.jpeg');
        this.fans.setTextureWrap('REPEAT', 'REPEAT');

        this.fans2 = new CGFappearance(this.scene);
        this.fans2.setAmbient(1, 1, 1, 1);
        this.fans2.setDiffuse(1, 1, 1, 1);
        this.fans2.setSpecular(1, 1, 1, 1);
        this.fans2.setShininess(10.0);
        this.fans2.loadTexture('scenes/images/ferrari.jpeg');
        this.fans2.setTextureWrap('REPEAT', 'REPEAT');

        this.pitwall = new CGFappearance(this.scene);
        this.pitwall.setAmbient(1, 1, 1, 1);
        this.pitwall.setDiffuse(1, 1, 1, 1);
        this.pitwall.setSpecular(1, 1, 1, 1);
        this.pitwall.setShininess(10.0);
        this.pitwall.loadTexture('scenes/images/pitwall.jpeg');
        this.pitwall.setTextureWrap('REPEAT', 'REPEAT');

        this.marine = new CGFappearance(this.scene);
        this.marine.setAmbient(1, 1, 1, 1);
        this.marine.setDiffuse(1, 1, 1, 1);
        this.marine.setSpecular(1, 1, 1, 1);
        this.marine.setShininess(10.0);
        this.marine.loadTexture('scenes/images/marine.jpeg');
        this.marine.setTextureWrap('REPEAT', 'REPEAT');

        this.buildingTex = new CGFappearance(this.scene);
        this.buildingTex.setAmbient(1, 1, 1, 1);
        this.buildingTex.setDiffuse(1, 1, 1, 1);
        this.buildingTex.setSpecular(1, 1, 1, 1);
        this.buildingTex.setShininess(10.0);
        this.buildingTex.loadTexture('scenes/images/building.jpg');
        this.buildingTex.setTextureWrap('REPEAT', 'REPEAT');

        this.roofTex = new CGFappearance(this.scene);
        this.roofTex.setAmbient(1, 1, 1, 1);
        this.roofTex.setDiffuse(1, 1, 1, 1);
        this.roofTex.setSpecular(1, 1, 1, 1);
        this.roofTex.setShininess(10.0);
        this.roofTex.loadTexture('scenes/images/roof.jpg');
        this.roofTex.setTextureWrap('REPEAT', 'REPEAT');

        this.roof2Tex = new CGFappearance(this.scene);
        this.roof2Tex.setAmbient(1, 1, 1, 1);
        this.roof2Tex.setDiffuse(1, 1, 1, 1);
        this.roof2Tex.setSpecular(1, 1, 1, 1);
        this.roof2Tex.setShininess(10.0);
        this.roof2Tex.loadTexture('scenes/images/roof2.jpg');
        this.roof2Tex.setTextureWrap('REPEAT', 'REPEAT');

        this.track = new MyPlane(this.scene, "AbuDhabi", 50, 50);
        this.tree = new MyTree(this.scene, "tree");
        this.building = new MyBuilding(this.scene, "building");
        this.building2 = new MyBuilding2(this.scene, "building2");
    }

    display() {
        this.trackTex.apply();

        this.scene.pushMatrix();
        this.scene.translate(256, 0, 256);
        this.scene.scale(512, 1, 512);
        this.scene.rotate(-Math.PI / 2, 1, 0, 0);
        this.track.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.fans.apply();
        this.scene.translate(256, 40, 0);
        this.scene.scale(512, 80, 1);
        this.track.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.pitwall.apply();
        this.scene.rotate(Math.PI / 2, 0, 1, 0);
        this.scene.translate(-256, 40, 0);
        this.scene.scale(512, 80, 1);
        this.track.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.fans2.apply();
        this.scene.rotate(-Math.PI / 2, 0, 1, 0);
        this.scene.translate(256, 40, -512);
        this.scene.scale(512, 80, 1);
        this.track.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.fans.apply();
        this.scene.rotate(Math.PI, 0, 1, 0);
        this.scene.translate(-256, 40, -512);
        this.scene.scale(512, 80, 1);
        this.track.display();
        this.scene.popMatrix();

        // this.scene.pushMatrix();
        // this.marine.apply();
        // this.scene.rotate(Math.PI, 0, 1, 0);
        // this.scene.translate(-256, 80, -712);
        // this.scene.scale(512, 160, 1);
        // this.track.display();
        // this.scene.popMatrix();


        // _______________TREES_______________________

        this.scene.pushMatrix();
        this.scene.translate(20, 0, 50);
        this.tree.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.translate(50, 0, 90);
        this.tree.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.translate(100, 0, 70);
        this.tree.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.translate(150, 0, 50);
        this.tree.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.translate(200, 0, 80);
        this.tree.display();
        this.scene.popMatrix();
        this.scene.pushMatrix();

        this.scene.translate(250, 0, 40);
        this.tree.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.translate(300, 0, 70);
        this.tree.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.translate(350, 0, 30);
        this.tree.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.translate(400, 0, 30);
        this.tree.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.translate(105, 0, 180);
        this.scene.scale(2, 2, 2);
        this.tree.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.translate(290, 0, 265);
        this.scene.scale(2, 2, 2);
        this.tree.display();
        this.scene.popMatrix();

        // BUILDING
        this.scene.pushMatrix();
        this.building.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.translate(350, 0, 45);
        this.scene.scale(0.3, 0.3, 0.8);
        this.building2.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.translate(350, 0, 100);
        this.scene.scale(0.3, 0.3, 0.8);
        this.building2.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.translate(240, 0, 220);
        this.scene.rotate(Math.PI / 6, 0, 1, 0);
        this.scene.scale(0.9, 0.2, 0.3);
        this.building2.display();
        this.scene.popMatrix();
    }
}