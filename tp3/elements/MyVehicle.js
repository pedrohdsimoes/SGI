import {
	CGFobject,
	CGFnurbsObject,
	CGFnurbsSurface
} from "../../lib/CGF.js";
import {
	SimpleImage
} from "../SimpleImage/SimpleImage.js";
import {
	MySceneGraph
} from "../MySceneGraph.js";

import {
	MyWheel
} from "./MyWheel.js";
import {
	VehicleBody
} from "./VehicleBody.js";

/**
 * 
 * @constructor
 * @param {MySceneGraph} scene - Reference to MyScene object
 */

export class MyVehicle extends CGFobject {
	constructor(scene) {
		super(scene);

		this.scene = scene;
		this.track = "TrackMap.svg";


		// this.carbody = scene.displayComponent('carbody', null ,null , 1, 1);
		// this.car = new MyCylinder(scene, "carss", 1, 0.5, 0.5, 50, 1);
		this.simpleImage = "";
		this.carbody = new VehicleBody(scene);
		this.wheel = new MyWheel(scene);
		this.keyForward = false;
		this.keyBackward = false;
		this.keyLeft = false;
		this.keyRight = false;
		this.location = new vec3.fromValues(0, 0, 0);
		//if(this.track=="TrackMap.svg")this.location = new vec3.fromValues(221.7,0,259.6);
		this.velocity = 0;
		this.velocityAtriction = 0.9;
		this.velocityDelta = 0.2;
		this.velocityMax = 4;
		this.velocityMaxAux = this.velocityMax;
		this.direction = 0;
		this.steeringAngle = 0;
		this.steeringDelta = 1;
		this.steeringAngleMax = 15;
		this.steeringAtriction = 0.8;
		this.scale = 1.5;

	}
	trackSelection(track2On) {
		if (track2On) this.track = "TestTrackMap.svg";
		if (!track2On) this.track = "TrackMap.svg";
	}

