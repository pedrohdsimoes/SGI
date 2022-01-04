import {
    CGFobject
} from "../../lib/CGF.js";

import { KeyFrameAnimation } from "./KeyFrameAnimation.js";
import { KeyFrame } from "./KeyFrame.js";

/**
 * MyRoute
 * @constructor
 * @param scene - Reference to MyScene object
 */
export class MyRoute extends CGFobject {
    constructor(scene, d) {
        super(scene);
        
        this.scene = scene;
        this.d = d;
        this.routes = [];
        this.store_route();
        // this.animations = [];

    }

    store_route() {
        var splitedR = [];
        let coord = this.d;
        let instant = 0;
        var keyframe = new KeyFrame();
        var animation = new KeyFrameAnimation(this.scene);

        splitedR = coord.split(" ");
        for (let c = 1; c < splitedR.length - 1; c++) {
            let coordR = splitedR[c].split(",");
            this.routes[c] = [coordR[0], 0, coordR[1]];

            keyframe.instant = instant;
            keyframe.translation = [coordR[0], 0, coordR[1]];
            animation.addKeyFrame(keyframe);
            instant += 5;
        }

        // this.animations= animation;
        // console.log("COORD=" + this.routes);
        return animation
    }
}