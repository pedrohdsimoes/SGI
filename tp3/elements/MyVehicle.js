import { CGFobject, CGFnurbsObject, CGFnurbsSurface } from "../../lib/CGF.js";
/**
 * MyPatch
 * @constructor
 * @param scene - Reference to MyScene object
 * @param npointsU - number of points of the patch on U domain
 * @param npointsV - number of points of the patch on V domain
 * @param npartsU - number of parts of the patch on U domain
 * @param npartsV - number of parts of the patch on V domain
 * @param controlPoints - control points
 */

export class MyVehicle extends CGFobject {
    constructor(scene) {
        super(scene);

        this.keyForward = false;
        this.keyBackward = false;
        this.keyLeft = false;
        this.keyRight = false;

        this.location = new vec3.fromValues(0, 0, 0);
        this.direction = 0;
        this.lastDirection = 0;

        this.steeringAngleMax = 15;

        this.initBuffers();
    }

    initBuffers() {


    }

    display() {

    }

    updateTexCoords(s, t) {
    }
    processKeyDown(event) {
        //key is being pushed
        if (event.keyCode == 38) this.keyForward = true;
        if (event.keyCode == 40) this.keyBackward = true;
        if (event.keyCode == 39) this.keyLeft = true;
        if (event.keyCode == 37) this.keyRight = true;
    }
    processKeyUp(event) {
        //key is not being pushed
        if (event.keyCode == 38) this.keyForward = false;
        if (event.keyCode == 40) this.keyBackward = false;
        if (event.keyCode == 39) this.keyLeft = false;
        if (event.keyCode == 37) this.keyRight = false;
    }

    update(currTime) {
        // right turn
        if (this.keyRight && !this.keyLeft) {
            if (this.steeringAngle < this.steeringAngleMax) this.steeringAngle += this.steeringDelta;
        }
        else
            // left turn
            if (this.keyLeft && !this.keyRight) {
                if (this.steeringAngle > -this.steeringAngleMax) this.steeringAngle -= this.steeringDelta;
            }

            else {
                //wheels going back to place when keys aren´t being pressed
                if (!this.keyLeft && !this.keyRight) {
                    if (Math.abs(this.steeringAngle) > 0.005) this.steeringAngle = this.steeringAngle * 0.7;
                    else this.steeringAngle = 0;
                }
            }

        var direction = 0;
        //forward
        if (this.keyForward && !this.keyBackward) {
            this.velocity = this.velocity + this.velocityDelta;
            if (this.velocity > 1) this.velocity = 1;
            direction = 1;
        }
        else
            //backward
            if (!this.keyForward && this.keyBackward) {
                this.velocity = this.velocity - this.velocityDelta;
                if (this.velocity < -1) this.velocity = -1;
                direction = -1;
            }

        //not going forward or backward
        if (direction == 0) {
            if (Math.abs(this.velocity) > 0) {
                this.velocity = this.velocity * this.velocityAtriction;
                if (Math.abs(this.velocity) < 0.005) this.velocity = 0;
            }
        }

        // compute direction
        this.direction += this.steeringAngle;

        //compute and manage direction delta
        var deltaDirection = this.direction - this.lastDirection;
        this.lastDirection = this.direction;

        // compute vehicle location based on crrent location, direction and velocity
        this.location[0] += (Math.sin(this.direction) * this.velocity);
        this.location[1] = 0;
        this.location[2] += (Math.cos(this.direction) * this.velocity);

        //log
        console.log("velocidade = " + this.velocity + " steering = " + this.steeringAngle + " deg, direction = " + this.direction + " deg, location ( " + this.location + ")");
    }
}
