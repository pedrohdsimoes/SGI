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

        this.toptreeTex = new CGFappearance(this.scene);
        this.toptreeTex.setAmbient(1, 1, 1, 1);
        this.toptreeTex.setDiffuse(1, 1, 1, 1);
        this.toptreeTex.setSpecular(1, 1, 1, 1);
        this.toptreeTex.setShininess(10.0);
        this.toptreeTex.loadTexture('scenes/images/toptree.jpg');
        this.toptreeTex.setTextureWrap('REPEAT', 'REPEAT');

        this.basetreeTex = new CGFappearance(this.scene);
        this.basetreeTex.setAmbient(1, 1, 1, 1);
        this.basetreeTex.setDiffuse(1, 1, 1, 1);
        this.basetreeTex.setSpecular(1, 1, 1, 1);
        this.basetreeTex.setShininess(10.0);
        this.basetreeTex.loadTexture('scenes/images/basetree.jpg');
        this.basetreeTex.setTextureWrap('REPEAT', 'REPEAT');

        this.fans = new CGFappearance(this.scene);
        this.fans.setAmbient(1, 1, 1, 1);
        this.fans.setDiffuse(1, 1, 1, 1);
        this.fans.setSpecular(1, 1, 1, 1);
        this.fans.setShininess(10.0);
        this.fans.loadTexture('scenes/images/fans.jpeg');
        this.fans.setTextureWrap('REPEAT', 'REPEAT');

        this.marine = new CGFappearance(this.scene);
        this.marine.setAmbient(1, 1, 1, 1);
        this.marine.setDiffuse(1, 1, 1, 1);
        this.marine.setSpecular(1, 1, 1, 1);
        this.marine.setShininess(10.0);
        this.marine.loadTexture('scenes/images/marine.jpeg');
        this.marine.setTextureWrap('REPEAT', 'REPEAT');

        this.track = new MyPlane(this.scene, "AbuDhabi", 50, 50);
        this.tree = new MyTree(this.scene, "tree");

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
        this.fans.apply();
        this.scene.rotate(Math.PI / 2, 0, 1, 0);
        this.scene.translate(-256, 40, 0);
        this.scene.scale(512, 80, 1);
        this.track.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.fans.apply();
        this.scene.rotate(-Math.PI / 2, 0, 1, 0);
        this.scene.translate(256, 40, -512);
        this.scene.scale(512, 80, 1);
        this.track.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.marine.apply();
         this.scene.rotate(Math.PI , 0, 1, 0);
        this.scene.translate(-256, 80, -512);
        this.scene.scale(512, 160, 1);
        this.track.display();
        this.scene.popMatrix();


        // _______________TREES_______________________

        this.scene.pushMatrix();
        this.scene.translate(100, 0, 50);
        this.tree.display();
        this.scene.popMatrix();
    }
}