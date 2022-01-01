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
    constructor(scene, position, track) {
        super(scene);
        this.line = new CGFappearance(this.scene);
        this.line.setAmbient(1, 1, 1, 1);
        this.line.setDiffuse(1, 1, 1, 1);
        this.line.setSpecular(1, 1, 1, 1);
        this.line.setShininess(10.0);
        this.line.loadTexture('scenes/images/startLine.jpeg');
        this.line.setTextureWrap('REPEAT', 'REPEAT');
        this.start = new MyPlane(scene, "start", 50, 50),
            this.position = position;
        this.track = track;

    }
    display() {
        this.line.apply();

        this.scene.pushMatrix();
        this.scene.translate(this.position[0], this.position[1], this.position[2]);
        if (this.track == "TestTrackMap.svg") this.scene.rotate(-Math.PI / 2, 0, 1, 0);
        if (this.track == "TrackMap.svg") this.scene.rotate(Math.PI / 8, 0, 1, 0);
        this.scene.rotate(-Math.PI / 2, 1, 0, 0);
        this.scene.scale(10, 3, 0);
        this.start.display();
        this.scene.popMatrix();

    }

}