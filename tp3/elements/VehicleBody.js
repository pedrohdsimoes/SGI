import { CGFobject, CGFappearance, CGFnurbsObject, CGFnurbsSurface } from "../../lib/CGF.js";
import { MyCylinder } from "../primitives/MyCylinder.js";
import { MyPlane } from "../primitives/MyPlane.js";
import { MyRectangle } from "../primitives/MyRectangle.js";
import { MySphere } from "../primitives/MySphere.js";
import { MyPatch } from "../primitives/MyPatch.js";
import { MyTriangle } from "../primitives/MyTriangle.js";



/**
 * VehicleBody
 * @constructor
 * @param scene - Reference to MyScene object
 */

export class VehicleBody extends CGFobject {
    constructor(scene) {
        super(scene);

        this.body2Tex = new CGFappearance(this.scene);
        this.body2Tex.setAmbient(1, 1, 1, 1);
        this.body2Tex.setDiffuse(1, 1, 1, 1);
        this.body2Tex.setSpecular(1, 1, 1, 1);
        this.body2Tex.setShininess(100.0);
        this.body2Tex.loadTexture('scenes/images/fwcSponsor.png');
        this.body2Tex.setTextureWrap('REPEAT', 'REPEAT');

        // this.rectRWTex = new CGFappearance(this.scene);
        // this.rectRWTex.setAmbient(1, 1, 1, 1);
        // this.rectRWTex.setDiffuse(1, 1, 1, 1);
        // this.rectRWTex.setSpecular(1, 1, 1, 1);
        // this.rectRWTex.setShininess(100.0);
        // this.rectRWTex.loadTexture('scenes/images/.jpeg');
        // this.rectRWTex.setTextureWrap('REPEAT', 'REPEAT');

        this.frontwingTex = new CGFappearance(this.scene);
        this.frontwingTex.setAmbient(1, 1, 1, 1);
        this.frontwingTex.setDiffuse(1, 1, 1, 1);
        this.frontwingTex.setSpecular(1, 1, 1, 1);
        this.frontwingTex.setShininess(100.0);
        this.frontwingTex.loadTexture('scenes/images/frontwingSponsor.jpeg');
        this.frontwingTex.setTextureWrap('REPEAT', 'REPEAT');

        // this.rearwingTex = new CGFappearance(this.scene);
        // this.rearwingTex.setAmbient(1, 1, 1, 1);
        // this.rearwingTex.setDiffuse(1, 1, 1, 1);
        // this.rearwingTex.setSpecular(1, 1, 1, 1);
        // this.rearwingTex.setShininess(100.0);
        // this.rearwingTex.loadTexture('scenes/images/.jpeg');
        // this.rearwingTex.setTextureWrap('REPEAT', 'REPEAT');

        this.redTex = new CGFappearance(this.scene);
        this.redTex.setAmbient(1, 1, 1, 1);
        this.redTex.setDiffuse(1, 1, 1, 1);
        this.redTex.setSpecular(1, 1, 1, 1);
        this.redTex.setShininess(100.0);
        this.redTex.loadTexture('scenes/images/red.png');
        this.redTex.setTextureWrap('REPEAT', 'REPEAT');

        this.sideWingTex = new CGFappearance(this.scene);
        this.sideWingTex.setAmbient(1, 1, 1, 1);
        this.sideWingTex.setDiffuse(1, 1, 1, 1);
        this.sideWingTex.setSpecular(1, 1, 1, 1);
        this.sideWingTex.setShininess(100.0);
        this.sideWingTex.loadTexture('scenes/images/santanderSponsor.png');
        this.sideWingTex.setTextureWrap('REPEAT', 'REPEAT');

        this.wingTex = new CGFappearance(this.scene);
        this.wingTex.setAmbient(1, 1, 1, 1);
        this.wingTex.setDiffuse(1, 1, 1, 1);
        this.wingTex.setSpecular(1, 1, 1, 1);
        this.wingTex.setShininess(100.0);
        this.wingTex.loadTexture('scenes/images/wingSponsor.png');
        this.wingTex.setTextureWrap('REPEAT', 'REPEAT');

        this.floorTex = new CGFappearance(this.scene);
        this.floorTex.setAmbient(1, 1, 1, 1);
        this.floorTex.setDiffuse(1, 1, 1, 1);
        this.floorTex.setSpecular(1, 1, 1, 1);
        this.floorTex.setShininess(100.0);
        this.floorTex.loadTexture('scenes/images/carbonFiber.jpeg');
        this.floorTex.setTextureWrap('REPEAT', 'REPEAT');

        this.helmetTex = new CGFappearance(this.scene);
        this.helmetTex.setAmbient(0, 0, 0, 1);
        this.helmetTex.setDiffuse(0, 0, 0, 1);
        this.helmetTex.setSpecular(0, 0, 0, 1);
        this.helmetTex.setShininess(100.0);
        this.helmetTex.loadTexture('scenes/images/helmet.png');
        this.helmetTex.setTextureWrap('REPEAT', 'REPEAT');


        this.body1 = new MyCylinder(scene, "back_body", 0.9, 0.5, 0.5, 4, 1);
        this.body2 = new MyCylinder(scene, "front_body", 0.7, 0.25, 0.5, 4, 1);
        this.frontConn = new MyCylinder(scene, "FrontWingConnection", 2.9, 0.15, 0.25, 4, 1)
        this.wing = new MyPlane(scene, "wing", 50, 50);
        this.sideWing = new MyPlane(scene, "sideWing", 50, 50);
        this.floor = new MyRectangle(scene, "floor", 0, 2.2, 0, 2.85);
        this.fwrectangle = new MyRectangle(scene, "frontwingRect", 0, 0.43, 0, 0.29);
        this.wheelSuport = new MyCylinder(scene, "suport", 0.7, 0.045, 0.045, 70, 4);
        this.base = new MyCylinder(scene, "base", 1.1, 1.5, 2, 3, 70);
        this.helmet = new MySphere(scene, "helmet", 0.3, 40, 50);

        // let controlpoints = [
        //     [-2, 0, 0],
        //     [-1, 0, -1.33],
        //     [1, 0, -1.33],
        //     [2, 0, 0],
        //     [-2, 0, 0],
        //     [-0.5, 1.1547005383792515, -0.6666666666666667],
        //     [0.5, 1.1547005383792515, -0.6666666666666667],
        //     [0.5, 1, 0],
        //     [-0.5, 1, 0],
        //     [-0.5, 1.1547005383792515, 0.6666666666666663],
        //     [0.5, 1.1547005383792515, 0.6666666666666663],
        //     [2, 0, 0],
        //     [-2, 0, 0],
        //     [-0.5, 1.6328623988631375e-16, 1.3333333333333333],
        //     [0.5, 1.6328623988631375e-16, 1.3333333333333333],
        //     [2, 0, 0]
        // ]

        let controlpoints = [
            [0, 0, -0.1],
            [0, 1, -0.1],
            [0.333, 0, -0.222],
            [0.666, 1, -0.222],
            [1, 0, 0.333],
            [1, 1, 0.333],
        ]

        this.rearwing = new MyPatch(scene, "rearwing", 3, 2, 10, 10, controlpoints);
        this.rectRW = new MyCylinder(scene, "sideRW", 0.6, 0.2, 0.2, 2, 1);
        this.supportRW = new MyTriangle(scene, "supportRW", 0, 0, 0, 1, 0, 0, 0.5, 0.75, 0);
    }

