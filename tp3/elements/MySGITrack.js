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

import {
    MyTree
} from './MyTree.js';


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
        this.trackText.setShininess(100.0);
        this.trackText.loadTexture('scenes/images/testTrackBackground.png');
        this.trackText.setTextureWrap('REPEAT', 'REPEAT');

        this.track = new MyPlane(this.scene, "SGITrack", 50, 50);

        this.xp_view = new CGFappearance(this.scene);
        this.xp_view.setAmbient(1, 1, 1, 1);
        this.xp_view.setDiffuse(1, 1, 1, 1);
        this.xp_view.setSpecular(1, 1, 1, 1);
        this.xp_view.setShininess(10.0);
        this.xp_view.loadTexture('scenes/images/xp.jpeg');
        this.xp_view.setTextureWrap('REPEAT', 'REPEAT');

        this.forest_view = new CGFappearance(this.scene);
        this.forest_view.setAmbient(1, 1, 1, 1);
        this.forest_view.setDiffuse(1, 1, 1, 1);
        this.forest_view.setSpecular(1, 1, 1, 1);
        this.forest_view.setShininess(10.0);
        this.forest_view.loadTexture('scenes/images/forest.jpeg');
        this.forest_view.setTextureWrap('REPEAT', 'REPEAT');

        this.fans = new CGFappearance(this.scene);
        this.fans.setAmbient(1, 1, 1, 1);
        this.fans.setDiffuse(1, 1, 1, 1);
        this.fans.setSpecular(1, 1, 1, 1);
        this.fans.setShininess(10.0);
        this.fans.loadTexture('scenes/images/fans.jpeg');
        this.fans.setTextureWrap('REPEAT', 'REPEAT');

        this.tree = new MyTree(this.scene, "trees");
    }

    display() {
        this.trackText.apply();

        this.scene.pushMatrix();
        this.scene.translate(256, 0, 256);
        this.scene.scale(512, 1, 512);
        this.scene.rotate(-Math.PI / 2, 1, 0, 0);
        this.track.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.xp_view.apply();
        this.scene.translate(256, 40, 0);
        this.scene.scale(512, 80, 1);
        this.track.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.fans.apply();
        this.scene.rotate(Math.PI / 2, 0, 1, 0);
        this.scene.translate(-256, 40, 0);
        this.scene.scale(512, 80, 1);
        this.track.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.fans.apply();
        this.scene.rotate(-Math.PI / 2, 0, 1, 0);
        this.scene.translate(256, 40, -512);
        this.scene.scale(512, 80, 1);
        this.track.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.forest_view.apply();
        this.scene.rotate(Math.PI, 0, 1, 0);
        this.scene.translate(-256, 40, -512);
        this.scene.scale(512, 80, 1);
        this.track.display();
        this.scene.popMatrix();

        // ___________________ TREE ___________________________

        this.scene.pushMatrix();
        this.scene.translate(210, 0, 110);
        this.scene.scale(0.5, 0.5, 0.5);
        this.tree.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.translate(300, 0, 130);
        this.scene.scale(0.5, 0.5, 0.5);
        this.tree.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.translate(210, 0, 350);
        this.scene.scale(0.5, 0.5, 0.5);
        this.tree.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.translate(225, 0, 300);
        this.scene.scale(0.5, 0.5, 0.5);
        this.tree.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.translate(240, 0, 200);
        this.scene.scale(0.5, 0.5, 0.5);
        this.tree.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.translate(300, 0, 200);
        this.scene.scale(0.5, 0.5, 0.5);
        this.tree.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.translate(300, 0, 250);
        this.scene.scale(0.5, 0.5, 0.5);
        this.tree.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.translate(340, 0, 180);
        this.scene.scale(0.5, 0.5, 0.5);
        this.tree.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.translate(310, 0, 370);
        this.scene.scale(0.5, 0.5, 0.5);
        this.tree.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.translate(280, 0, 280);
        this.scene.scale(0.5, 0.5, 0.5);
        this.tree.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.translate(155, 0, 260);
        this.scene.scale(0.5, 0.5, 0.5);
        this.tree.display();
        this.scene.popMatrix();

    }
}