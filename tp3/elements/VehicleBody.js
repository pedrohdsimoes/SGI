import { CGFobject, CGFappearance, CGFnurbsObject, CGFnurbsSurface } from "../../lib/CGF.js";
import { MyCylinder } from "../primitives/MyCylinder.js";
import { MyPlane } from "../primitives/MyPlane.js";
import { MyRectangle } from "../primitives/MyRectangle.js";
import { MySphere} from "../primitives/MySphere.js";



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

        this.frontwingTex = new CGFappearance(this.scene);
        this.frontwingTex.setAmbient(1, 1, 1, 1);
        this.frontwingTex.setDiffuse(1, 1, 1, 1);
        this.frontwingTex.setSpecular(1, 1, 1, 1);
        this.frontwingTex.setShininess(100.0);
        this.frontwingTex.loadTexture('scenes/images/frontwingSponsor.jpeg');
        this.frontwingTex.setTextureWrap('REPEAT', 'REPEAT');

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
        this.helmetTex.setAmbient(1, 1, 1, 1);
        this.helmetTex.setDiffuse(1, 1, 1, 1);
        this.helmetTex.setSpecular(1, 1, 1, 1);
        this.helmetTex.setShininess(100.0);
        this.helmetTex.loadTexture('scenes/images/helmet.png');
        this.helmetTex.setTextureWrap('REPEAT', 'REPEAT');


        this.body1 = new MyCylinder(scene, "back_body", 0.9, 0.5, 0.5, 4, 1);
        this.body2 = new MyCylinder(scene, "front_body", 0.7, 0.25, 0.5, 4, 1);
        this.frontConn = new MyCylinder(scene, "FrontWingConnection", 2.9, 0.15, 0.25, 4, 1)
        this.wing = new MyPlane(scene, "wing", 50, 50);
        this.sideWing = new MyPlane(scene, "sideWing", 50, 50);
        this.floor = new MyRectangle(scene, "floor", 0, 2.2, 0, 2.85);
        this.wheelSuport = new MyCylinder(scene, "suport", 0.7, 0.045, 0.045, 70, 4);
        this.base = new MyCylinder(scene, "base", 1.1, 1.5, 2, 3, 70);
        this.helmet = new MySphere(scene,"helmet",0.3,40,50);

    }

    display() {
        this.scene.pushMatrix();

        // Helmet
        this.scene.pushMatrix();
        // this.helmetTex.apply();
        this.scene.translate(0,5,0);
        this.scene.scale(1,1,1.1);
        this.helmet.display();
        this.scene.popMatrix();

        // Left Wheel Connection 1
        this.scene.pushMatrix();
        this.floorTex.apply();
        this.scene.scale(1.2, 1.2, 1.2);
        this.scene.translate(0.15, 0.43, 1.38);
        this.scene.rotate(Math.PI / 2.86, 0, 1, 0);
        this.scene.rotate(Math.PI / 20, 1, 0, 0);
        this.wheelSuport.display();
        this.scene.popMatrix();

        // Left Wheel Connection 2
        this.scene.pushMatrix();
        this.floorTex.apply();
        this.scene.translate(0.2, 0.4, 2);
        this.scene.rotate(Math.PI / 2, 0, 1, 0);
        this.wheelSuport.display();
        this.scene.popMatrix();

        // Left Wheel Connection 3
        this.scene.pushMatrix();
        this.floorTex.apply();
        this.scene.scale(1.22, 1.22, 1.22);
        this.scene.translate(0.12, 0.35, 1.97);
        this.scene.rotate(2* Math.PI / 3, 0, 1, 0);
        this.scene.rotate(Math.PI / 90, 1, 0, 0);
        this.wheelSuport.display();
        this.scene.popMatrix();

        // Right Wheel Connection 1
        this.scene.pushMatrix();
        this.floorTex.apply();
        this.scene.scale(1.2, 1.2, 1.2);
        this.scene.translate(-0.15, 0.43, 1.38);
        this.scene.rotate(-Math.PI / 2.86, 0, 1, 0);
        this.scene.rotate(Math.PI / 20, 1, 0, 0);
        this.wheelSuport.display();
        this.scene.popMatrix();

        // Right Wheel Connection 2
        this.scene.pushMatrix();
        this.floorTex.apply();
        this.scene.translate(-0.9, 0.4, 2);
        this.scene.rotate(Math.PI / 2, 0, 1, 0);
        this.wheelSuport.display();
        this.scene.popMatrix();

        // Right Wheel Connection 3
        this.scene.pushMatrix();
        this.floorTex.apply();
        this.scene.scale(1.22, 1.22, 1.22);
        this.scene.translate(-0.12, 0.35, 1.97);
        this.scene.rotate(-2 * Math.PI / 3, 0, 1, 0);
        this.scene.rotate(Math.PI / 90, 1, 0, 0);
        this.wheelSuport.display();
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

        //Right sideFrontWing
        this.scene.pushMatrix();
        this.sideWingTex.apply();
        this.scene.translate(-1.5, 0.20, 3.2);
        this.scene.scale(0.7, 0.25, 0.6);
        this.scene.rotate(-Math.PI / 2, 0, 1,0);
        this.sideWing.display();
        this.scene.popMatrix();

        //Left sideFrontWing
        this.scene.pushMatrix();
        this.sideWingTex.apply();
        this.scene.translate(1.5, 0.20, 3.2);
        this.scene.scale(0.7, 0.25, 0.6);
        this.scene.rotate(Math.PI / 2, 0, 1,0);
        this.sideWing.display();
        this.scene.popMatrix();

        //Inside Right sideFrontWing
        this.scene.pushMatrix();
        this.sideWingTex.apply();
        this.scene.translate(-1.5, 0.20, 3.2);
        this.scene.scale(0.7, 0.25, 0.6);
        this.scene.rotate(Math.PI / 2, 0, 1,0);
        this.sideWing.display();
        this.scene.popMatrix();

        //Inside Left sideFrontWing
        this.scene.pushMatrix();
        this.sideWingTex.apply();
        this.scene.translate(1.5, 0.20, 3.2);
        this.scene.scale(0.7, 0.25, 0.6);
        this.scene.rotate(-Math.PI / 2, 0, 1,0);
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
        this.scene.scale(0.7,1,1.2);
        this.scene.translate(0,0, -2);
        this.scene.rotate(-Math.PI / 6, 0, 1, 0);
        this.scene.rotate(-Math.PI / 2, 1, 0, 0);
        this.base.display();
        this.scene.popMatrix();
        
        this.scene.popMatrix();

    }

}