    display() {
        this.scene.pushMatrix();

        // Right side Rear Wing Support
        this.scene.pushMatrix();
        // this.floorTex.apply();
        this.scene.translate(-0.8, 1.8, -4.6);
        this.scene.rotate(Math.PI / 2, 1, 0, 0);
        this.scene.rotate(-Math.PI / 2, 0, 1, 0);
        this.supportRW.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        // this.floorTex.apply();
        this.scene.translate(-0.8, 0.8, -4.6);
        this.scene.rotate(Math.PI / 2, 1, 0, 0);
        this.scene.rotate(Math.PI / 2, 0, 1, 0);
        this.supportRW.display();
        this.scene.popMatrix();

        // Left side Rear Wing Support
        this.scene.pushMatrix();
        // this.floorTex.apply();
        this.scene.translate(0.8, 1.8, -4.6);
        this.scene.rotate(Math.PI / 2, 1, 0, 0);
        this.scene.rotate(-Math.PI / 2, 0, 1, 0);
        this.supportRW.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        // this.floorTex.apply();
        this.scene.translate(0.8, 0.8, -4.6);
        this.scene.rotate(Math.PI / 2, 1, 0, 0);
        this.scene.rotate(Math.PI / 2, 0, 1, 0);
        this.supportRW.display();
        this.scene.popMatrix();

        // Left side rect Rear Wing
        this.scene.pushMatrix();
        // this.rectRWTex.apply();
        this.scene.scale(1, 1, 1);
        this.scene.translate(0.6, 0.8, -4.6);
        this.scene.rotate(Math.PI / 4, 1, 0, 0);
        this.rectRW.display();
        this.scene.popMatrix();

        // Right side rect Rear Wing
        this.scene.pushMatrix();
        // this.rectRWTex.apply();
        this.scene.scale(1, 1, 1);
        this.scene.translate(-0.6, 0.8, -4.6);
        this.scene.rotate(Math.PI / 4, 1, 0, 0);
        this.rectRW.display();
        this.scene.popMatrix();

        // Rear Wing
        this.scene.pushMatrix();
        // this.rearwingTex.apply();
        this.scene.translate(-0.8, 1.76, -4.45);
        this.scene.rotate(-Math.PI / 2, 0, 0, 1);
        this.scene.scale(0.6, 1.6, 1);
        this.rearwing.display();
        this.scene.popMatrix();

        // Helmet
        this.scene.pushMatrix();
        this.helmetTex.apply();
        this.scene.translate(0, 1.1, -1);
        this.scene.scale(1, 1, 1.1);
        this.helmet.display();
        this.scene.popMatrix();

        // Left Front Wheel Connection 1
        this.scene.pushMatrix();
        this.floorTex.apply();
        this.scene.scale(1.2, 1.2, 1.2);
        this.scene.translate(0.15, 0.43, 1.38);
        this.scene.rotate(Math.PI / 2.86, 0, 1, 0);
        this.scene.rotate(Math.PI / 20, 1, 0, 0);
        this.wheelSuport.display();
        this.scene.popMatrix();

        // Left Front Wheel Connection 2
        this.scene.pushMatrix();
        this.floorTex.apply();
        this.scene.translate(0.2, 0.4, 2);
        this.scene.rotate(Math.PI / 2, 0, 1, 0);
        this.wheelSuport.display();
        this.scene.popMatrix();

        // Left Front Wheel Connection 3
        this.scene.pushMatrix();
        this.floorTex.apply();
        this.scene.scale(1.22, 1.22, 1.22);
        this.scene.translate(0.12, 0.35, 1.97);
        this.scene.rotate(2 * Math.PI / 3, 0, 1, 0);
        this.scene.rotate(Math.PI / 90, 1, 0, 0);
        this.wheelSuport.display();
        this.scene.popMatrix();

        // Right Front Wheel Connection 1
        this.scene.pushMatrix();
        this.floorTex.apply();
        this.scene.scale(1.2, 1.2, 1.2);
        this.scene.translate(-0.15, 0.43, 1.38);
        this.scene.rotate(-Math.PI / 2.86, 0, 1, 0);
        this.scene.rotate(Math.PI / 20, 1, 0, 0);
        this.wheelSuport.display();
        this.scene.popMatrix();

        // Right Front Wheel Connection 2
        this.scene.pushMatrix();
        this.floorTex.apply();
        this.scene.translate(-0.9, 0.4, 2);
        this.scene.rotate(Math.PI / 2, 0, 1, 0);
        this.wheelSuport.display();
        this.scene.popMatrix();

        // Right Front Wheel Connection 3
        this.scene.pushMatrix();
        this.floorTex.apply();
        this.scene.scale(1.22, 1.22, 1.22);
        this.scene.translate(-0.12, 0.35, 1.97);
        this.scene.rotate(-2 * Math.PI / 3, 0, 1, 0);
        this.scene.rotate(Math.PI / 90, 1, 0, 0);
        this.wheelSuport.display();
        this.scene.popMatrix();

        // Left Back Wheel Connection 1
        this.scene.pushMatrix();
        this.floorTex.apply();
        this.scene.scale(1.2, 1.2, 1.2);
        this.scene.translate(0.15, 0.43, -3.65);
        this.scene.rotate(Math.PI / 2.4, 0, 1, 0);
        this.scene.rotate(Math.PI / 20, 1, 0, 0);
        this.wheelSuport.display();
        this.scene.popMatrix();

        // Left Back Wheel Connection 2
        this.scene.pushMatrix();
        this.floorTex.apply();
        this.scene.translate(0.2, 0.4, -4.2);
        this.scene.rotate(Math.PI / 2, 0, 1, 0);
        this.wheelSuport.display();
        this.scene.popMatrix();

        // Left Back Wheel Connection 3
        this.scene.pushMatrix();
        this.floorTex.apply();
        this.scene.scale(1.22, 1.22, 1.22);
        this.scene.translate(0.12, 0.35, -3.11);
        this.scene.rotate(2 * Math.PI / 3, 0, 1, 0);
        this.scene.rotate(Math.PI / 90, 1, 0, 0);
        this.wheelSuport.display();
        this.scene.popMatrix();

        // Right Back Wheel Connection 1
        this.scene.pushMatrix();
        this.floorTex.apply();
        this.scene.scale(1.2, 1.2, 1.2);
        this.scene.translate(-0.15, 0.43, -3.65);
        this.scene.rotate(-Math.PI / 2.4, 0, 1, 0);
        this.scene.rotate(Math.PI / 20, 1, 0, 0);
        this.wheelSuport.display();
        this.scene.popMatrix();

        // Right Back Wheel Connection 2
        this.scene.pushMatrix();
        this.floorTex.apply();
        this.scene.translate(-0.9, 0.4, -4.2);
        this.scene.rotate(Math.PI / 2, 0, 1, 0);
        this.wheelSuport.display();
        this.scene.popMatrix();

        // Right Back Wheel Connection 3
        this.scene.pushMatrix();
        this.floorTex.apply();
        this.scene.scale(1.22, 1.22, 1.22);
        this.scene.translate(-0.12, 0.35, -3.11);
        this.scene.rotate(-2 * Math.PI / 3, 0, 1, 0);
        this.scene.rotate(Math.PI / 90, 1, 0, 0);
        this.wheelSuport.display();
        this.scene.popMatrix();

        // Floor
        this.scene.pushMatrix();
        this.floorTex.apply();
        this.scene.translate(-1.1, 0.05, -0.9);
        this.scene.rotate(-Math.PI / 2, 1, 0, 0);
        this.floor.display();
        this.scene.popMatrix();

        // Inside Floor
        this.scene.pushMatrix();
        this.floorTex.apply();
        this.scene.translate(-1.1, 0.05, -3.8);
        this.scene.rotate(Math.PI / 2, 1, 0, 0);
        this.floor.display();
        this.scene.popMatrix();

        // Front Wing Connection 
        this.scene.pushMatrix();
        this.wingTex.apply();
        this.scene.scale(1.5, 1, 1);
        this.scene.translate(0, 0.65, 0.17);
        this.scene.rotate(Math.PI / 26, 1, 0, 0);
        this.scene.rotate(Math.PI, 0, 0, 1);
        this.scene.rotate(Math.PI / 4, 0, 0, 1);
        this.frontConn.display();
        this.scene.popMatrix();

        // Front Wing Rectangle
        this.scene.pushMatrix();
        this.redTex.apply();
        this.scene.scale(0.75, 0.7, 0.75);
        this.scene.translate(-0.22, 0.3, 4.04);
        this.scene.rotate(Math.PI / 26, 1, 0, 0);
        this.fwrectangle.display();
        this.scene.popMatrix();

        //Right sideFrontWing
        this.scene.pushMatrix();
        this.sideWingTex.apply();
        this.scene.translate(-1.5, 0.20, 3.2);
        this.scene.scale(0.7, 0.25, 0.6);
        this.scene.rotate(-Math.PI / 2, 0, 1, 0);
        this.sideWing.display();
        this.scene.popMatrix();

        //Left sideFrontWing
        this.scene.pushMatrix();
        this.sideWingTex.apply();
        this.scene.translate(1.5, 0.20, 3.2);
        this.scene.scale(0.7, 0.25, 0.6);
        this.scene.rotate(Math.PI / 2, 0, 1, 0);
        this.sideWing.display();
        this.scene.popMatrix();

        //Inside Right sideFrontWing
        this.scene.pushMatrix();
        this.sideWingTex.apply();
        this.scene.translate(-1.5, 0.20, 3.2);
        this.scene.scale(0.7, 0.25, 0.6);
        this.scene.rotate(Math.PI / 2, 0, 1, 0);
        this.sideWing.display();
        this.scene.popMatrix();

        //Inside Left sideFrontWing
        this.scene.pushMatrix();
        this.sideWingTex.apply();
        this.scene.translate(1.5, 0.20, 3.2);
        this.scene.scale(0.7, 0.25, 0.6);
        this.scene.rotate(-Math.PI / 2, 0, 1, 0);
        this.sideWing.display();
        this.scene.popMatrix();

        //Frontwing
        this.scene.pushMatrix();
        this.frontwingTex.apply();
        this.scene.translate(0, 0.20, 3.2);
        this.scene.scale(3, 0, 0.5);
        this.scene.rotate(-Math.PI / 2, 1, 0, 0);
        this.wing.display();
        this.scene.popMatrix();

        //Inside Frontwing
        this.scene.pushMatrix();
        this.frontwingTex.apply();
        this.scene.translate(0, 0.20, 3.2);
        this.scene.scale(3, 0, 0.5);
        this.scene.rotate(Math.PI / 2, 1, 0, 0);
        this.wing.display();
        this.scene.popMatrix();

        // Body
        this.scene.pushMatrix();
        this.body2Tex.apply();
        this.scene.scale(1.5, 1, 1);
        this.scene.translate(0, 0.65, -0.5);
        this.scene.rotate(Math.PI / 4, 0, 0, 1);
        this.scene.rotate(Math.PI, 0, 0, 1);
        this.body2.display();
        this.scene.popMatrix();

        // Cockpit
        this.scene.pushMatrix();
        this.scene.scale(1.5, 1, 1);
        this.scene.translate(0, 0.65, -1.4);
        this.scene.rotate(Math.PI / 4, 0, 0, 1);
        this.body1.display();
        this.scene.popMatrix();

        // Base
        this.scene.pushMatrix();
        this.scene.scale(0.7, 1, 1.2);
        this.scene.translate(0, 0, -2);
        this.scene.rotate(-Math.PI / 6, 0, 1, 0);
        this.scene.rotate(-Math.PI / 2, 1, 0, 0);
        this.base.display();
        this.scene.popMatrix();

        this.scene.popMatrix();

    }

}