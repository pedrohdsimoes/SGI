import {
    CGFscene,
    CGFaxis,
    CGFcamera,
    CGFplane,
    CGFappearance,
    CGFobject
} from '../../lib/CGF.js';
import {
    MyPlane
} from '../primitives/MyPlane.js';


/**
 * MySGITrack
 * @constructor
 * @param scene - Reference to MyScene object
 */

export class MySGITrack extends CGFobject {
    constructor(scene) {
        super(scene);

        this.scene = scene;

        this.trackText = new CGFappearance(this.scene);
        this.trackText.setAmbient(1, 1, 1, 1);
        this.trackText.setDiffuse(1, 1, 1, 1);
        this.trackText.setSpecular(1, 1, 1, 1);
        this.trackText.setShininess(10.0);
        this.trackText.loadTexture('scenes/images/testTrackBackground.png');
        this.trackText.setTextureWrap('REPEAT', 'REPEAT');
        this.track = new MyPlane(this.scene, "SGITrack", 50, 50);

    }

    display() {
        this.trackText.apply();

        this.scene.pushMatrix();
        this.scene.translate(256, 0, 256);
        this.scene.scale(512, 1, 512);
        this.scene.rotate(-Math.PI / 2, 1, 0, 0);
        this.track.display();
        this.scene.popMatrix();
    }
}