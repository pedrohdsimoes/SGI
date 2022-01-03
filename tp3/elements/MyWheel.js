import {
    CGFobject,
    CGFappearance
} from "../../lib/CGF.js";
import {
    MyCircle
} from "../primitives/MyCircle.js";
import {
    MyCylinder2
} from "../primitives/MyCylinder2.js";


/**
 * MyWheel
 * @constructor
 * @param scene - Reference to MyScene object
 */
export class MyWheel extends CGFobject {
    constructor(scene) {
        super(scene);

        this.side = new CGFappearance(this.scene);
        this.side.setAmbient(1, 1, 1, 1);
        this.side.setDiffuse(1, 1, 1, 1);
        this.side.setSpecular(1, 1, 1, 1);
        this.side.setShininess(100.0);
        this.side.loadTexture('scenes/images/pneu.png');
        this.side.setTextureWrap('REPEAT', 'REPEAT');

        this.front = new CGFappearance(this.scene);
        this.front.setAmbient(1, 1, 1, 1);
        this.front.setDiffuse(1, 1, 1, 1);
        this.front.setSpecular(1, 1, 1, 1);
        this.front.setShininess(100.0);
        this.front.loadTexture('scenes/images/medium.png');
        this.front.setTextureWrap('REPEAT', 'REPEAT');

        this.cylinder2 = new MyCylinder2(scene, "sideMedium", 30, 30, 3, 2, 2);
        this.circle = new MyCircle(scene, "medium", 40, 100);

    }

    display() {
        //tyre
        this.scene.pushMatrix();
        this.side.apply();
        this.cylinder2.display();
        this.scene.popMatrix();

        // Front 
        this.scene.pushMatrix();
        this.front.apply();
        this.scene.translate(0, 0, 3);
        this.scene.scale(0.05, 0.05, 0.05);
        this.circle.display();
        this.scene.popMatrix();

        // Back
        this.scene.pushMatrix();
        this.front.apply();
        this.scene.scale(0.05, 0.05, 0.05);
        this.scene.rotate(Math.PI, 0, 1, 0);
        this.circle.display();
        this.scene.popMatrix();

    }

}