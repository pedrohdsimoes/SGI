import {
    CGFobject,
    CGFappearance,
    CGFnurbsObject,
    CGFnurbsSurface
} from "../../lib/CGF.js";
import {
    MyCylinder
} from "../primitives/MyCylinder.js";

/**
 * MyPowerUp
 * @constructor
 * @param scene - Reference to MyScene object
 */
export class MyPowerUp extends CGFobject {
    constructor(scene) {
        super(scene);
        this.green = new CGFappearance(this.scene);
        this.green.setAmbient(0, 1, 0, 1);
        this.green.setDiffuse(0, 1, 0, 1);
        this.green.setSpecular(0, 1, 0, 1);
        this.green.setShininess(10.0);
        this.pu = new MyCylinder(scene, "powerup", 5, 0.5, 0.5, 50, 1);
    }
    display() {
        this.green.apply();
        // quad facing +ZZ
        this.scene.pushMatrix();
        this.scene.rotate(-Math.PI / 2, 1, 0, 0);
        this.pu.display();
        this.scene.popMatrix();

    }

}