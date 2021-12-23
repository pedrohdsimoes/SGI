import { CGFobject, CGFnurbsObject, CGFnurbsSurface } from "../../lib/CGF.js";
import { MySceneGraph } from "../MySceneGraph.js";
import { MyCylinder } from "../primitives/MyCylinder.js";
import { MyStartLine } from "./MyStartLine.js";
import { MyWheel } from "./MyWheel.js";
import { VehicleBody } from "./VehicleBody.js";

/**
 * 
 * @constructor
 * @param {MySceneGraph} scene - Reference to MyScene object
 */

export class MyVehicle extends CGFobject {
    constructor(scene) {
        super(scene);

        this.scene = scene;

        // this.carbody = scene.displayComponent('carbody', null ,null , 1, 1);
        // this.car = new MyCylinder(scene, "carss", 1, 0.5, 0.5, 50, 1);

        this.carbody = new VehicleBody(scene);
        this.wheel = new MyWheel(scene);
        this.test = new MyStartLine(scene);
        this.keyForward = false;
        this.keyBackward = false;
        this.keyLeft = false;
        this.keyRight = false;

        this.location = new vec3.fromValues(0, 0, 0);
        this.velocity = 0;
        this.velocityAtriction = 0.9;
        this.velocityDelta = 0.2;
        this.velocityMax = 2;
        this.direction = 0;
        this.lastDirection = 0;
        this.steeringAngle = 0;
        this.steeringDelta = 1;
        this.steeringAngleMax = 15;
        this.steeringAtriction = 0.8;
    }

    display() {
        this.scene.pushMatrix();

        this.scene.translate(this.location[0], this.location[1], this.location[2]);

        this.scene.rotate(this.direction * Math.PI / 180, 0, 1, 0);

        //car body
        this.scene.pushMatrix();
        this.carbody.display();
        this.scene.popMatrix();

        // FL Wheel
        this.scene.pushMatrix();
        this.scene.rotate(this.steeringAngle * Math.PI / 180, 0, 1, 0);
        this.scene.translate(0.65,0,2);
        this.scene.scale(0.2, 0.2, 0.2)
        this.scene.translate(1, 0, 0)
        this.scene.rotate(Math.PI / 2, 0, 1, 0);
        this.wheel.display();
        this.scene.popMatrix();

        // FR Wheel
        this.scene.pushMatrix();
        this.scene.rotate(this.steeringAngle * Math.PI / 180, 0, 1, 0);
        this.scene.translate(-0.65,0,2);
        this.scene.scale(0.2, 0.2, 0.2)
        this.scene.translate(-1, 0, 0)
        this.scene.rotate(-Math.PI / 2, 0, 1, 0);
        this.wheel.display();
        this.scene.popMatrix();

        // RL Wheel
        this.scene.pushMatrix();
        this.scene.translate(0.65,0,-2.8);
        this.scene.scale(0.2, 0.2, 0.2)
        this.scene.translate(1, 0, -7)
        this.scene.rotate(Math.PI / 2, 0, 1, 0);
        this.wheel.display();
        this.scene.popMatrix();

        // RR Wheel
        this.scene.pushMatrix();
        this.scene.translate(-0.65,0,-2.8);
        this.scene.scale(0.2, 0.2, 0.2)
        this.scene.translate(-1, 0, -7)
        this.scene.rotate(-Math.PI / 2, 0, 1, 0);
        this.wheel.display();
        this.scene.popMatrix();

        this.scene.popMatrix();
    }


    processKeyDown(event) {
        //key is being pushed
        if (event.keyCode == 87) this.keyForward = true;
        if (event.keyCode == 83) this.keyBackward = true;
        if (event.keyCode == 65) this.keyLeft = true;
        if (event.keyCode == 68) this.keyRight = true;
    }
    processKeyUp(event) {
        //key is not being pushed
        if (event.keyCode == 87) this.keyForward = false;
        if (event.keyCode == 83) this.keyBackward = false;
        if (event.keyCode == 65) this.keyLeft = false;
        if (event.keyCode == 68) this.keyRight = false;
    }

    updateMovement(currTime) {
        // right turn
        if (this.keyRight && !this.keyLeft) {
            if (this.steeringAngle < this.steeringAngleMax) this.steeringAngle += this.steeringDelta;
        } else
            // left turn
            if (this.keyLeft && !this.keyRight) {
                if (this.steeringAngle > -this.steeringAngleMax) this.steeringAngle -= this.steeringDelta;
            }

            else {
                //wheels going back to place when keys aren´t being pressed
                if (!this.keyLeft && !this.keyRight) {
                    if (Math.abs(this.steeringAngle) > 0.001) this.steeringAngle = this.steeringAngle * this.steeringAtriction;
                    if (Math.abs(this.steeringAngle) < 0.001) this.steeringAngle = 0;
                }
            }

        var direction = 0;
        //forward
        if (this.keyForward && !this.keyBackward) {
            this.velocity = this.velocity + this.velocityDelta;
            if (this.velocity > this.velocityMax) this.velocity = this.velocityMax;
            direction = 1;
        } else
            //backward
            if (!this.keyForward && this.keyBackward) {
                this.velocity = this.velocity - this.velocityDelta;
                if (this.velocity < -this.velocityMax) this.velocity = -this.velocityMax;
                direction = -1;
            }

        //not going forward or backward
        if (!this.keyForward && !this.keyBackward) {
            if (Math.abs(this.velocity) > 0) {
                this.velocity = this.velocity * this.velocityAtriction;
                if (Math.abs(this.velocity) < 0.001) this.velocity = 0;
            }
        }

        // compute direction
        this.direction += this.steeringAngle;

        //compute and manage direction delta
        var deltaDirection = this.direction - this.lastDirection;
        this.lastDirection = this.direction;

        // compute vehicle location based on current location, direction and velocity
        this.location[0] += (Math.sin(this.direction) * this.velocity);
        this.location[1] = 0;
        this.location[2] += (Math.cos(this.direction) * this.velocity);

        //log
        console.log("velocidade = " + this.velocity + " steering = " + this.steeringAngle + " deg, direction = " + this.direction + " deg, location ( " + this.location + ")");
    }
}