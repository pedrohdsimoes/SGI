import {
    CGFobject,
    CGFappearance,
    CGFnurbsObject,
    CGFnurbsSurface
} from "../../lib/CGF.js";
import {
    MyPlane
} from "../primitives/MyPlane.js";

/**
 * MyStartLine
 * @constructor
 * @param scene - Reference to MyScene object
 */
export class MyStartLine extends CGFobject {
    constructor(scene) {
        super(scene);
        this.line = new CGFappearance(this.scene);
        this.line.setAmbient(1, 1, 1, 1);
        this.line.setDiffuse(1, 1, 1, 1);
        this.line.setSpecular(1, 1, 1, 1);
        this.line.setShininess(10.0);
        this.line.loadTexture('scenes/images/startLine.jpeg');
        this.line.setTextureWrap('REPEAT', 'REPEAT');
        this.start = new MyPlane(scene, "start", 50, 50);

    }
    display() {
        this.line.apply();

        this.scene.pushMatrix();
        this.scene.rotate(-Math.PI / 2, 1, 0, 0);
        this.scene.scale(10, 3, 0);
        this.start.display();
        this.scene.popMatrix();

    }

}