	display() {
		this.scene.pushMatrix();

		this.scene.translate(this.location[0], this.location[1], this.location[2]);

		this.scene.rotate(this.direction * Math.PI / 180, 0, 1, 0);

		this.scene.scale(this.scale, this.scale, this.scale);

		if (this.track == "TestTrackMap.svg") {


		}
		if (this.track == "TrackMap.svg") {



		}
		//car body
		this.scene.pushMatrix();
		// this.scene.scale(this.scale, this.scale, this.scale);
		this.carbody.display();
		this.scene.popMatrix();

		// FL Wheel
		this.scene.pushMatrix();
		//this.scene.scale(1.5, 1.5, 1.5);
		this.scene.translate(0.65, 0, 2);
		this.scene.scale(0.2, 0.2, 0.2)
		this.scene.translate(1, 2, 17.5);
		this.scene.rotate(Math.PI / 2, 0, 1, 0);
		this.scene.rotate(this.steeringAngle * 1.2 * Math.PI / 110, 0, 1, 0);
		this.scene.rotate(-this.velocity * 3 * Math.PI, 0, 0, 1);
		this.wheel.display();
		this.scene.popMatrix();

		// FR Wheel
		this.scene.pushMatrix();
		//this.scene.scale(1.5, 1.5, 1.5);
		this.scene.translate(-0.65, 0, 2);
		this.scene.scale(0.2, 0.2, 0.2)
		this.scene.translate(-1, 2, 17.5)
		this.scene.rotate(-Math.PI / 2, 0, 1, 0);
		this.scene.rotate(this.steeringAngle * 1.2 * Math.PI / 110, 0, 1, 0);
		this.scene.rotate(this.velocity * 3 * Math.PI, 0, 0, 1);
		this.wheel.display();
		this.scene.popMatrix();

		// RL Wheel
		this.scene.pushMatrix();
		//this.scene.scale(1.5, 1.5, 1.5);
		this.scene.translate(0.65, 0, -2.8);
		this.scene.scale(0.2, 0.2, 0.2)
		this.scene.translate(1, 2, 10.5)
		this.scene.rotate(Math.PI / 2, 0, 1, 0);
		this.scene.rotate(-this.velocity * 3 * Math.PI, 0, 0, 1);
		this.wheel.display();
		this.scene.popMatrix();

		// RR Wheel
		this.scene.pushMatrix();
		// this.scene.scale(1.5, 1.5, 1.5);
		this.scene.translate(-0.65, 0, -2.8);
		this.scene.scale(0.2, 0.2, 0.2)
		this.scene.translate(-1, 2, 10.5)
		this.scene.rotate(-Math.PI / 2, 0, 1, 0);
		this.scene.rotate(this.velocity * 3 * Math.PI, 0, 0, 1);
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
		var direction = 0;
		// right turn
		if (this.keyRight && !this.keyLeft) {
			if (this.steeringAngle > -this.steeringAngleMax) this.steeringAngle -= this.steeringDelta;
		} else
			// left turn
			if (this.keyLeft && !this.keyRight) {
				if (this.steeringAngle < this.steeringAngleMax) this.steeringAngle += this.steeringDelta;
			}

		else {
			//wheels going back to place when keys aren´t being pressed
			if (!this.keyLeft && !this.keyRight) {
				if (Math.abs(this.steeringAngle) > 0.001) this.steeringAngle = this.steeringAngle * this.steeringAtriction;
				if (Math.abs(this.steeringAngle) < 0.001) this.steeringAngle = 0;
			}
		}


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
		if (Math.abs(this.velocity) > 0) this.direction += this.steeringAngle;

		// compute vehicle location based on current location, direction and velocity
		this.location[0] += (Math.sin(this.direction * Math.PI / 180) * this.velocity);
		this.location[1] = 0;
		this.location[2] += (Math.cos(this.direction * Math.PI / 180) * this.velocity);

		//Car telemetry
		console.log("velocidade = " + this.velocity + " steering = " + this.steeringAngle + " deg, direction = " + this.direction + " deg, location ( " + this.location + ")");
		// Track detection
		if (this.track == "TrackMap.svg") this.simpleImage = "SimpleImage/trackMap.png";
		if (this.track == "TestTrackMap.svg") this.simpleImage = "SimpleImage/testTrackMap.png";

		this.map = new SimpleImage(this.simpleImage, this.location);
		this.color = this.map.onload();

		this.velocityMax = this.velocityMaxAux - (this.color / 100);
		if (this.color == 255) this.velocityMax = 1.45;

		return this.location;
	}
	//Difficulty F2
	//Car turns more uncontrollably 
	f2_obstacle_effect1() {
		this.steeringDelta = 7.5;
		setTimeout(() => this.steeringDelta = 1, 10000);
		console.log("F2 - OBS1");
	}
	f2_obstacle_effect2() {
		this.scale = 4;
		setTimeout(() => this.scale = 1.5, 10000);
		console.log("F2 - OBS2");
	}
	//car is faster
	f2_powerup_effect1() {
		this.velocityMaxAux = 8;
		setTimeout(() => this.velocityMaxAux = 4.0, 10000);
		console.log("F2 - PU1");
	}
	f2_powerup_effect2() {
		//
		console.log("F2 - PU2");
	}
	//Difficulty F1
	f1_obstacle_effect1() {

		console.log("F1 - OBS1");
	}
	f1_obstacle_effect2() {
		this.scale = 7;
		setTimeout(() => this.scale = 1.5, 10000);
		console.log("F1 - OBS2");
	}
	//car is faster
	f1_powerup_effect1() {
		this.velocityMaxAux = 14;
		setTimeout(() => this.velocityMaxAux = 4.0, 15000);
		console.log("F1 - PU1");
	}
	f1_powerup_effect2() {

		console.log("F1 - PU2");
	}


}