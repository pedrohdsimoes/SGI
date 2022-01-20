import {
    CGFobject,
    CGFappearance,
    CGFnurbsObject,
    CGFnurbsSurface
} from "../../lib/CGF.js";
import {
    MyCircle
} from "../primitives/MyCircle.js";
import {
    MyCylinder
} from "../primitives/MyCylinder.js";

/**
 * MyPowerUp
 * @constructor
 * @param scene - Reference to MyScene object
 */
export class MyPowerUp extends CGFobject {
    constructor(scene, position) {

        super(scene);
        this.position = position;
        this.green = new CGFappearance(this.scene);
        this.green.setAmbient(0, 1, 0, 1);
        this.green.setDiffuse(0, 0.4, 0, 1);
        this.green.setSpecular(0, 0.8, 0, 1);
        this.green.setShininess(10.0);
        this.green.loadTexture('scenes/images/powerup.jpg')
        this.green.setTextureWrap('REPEAT', 'REPEAT');
        this.pu = new MyCylinder(scene, "powerup", 2, 2.2, 2.2, 8, 1);
        this.circle = new MyCircle(scene, "puCircle", 2.2, 8);
    }
    display() {
        this.green.apply();

        this.scene.pushMatrix();
        this.scene.translate(this.position[0], this.position[1], this.position[2]);
        this.scene.rotate(-Math.PI / 2, 1, 0, 0);
        this.pu.display();
        this.scene.translate(0, 0, 2);
        this.circle.display();
        this.scene.popMatrix();

    }

}