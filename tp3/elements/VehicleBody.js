import {
    CGFobject,
    CGFappearance,
    CGFnurbsObject,
    CGFnurbsSurface
} from "../../lib/CGF.js";
import {
    MyCylinder
} from "../primitives/MyCylinder.js";
import {
    MyPlane
} from "../primitives/MyPlane.js";
import {
    MyRectangle
} from "../primitives/MyRectangle.js";
import {
    MySphere
} from "../primitives/MySphere.js";
import {
    MyPatch
} from "../primitives/MyPatch.js";
import {
    MyTriangle
} from "../primitives/MyTriangle.js";



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

        this.surfaceRTex = new CGFappearance(this.scene);
        this.surfaceRTex.setAmbient(1, 1, 1, 1);
        this.surfaceRTex.setDiffuse(1, 1, 1, 1);
        this.surfaceRTex.setSpecular(1, 1, 1, 1);
        this.surfaceRTex.setShininess(100.0);
        this.surfaceRTex.loadTexture('scenes/images/surfaceR.png');
        this.surfaceRTex.setTextureWrap('REPEAT', 'REPEAT');

        this.surfaceLTex = new CGFappearance(this.scene);
        this.surfaceLTex.setAmbient(1, 1, 1, 1);
        this.surfaceLTex.setDiffuse(1, 1, 1, 1);
        this.surfaceLTex.setSpecular(1, 1, 1, 1);
        this.surfaceLTex.setShininess(100.0);
        this.surfaceLTex.loadTexture('scenes/images/surfaceL.png');
        this.surfaceLTex.setTextureWrap('REPEAT', 'REPEAT');


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

        this.rearwingFrontTex = new CGFappearance(this.scene);
        this.rearwingFrontTex.setAmbient(1, 1, 1, 1);
        this.rearwingFrontTex.setDiffuse(1, 1, 1, 1);
        this.rearwingFrontTex.setSpecular(1, 1, 1, 1);
        this.rearwingFrontTex.setShininess(100.0);
        this.rearwingFrontTex.loadTexture('scenes/images/rwFront.png');
        this.rearwingFrontTex.setTextureWrap('REPEAT', 'REPEAT');

        this.rearwingBackTex = new CGFappearance(this.scene);
        this.rearwingBackTex.setAmbient(1, 1, 1, 1);
        this.rearwingBackTex.setDiffuse(1, 1, 1, 1);
        this.rearwingBackTex.setSpecular(1, 1, 1, 1);
        this.rearwingBackTex.setShininess(100.0);
        this.rearwingBackTex.loadTexture('scenes/images/rwBack.png');
        this.rearwingBackTex.setTextureWrap('REPEAT', 'REPEAT');

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


        this.body1 = new MyCylinder(scene, "cockpit", 0.9, 0.5, 0.5, 4, 1);
        this.body2 = new MyCylinder(scene, "front_body", 0.7, 0.25, 0.5, 4, 1);
        this.frontConn = new MyCylinder(scene, "FrontWingConnection", 2.9, 0.15, 0.25, 4, 1)
        this.wing = new MyPlane(scene, "wing", 50, 50);
        this.sideWing = new MyPlane(scene, "sideWing", 50, 50);
        this.floor = new MyRectangle(scene, "floor", 0, 2.2, 0, 2.85);
        this.fwrectangle = new MyRectangle(scene, "frontwingRect", 0, 0.43, 0, 0.29);
        this.wheelSuport = new MyCylinder(scene, "suport", 0.7, 0.045, 0.045, 70, 4);
        this.base = new MyCylinder(scene, "base", 0.6, 1.5, 2, 3, 70);
        this.helmet = new MySphere(scene, "helmet", 0.3, 40, 50);
        this.body2rect = new MyRectangle(scene, "b2rect", 0, 1.06, 0, 0.715);


        let controlpoints = [
            [0, 0, -0.133],
            [0, 1, -0.133],
            [0.5, 0, -0.222],
            [0.5, 1, -0.222],
            [1, 0, 0.333],
            [1, 1, 0.333],
        ]

        let controlpoints1 = [
            [0, 0, -0],
            [0, 2.5, -0],
            [0.5, 0, -0.222],
            [0.5, 2.5, -0.222],
            [1, 0, 0.82],
            [1, 2.5, 0.82],
        ]

        this.rearwingFront = new MyPatch(scene, "rearwingFront", 3, 2, 10, 10, controlpoints);
        this.rearwingBack = new MyRectangle(scene, "rearwingBack", 0, 1.6, 0, 0.7);
        this.rectRW = new MyCylinder(scene, "sideRW", 0.6, 0.2, 0.2, 2, 1);
        this.supportRW = new MyTriangle(scene, "supportRW", 0, 0, 0, 0.99, 0.25, 0, 0.65, 0.5, 0);
        this.supportRW1 = new MyTriangle(scene, "supportRW", 0.0, 0, 0, 1, 0, 0, 0.35, 0.5, 0);
        this.topbase = new MyTriangle(scene, "topbase", 0, 0, 0, 1.83, 0, 0, 0.915, 2.7, 0);
        this.surface = new MyPatch(scene, "surface", 3, 2, 10, 10, controlpoints1);
    }

    display() {
        this.scene.pushMatrix();
        this.scene.translate(0, 0, 3.5);


        // Left Surface
        this.scene.pushMatrix();
        this.surfaceLTex.apply();
        // this.scene.translate(0, 4, 0);
        this.scene.translate(0.044, 1.65, -1.4);
        this.scene.rotate(Math.PI / 2, 0, 1, 0);
        this.scene.rotate(-Math.PI / 2, 0, 0, 1);
        this.surface.display();
        this.scene.popMatrix();

        // Right Surface
        this.scene.pushMatrix();
        this.surfaceRTex.apply();
        // this.scene.translate(0, 4, 0);
        this.scene.translate(-0.044, 1.65, -3.9);
        this.scene.rotate(-Math.PI / 2, 0, 1, 0);
        this.scene.rotate(-Math.PI / 2, 0, 0, 1);
        this.surface.display();
        this.scene.popMatrix();


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
        this.supportRW1.display();
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
        this.supportRW1.display();
        this.scene.popMatrix();

        // Left side rect Rear Wing
        this.scene.pushMatrix();
        this.floorTex.apply();
        this.scene.scale(1, 1, 1);
        this.scene.translate(0.6, 0.8, -4.6);
        this.scene.rotate(Math.PI / 4, 1, 0, 0);
        this.rectRW.display();
        this.scene.popMatrix();

        // Right side rect Rear Wing
        this.scene.pushMatrix();
        this.floorTex.apply();
        this.scene.scale(1, 1, 1);
        this.scene.translate(-0.6, 0.8, -4.6);
        this.scene.rotate(Math.PI / 4, 1, 0, 0);
        this.rectRW.display();
        this.scene.popMatrix();

        // Front Rear Wing
        this.scene.pushMatrix();
        this.rearwingFrontTex.apply();
        this.scene.translate(-0.8, 1.76, -4.45);
        this.scene.rotate(-Math.PI / 2, 0, 0, 1);
        this.scene.scale(0.6, 1.6, 1);
        this.rearwingFront.display();
        this.scene.popMatrix();

        // Back Rear Wing
        this.scene.pushMatrix();
        this.rearwingBackTex.apply();
        this.scene.translate(0.8, 1.05, -4.6);
        this.scene.rotate(Math.PI, 0, 1, 0);
        this.rearwingBack.display();
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

        // Body 2
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
        this.redTex.apply();
        this.scene.scale(1.5, 1, 1);
        this.scene.translate(0, 0.65, -1.4);
        this.scene.rotate(Math.PI / 4, 0, 0, 1);
        this.body1.display();
        this.scene.popMatrix();

        // Rect Cockpit
        this.scene.pushMatrix();
        this.redTex.apply();
        this.scene.translate(0.53, 0.29, -1.4);
        this.scene.rotate(Math.PI, 0, 1, 0);
        // this.scene.rotate(-Math.PI / 2, 0, 0, 1);
        this.body2rect.display();
        this.scene.popMatrix();

        // Top Base
        this.scene.pushMatrix();
        this.body2Tex.apply();
        this.scene.translate(-0.915, 0.65, -1.5);
        this.scene.rotate(-Math.PI / 2, 1, 0, 0);
        this.topbase.display();
        this.scene.popMatrix();

        // Base
        this.scene.pushMatrix();
        this.scene.scale(0.7, 1, 1.2);
        this.scene.translate(0, 0.05, -2);
        this.scene.rotate(-Math.PI / 6, 0, 1, 0);
        this.scene.rotate(-Math.PI / 2, 1, 0, 0);
        this.base.display();
        this.scene.popMatrix();

        this.scene.popMatrix();

    }

}