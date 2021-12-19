import { CGFobject, CGFappearance, CGFnurbsObject, CGFnurbsSurface } from "../../lib/CGF.js";
import { MyCylinder } from "../primitives/MyCylinder.js";


/**
 * VehicleBody
 * @constructor
 * @param scene - Reference to MyScene object
 */

export class VehicleBody extends CGFobject {
    constructor(scene) {
        super(scene);

        this.cylinder = new MyCylinder(scene, "body", 1.5, 0.5, 0.5, 4, 1);

    }

    display() {
        this.scene.pushMatrix();
        
        // Body
        this.scene.pushMatrix();
        this.scene.translate(0, 0.35, -1.5);
        this.scene.rotate(Math.PI / 4, 0, 0, 1);
        this.cylinder.display();
        this.scene.popMatrix();

        this.scene.popMatrix();

    }

}