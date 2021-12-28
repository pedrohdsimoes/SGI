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
    constructor(scene, position) {

        super(scene);
        this.position = position;
        this.red = new CGFappearance(this.scene);
        this.red.setAmbient(1, 0, 0, 1);
        this.red.setDiffuse(1, 0, 0, 1);
        this.red.setSpecular(1, 0, 0, 1);
        this.red.setShininess(10.0);
        this.obs = new MyCylinder(scene, "obstacle", 7, 3.3, 3.3, 50, 1);
    }
    display() {
        this.red.apply();

        this.scene.pushMatrix();
        this.scene.translate(this.position[0], this.position[1], this.position[2]);
        this.scene.rotate(-Math.PI / 2, 1, 0, 0);
        this.obs.display();
        this.scene.popMatrix();

    }

}