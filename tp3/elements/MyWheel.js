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
import {
    MyCylinder2
} from "../primitives/MyCylinder2.js";
import {
    MyPatch
} from "../primitives/MyPatch.js";


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
        this.side.loadTexture('scenes/images/sideMedium.png');
        this.side.setTextureWrap('REPEAT', 'REPEAT');

        this.front = new CGFappearance(this.scene);
        this.front.setAmbient(1, 1, 1, 1);
        this.front.setDiffuse(1, 1, 1, 1);
        this.front.setSpecular(1, 1, 1, 1);
        this.front.setShininess(100.0);
        this.front.loadTexture('scenes/images/test.png');
        this.front.setTextureWrap('REPEAT', 'REPEAT');

        let controlpoints = [
            [-1, 0.0, 0.0],
            [-1, 0.0, -1.3333333333333333],
            [1, 0.0, -1.3333333333333333],
            [1, 0.0, 0.0],
            [-1, 0.0, 0.0],
            [-1, 1.1547005383792515, -0.6666666666666667],
            [1, 1.1547005383792515, -0.6666666666666667],
            [1, 0.0, 0.0],
            [-1, 0.0, -0.0],
            [-1, 1.1547005383792515, 0.6666666666666663],
            [1, 1.1547005383792515, 0.6666666666666663],
            [1, 0.0, -0.0],
            [-1, 0.0, -0.0],
            [-1, 1.6328623988631375e-16, 1.3333333333333333],
            [1, 1.6328623988631375e-16, 1.3333333333333333],
            [1, 0.0, 0.0]
        ]
        this.circle = new MyPatch(scene, "medium", 4, 4, 30, 30, controlpoints);
        this.cylinder = new MyCylinder2(scene, "sideMedium", 30, 30, 3, 2, 2);

    }
    display() {
        this.side.apply();

        this.scene.pushMatrix();

        // this.scene.scale(3, 0, 3);
        this.scene.translate(0, 2, 0);
        this.cylinder.display();
        this.scene.popMatrix();

        this.front.apply();

        this.scene.pushMatrix();
        this.scene.translate(0, 2, 3);
        this.scene.rotate(Math.PI / 2, 1, 0, 0);
        this.scene.scale(2, 0, 2);
        this.scene.translate(0, 2, 0);
        this.circle.display();
        this.scene.popMatrix();


    }

}