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



/**
 * MyTree
 * @constructor
 * @param scene - Reference to MyScene object
 */

export class MyTree extends CGFobject {
    constructor(scene,id) {
        super(scene);

        this.scene = scene;

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

        this.basetree = new MyCylinder(this.scene, "basetree", 6, 0.85, 0.85, 16, 1);
        this.toptree = new MyCylinder(this.scene, "toptree", 7, 0, 3.3, 4, 2);
        this.rect = new MyRectangle(this.scene, "tree", 0, 4.7, 0, 4.7);

    }
    display() {
        this.scene.pushMatrix();
        this.scene.scale(2, 2, 2)

        this.scene.pushMatrix();
        this.basetreeTex.apply();
        this.scene.rotate(-Math.PI / 2, 1, 0, 0);
        this.basetree.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.toptreeTex.apply();
        this.scene.translate(0, 5.9, 0)
        this.scene.rotate(-Math.PI / 2, 1, 0, 0);
        this.toptree.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.toptreeTex.apply();
        this.scene.translate(-3.4, 5.9, 0)
        this.scene.rotate(Math.PI / 4, 0, 1, 0)
        this.scene.rotate(Math.PI / 2, 1, 0, 0);
        this.rect.display();
        this.scene.popMatrix();

        this.scene.popMatrix();
    }



}