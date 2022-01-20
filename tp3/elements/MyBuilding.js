import {
    CGFscene,
    CGFaxis,
    CGFcamera,
    CGFplane,
    CGFappearance,
    CGFobject
} from '../../lib/CGF.js';
import {
    MyQuad
} from '../../TextExample/MyQuad.js';
import {
    MyCylinder
} from '../primitives/MyCylinder.js';
import {
    MyPlane
} from '../primitives/MyPlane.js';
import {
    MyRectangle
} from '../primitives/MyRectangle.js';



/**
 * MyBuilding
 * @constructor
 * @param scene - Reference to MyScene object
 */

export class MyBuilding extends CGFobject {
    constructor(scene, id) {
        super(scene);

        this.scene = scene;

        this.buildingTex = new CGFappearance(this.scene);
        this.buildingTex.setAmbient(0.7, 0.7, 0.7, 1);
        this.buildingTex.setDiffuse(0.5, 0.5, 0.5, 1);
        this.buildingTex.setSpecular(1, 1, 1, 1);
        this.buildingTex.setShininess(100.0);
        this.buildingTex.loadTexture('scenes/images/building.jpg');
        this.buildingTex.setTextureWrap('REPEAT', 'REPEAT');

        this.roofTex = new CGFappearance(this.scene);
        this.roofTex.setAmbient(1, 1, 1, 1);
        this.roofTex.setDiffuse(1, 1, 1, 1);
        this.roofTex.setSpecular(1, 1, 1, 1);
        this.roofTex.setShininess(10.0);
        this.roofTex.loadTexture('scenes/images/roof.jpg');
        this.roofTex.setTextureWrap('REPEAT', 'REPEAT');

        this.side1 = new MyRectangle(this.scene, "s1", 0, 60, 0, 70);
        this.top = new MyRectangle(this.scene, "s1", 0, 60, 0, 60);

    }

    display() {
        this.buildingTex.apply();

        this.scene.pushMatrix();
        this.scene.translate(235, 0, 225);
        this.side1.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.translate(235, 0, 165);
        this.scene.rotate(-Math.PI / 2, 0, 1, 0);
        this.side1.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.translate(295, 0, 225);
        this.scene.rotate(Math.PI / 2, 0, 1, 0);
        this.side1.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.translate(295, 0, 165);
        this.scene.rotate(Math.PI, 0, 1, 0);
        this.side1.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.roofTex.apply();
        this.scene.translate(235, 70, 225);
        this.scene.rotate(-Math.PI / 2, 1, 0, 0);
        this.top.display();
        this.scene.popMatrix();
    }
}