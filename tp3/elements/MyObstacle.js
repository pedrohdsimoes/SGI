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
 * MyObstacle
 * @constructor
 * @param scene - Reference to MyScene object
 */
export class MyObstacle extends CGFobject {
    constructor(scene) {
        super(scene);
        this.red = new CGFappearance(this.scene);
        this.red.setAmbient(1, 0, 0, 1);
        this.red.setDiffuse(1, 0, 0, 1);
        this.red.setSpecular(1, 0, 0, 1);
        this.red.setShininess(10.0);
        this.obs = new MyCylinder(scene, "obstacle", 5, 0.5, 0.5, 50, 1);
    }
    display() {
        this.red.apply();
        // quad facing +ZZ
        this.scene.pushMatrix();
        this.scene.rotate(-Math.PI / 2, 1, 0, 0);
        this.obs.display();
        this.scene.popMatrix();

    }

}