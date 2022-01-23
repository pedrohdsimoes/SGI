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
import {
	MyComponent
} from "../MyComponent.js";
import {
	MyInterface
} from "../MyInterface.js";

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
		this.theta = 0;
		this.gui = new MyInterface()

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
		this.previousLocation = new vec3.fromValues(0, 0, 0);
		this.locationFront = new vec3.fromValues(0, 0, 5);
		this.locationWing = new vec3.fromValues(0, 0, 10);
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
		this.powerupOn = false;
		this.demoVelocity = false;
		this.route = [];
		this.key = -1;

	}
	trackSelection(track2On) {
		if (track2On) this.track = "TestTrackMap.svg";
		if (!track2On) this.track = "TrackMap.svg";
	}
	placeCarOnStart(track2On, startOn) {
		//sgi
		if (track2On && startOn) {
			this.location = new vec3.fromValues(105.3, 0, 240.8);
			this.trackRotate = "sgi";
		}
		//abu dhabi
		if (!track2On && startOn) {
			//	this.location = new vec3.fromValues(314.20187344, 0, 331.29235412);
			this.location = new vec3.fromValues(215.7, 0, 230.3);
			this.trackRotate = "abu dhabi";

		}
	}

	display() {
		this.scene.pushMatrix();

		this.scene.translate(this.location[0], this.location[1], this.location[2]);

		this.scene.rotate(this.direction * Math.PI / 180, 0, 1, 0);

		this.scene.scale(this.scale, this.scale, this.scale);

		//car body
		this.scene.pushMatrix();
		this.carbody.display();
		this.scene.popMatrix();

		// FL Wheel
		this.scene.pushMatrix();
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
		this.scene.translate(0.65, 0, -2.8);
		this.scene.scale(0.2, 0.2, 0.2)
		this.scene.translate(1, 2, 10.5)
		this.scene.rotate(Math.PI / 2, 0, 1, 0);
		this.scene.rotate(-this.velocity * 3 * Math.PI, 0, 0, 1);
		this.wheel.display();
		this.scene.popMatrix();

		// RR Wheel
		this.scene.pushMatrix();
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
		//menu
		if (event.keyCode == 77) this.keyM = true;
		//reset
		if (event.keyCode == 82) this.keyR = true;
		//pause
		if (event.keyCode == 80 && !this.keyP) this.keyP = true;
		else if (event.keyCode == 80 && this.keyP) this.keyP = false;
		//esc
		if (event.keyCode == 27) this.esc = true;
	}
	processKeyUp(event) {
		//key is not being pushed
		if (event.keyCode == 87) this.keyForward = false;
		if (event.keyCode == 83) this.keyBackward = false;
		if (event.keyCode == 65) this.keyLeft = false;
		if (event.keyCode == 68) this.keyRight = false;
		//menu
		if (event.keyCode == 77) this.keyM = false;
		//reset
		if (event.keyCode == 82) this.keyR = false;
		//esc
		if (event.keyCode == 27) this.esc = false;
	}

	updateMovement(currTime) {
		if (this.velocity > 0.2) {
			this.previousLocation[0] = this.location[0];
			this.previousLocation[1] = this.location[1];
			this.previousLocation[2] = this.location[2];
		}

		this.previousDirection = this.direction;

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
				if (!this.demoVelocity) {
					if (Math.abs(this.steeringAngle) > 0.001) this.steeringAngle = this.steeringAngle * this.steeringAtriction;
					if (Math.abs(this.steeringAngle) < 0.001) this.steeringAngle = 0;
				}
			}
		}


		//forward
		if (this.keyForward && !this.keyBackward) {
			if (!this.keyP) this.velocity = this.velocity + this.velocityDelta;
			else this.velocity = 0;
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
				if (!this.demoVelocity)
					this.velocity = this.velocity * this.velocityAtriction;
				if (Math.abs(this.velocity) < 0.001) this.velocity = 0;
			}
		}

		// direction
		if (!this.demoVelocity)
			if (Math.abs(this.velocity) > 0)
				this.direction += this.steeringAngle;

		// vehicle location 
		this.location[0] += (Math.sin(this.direction * Math.PI / 180) * this.velocity);
		this.location[1] = 0;
		this.location[2] += (Math.cos(this.direction * Math.PI / 180) * this.velocity);
		if (this.velocity >= 0) {
			this.locationFront[0] = this.location[0] + 14 * Math.sin(this.direction * Math.PI / 180);
			this.locationFront[1] = 1;
			this.locationFront[2] = this.location[2] + 14 * Math.cos(this.direction * Math.PI / 180);
		} else {
			this.locationFront[0] = this.location[0] + -3.5 * Math.sin(this.direction * Math.PI / 180);
			this.locationFront[1] = 2;
			this.locationFront[2] = this.location[2] + -3.5 * Math.cos(this.direction * Math.PI / 180);
		}
		//Car telemetry
		console.log("velocidade = " + this.velocity + " steering = " + this.steeringAngle + " deg, direction = " + this.direction + " deg, location ( " + this.location[0].toFixed(4) + "," + this.location[2].toFixed(4) + " )");
		// Track detection
		if (this.track == "TrackMap.svg") this.simpleImage = "SimpleImage/trackMap.png";
		if (this.track == "TestTrackMap.svg") this.simpleImage = "SimpleImage/testTrackMap.png";

		this.map = new SimpleImage(this.simpleImage, this.location);
		this.color = this.map.onload();

		this.velocityMax = this.velocityMaxAux - (this.color / 100);
		if (this.color == 255) this.velocityMax = 1.45;

		return this.location;
	}

	updateDemo(t) {
		this.prevDirection = this.direction

		console.log("DEMO POINTS " + this.route[this.key])
		var vecDirection;

		this.key = (this.key + 1) % (this.route.length);
		console.log("KEY " + this.key)

		// update direction
		if (this.key == this.route.length - 1) {
			vecDirection = this.subVector(this.route[this.key], this.route[0]);
			this.direction = Math.atan2(vecDirection[1], vecDirection[0]) * 180 / Math.PI;
		} else if (this.route[0] != null) {
			vecDirection = this.subVector(this.route[this.key], this.route[this.key + 1]);
			console.log("VEC DIR " + vecDirection)
			this.direction = Math.atan2(vecDirection[1], vecDirection[0]) * 180 / Math.PI;
		}

		// update velocity
		if (this.key == this.route.length - 1) {
			this.velocity = this.distanceVector(this.route[this.key], this.route[0]) / 10;
		} else {
			this.velocity = this.distanceVector(this.route[this.key], this.route[this.key + 1]) / 10;
		}
		// //wheels turning
		if (this.velocity < 4) {
			if (this.direction > this.prevDirection) this.steeringAngle = 1 / this.velocity * 7
			if (this.direction < this.prevDirection) this.steeringAngle = -1 / this.velocity * 7
		}

		this.location[0] += (Math.sin(this.direction * Math.PI / 180) * this.velocity);
		this.location[1] = 0;
		this.location[2] += (Math.cos(this.direction * Math.PI / 180) * this.velocity);

	}

	subVector(vec1, vec2) {
		return [vec2[1] - vec1[1], vec2[0] - vec1[0]];
	}

	distanceVector(vec1, vec2) {
		return Math.sqrt(Math.pow((vec2[0] - vec1[0]), 2) + Math.pow((vec2[1] - vec1[1]), 2));
	}



	// Difficulty F2

	// Car stops when you stop pressing "W" (no attriction)
	f2_obstacle_effect1() {
		this.obstacleOn = true;
		this.velocityAtriction = 0.1;
		setTimeout(() => this.velocityAtriction = 0.9, 15000);
		console.log("F2 - OBS1");
	}
	//car gets bigger
	f2_obstacle_effect2() {
		this.obstacleOn = true;
		this.scale = 2.3;
		setTimeout(() => this.scale = 1.5, 10000);
		console.log("F2 - OBS2");
	}
	// Car is faster
	f2_powerup_effect1() {
		this.powerupOn = true;
		this.velocityMaxAux = 8;
		setTimeout(() => this.velocityMaxAux = 4.0, 10000);
		console.log("F2 - PU1");
	}
	//Car gets smaller
	f2_powerup_effect2() {
		this.powerupOn = true;
		this.scale = 1.2;
		setTimeout(() => this.scale = 1.5, 10000);
		console.log("F2 - PU2");
	}

	// Difficulty F1

	// Car turns more uncontrollably 
	f1_obstacle_effect1() {
		this.obstacleOn = true;
		this.steeringDelta = 7.5;
		setTimeout(() => this.steeringDelta = 1, 15000);
		console.log("F1 - OBS1");
	}

	//car is even faster
	f1_powerup_effect1() {
		this.powerupOn = true;
		this.velocityMaxAux = 14;
		setTimeout(() => this.velocityMaxAux = 4.0, 15000);
		console.log("F1 - PU1");
	}



}