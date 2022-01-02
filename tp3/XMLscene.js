import {
	CGFscene,
	CGFaxis,
	CGFcamera,
	CGFplane,
	CGFappearance
} from '../lib/CGF.js';
import {
	MyQuad
} from '../TextExample/MyQuad.js';
import {
	MyStartLine
} from './elements/MyStartLine.js';
import {
	MyVehicle
} from './elements/MyVehicle.js';
import {
	MySVGReader
} from './MySVGReader.js';
import {
	MyPlane
} from './primitives/MyPlane.js';


var DEGREE_TO_RAD = Math.PI / 180;

/**
 * XMLscene class, representing the scene that is to be rendered.
 */
export class XMLscene extends CGFscene {
	/**
	 * @constructor
	 * @param {MyInterface} myinterface 
	 */
	constructor(myinterface) {
		super();
		this.mytrack = "TrackMap.svg";
		this.interface = myinterface;
		this.puflag = 0;
		this.oflag = 0;
		this.switch = 0;
		this.track2On = false;
		this.dif2On = false;

	}

	/**
	 * Initializes the scene, setting some WebGL defaults, initializing the camera and the axis.
	 * @param {CGFApplication} application
	 */
	init(application) {
		super.init(application);

		this.sceneInited = false;

		this.initCameras();

		this.enableTextures(true);

		this.gl.clearDepth(100.0);
		this.gl.enable(this.gl.DEPTH_TEST);
		this.gl.enable(this.gl.CULL_FACE);
		this.gl.depthFunc(this.gl.LEQUAL);

		this.lightValues = [];

		this.axis = new CGFaxis(this);
		this.quad = new MyQuad(this);
		this.displayLights = false;
		this.vehicle = new MyVehicle(this);
		// this.mysvgreader = new MySVGReader("TrackMap.svg", this);
		this.trackSelection(this.mytrack);
		this.objects = [
			new MyQuad(this),
			new MyQuad(this),
			new MyQuad(this),
			new MyQuad(this)
		];
		this.track2 = new MyQuad(this);
		this.dif2 = new MyQuad(this);

		this.start = new CGFappearance(this);
		this.start.setAmbient(1, 1, 1, 1);
		this.start.setDiffuse(1, 1, 1, 1);
		this.start.setSpecular(1, 1, 1, 1);
		this.start.setShininess(10.0);
		this.start.loadTexture('scenes/images/menu/start.png');
		this.start.setTextureWrap('REPEAT', 'REPEAT');

		this.demo = new CGFappearance(this);
		this.demo.setAmbient(1, 1, 1, 1);
		this.demo.setDiffuse(1, 1, 1, 1);
		this.demo.setSpecular(1, 1, 1, 1);
		this.demo.setShininess(100.0);
		this.demo.loadTexture('scenes/images/menu/demo.png');
		this.demo.setTextureWrap('REPEAT', 'REPEAT');

		this.difficulty = new CGFappearance(this);
		this.difficulty.setAmbient(1, 1, 1, 1);
		this.difficulty.setDiffuse(1, 1, 1, 1);
		this.difficulty.setSpecular(1, 1, 1, 1);
		this.difficulty.setShininess(100.0);
		this.difficulty.loadTexture('scenes/images/menu/f2dif.jpeg');
		this.difficulty.setTextureWrap('REPEAT', 'REPEAT');

		this.track = new CGFappearance(this);
		this.track.setAmbient(1, 1, 1, 1);
		this.track.setDiffuse(1, 1, 1, 1);
		this.track.setSpecular(1, 1, 1, 1);
		this.track.setShininess(100.0);
		this.track.loadTexture('scenes/images/menu/adtrack.jpeg');
		this.track.setTextureWrap('REPEAT', 'REPEAT');

		this.track2tex = new CGFappearance(this);
		this.track2tex.setAmbient(1, 1, 1, 1);
		this.track2tex.setDiffuse(1, 1, 1, 1);
		this.track2tex.setSpecular(1, 1, 1, 1);
		this.track2tex.setShininess(10.0);
		this.track2tex.loadTexture('scenes/images/menu/SGItrack.png');
		this.track2tex.setTextureWrap('REPEAT', 'REPEAT');

		this.dif2tex = new CGFappearance(this);
		this.dif2tex.setAmbient(1, 1, 1, 1);
		this.dif2tex.setDiffuse(1, 1, 1, 1);
		this.dif2tex.setSpecular(1, 1, 1, 1);
		this.dif2tex.setShininess(10.0);
		this.dif2tex.loadTexture('scenes/images/menu/f1dif.png');
		this.dif2tex.setTextureWrap('REPEAT', 'REPEAT');

		this.setPickEnabled(true);

		this.materials = [
			this.track,
			this.difficulty,
			this.demo,
			this.start
		]

		super.setUpdatePeriod(100);
	}
	trackSelection(track) {
		//	this.vehicle = new MyVehicle(this, track);
		this.mysvgreader = new MySVGReader(track, this);
	}
	/**
	 * Initializes the default camera.
	 */
	initCameras() {
		this.camera = new CGFcamera(0.4, 0.1, 500, vec3.fromValues(15, 15, 15), vec3.fromValues(0, 0, 0));
		this.interface.setActiveCamera(this.camera);
	}

	/**
	 * Initializes the scene lights with the values read from the XML file.
	 */
	initLights() {
		var i = 0;
		// Lights index.

		// Reads the lights from the scene graph.
		for (var key in this.graph.lights) {
			if (i >= 8)
				break; // Only eight lights allowed by WebGL.

			if (this.graph.lights.hasOwnProperty(key)) {
				var light = this.graph.lights[key];

				this.lights[i].setPosition(light[2][0], light[2][1], light[2][2], light[2][3]);
				this.lights[i].setAmbient(light[3][0], light[3][1], light[3][2], light[3][3]);
				this.lights[i].setDiffuse(light[4][0], light[4][1], light[4][2], light[4][3]);
				this.lights[i].setSpecular(light[5][0], light[5][1], light[5][2], light[5][3]);

				if (light[1] == "spot") {
					this.lights[i].setSpotCutOff(light[6]);
					this.lights[i].setSpotExponent(light[7]);
					this.lights[i].setSpotDirection(light[8][0], light[8][1], light[8][2]);
				}
				this.lights[i].setVisible(true);

				if (this.displayLights) {
					this.lights[i].setVisible(true);
				} else
					this.lights[i].setVisible(false);

				if (light[0])
					this.lights[i].enable();
				else
					this.lights[i].disable();

				this.lights[i].update();

				i++;
			}
		}
	}

	/**
	 * Initializes the scene cameras.
	 */

	initXMLCameras() {
		this.cameraID = this.graph.defaultCameraId;
		this.camera = this.graph.views[this.graph.defaultCameraId];
		this.interface.setActiveCamera(this.default);
	}

	/**
	 * Update the current camera according to a change in the  cameras dropdown in the interface
	 */
	updateCamera(newCamera) {
		this.cameraID = newCamera;
		this.camera = this.graph.views[this.cameraID];
		this.interface.setActiveCamera(this.camera);
	}
	/**
	 * Enables the lights accordingly to the lights chosen in the interface
	 */
	setLights() {
		var i = 0;
		// Lights index.

		// Reads the lights from the lightValues map.
		for (var key in this.lightValues) {
			if (this.lightValues.hasOwnProperty(key)) {
				this.lights[i].setVisible(this.displayLights);
				if (this.lightValues[key]) {
					this.lights[i].enable();
				} else {
					this.lights[i].disable();
				}

				this.lights[i].update();

				i++;
			}
		}
	}

	setDefaultAppearance() {
		this.setAmbient(0.2, 0.4, 0.8, 1.0);
		this.setDiffuse(0.2, 0.4, 0.8, 1.0);
		this.setSpecular(0.2, 0.4, 0.8, 1.0);
		this.setShininess(10.0);
	}
	/** Handler called when the graph is finally loaded. 
	 * As loading is asynchronous, this may be called already after the application has started the run loop
	 */
	onGraphLoaded() {
		this.axis = new CGFaxis(this, this.graph.referenceLength);

		this.gl.clearColor(this.graph.background[0], this.graph.background[1], this.graph.background[2], this.graph.background[3]);

		this.setGlobalAmbientLight(this.graph.ambient[0], this.graph.ambient[1], this.graph.ambient[2], this.graph.ambient[3]);

		//cameras
		this.initCameras();

		this.initXMLCameras();

		//initializing the interface elements
		this.interface.createInterface(this.graph.views);

		this.initLights();

		this.sceneInited = true;
	}

	update(currTime) {
		this.car_location = this.vehicle.updateMovement(currTime);
		this.collision_detection();

	}

	collision_detection() {
		var center_to_front = 10.7;
		var center_to_back = 0.8;
		var center_to_wheel = 1.6;
		var scale = 3.77;


		//coordinates of car (x,y)
		let x_car = this.car_location[0];
		let y_car = this.car_location[2];
		//circle coordinates and radius
		this.puCircleCoord = this.mysvgreader.puCircleColision;
		this.oCircleCoord = this.mysvgreader.oCircleColision;

		//PowerUps 
		for (let i = 0; i < this.puCircleCoord.length; i++) {
			let x_circle = this.puCircleCoord[i][0] * scale;
			let y_circle = this.puCircleCoord[i][2] * scale;
			let radius = this.puCircleCoord[i][3] * scale;
			//distance beetween car location and circles
			let distanceFL = Math.pow((x_circle - (x_car + center_to_wheel)), 2) + Math.pow((y_circle - (y_car + center_to_front)), 2);
			let distanceFR = Math.pow((x_circle - (x_car - center_to_wheel)), 2) + Math.pow((y_circle - (y_car + center_to_front)), 2);
			let distanceBR = Math.pow((x_circle - (x_car - center_to_wheel)), 2) + Math.pow((y_circle - (y_car - center_to_back)), 2);
			let distanceBL = Math.pow((x_circle - (x_car + center_to_wheel)), 2) + Math.pow((y_circle - (y_car - center_to_back)), 2);
			let threshold = Math.pow(radius, 2);
			//when there is collision
			if (distanceBR <= threshold ||
				distanceBL <= threshold ||
				distanceFR <= threshold ||
				distanceFL <= threshold) {

				console.log("BATEU CARALHO")
				if (this.puflag == 0) {
					this.vehicle.powerup_effect1();
					// this.puflag = 1;
				}
				//else {
				// 	this.vehicle.powerup_effect2();
				// 	this.puflag = 0;
				// }
			}

		}
		//Obstacles
		for (let i = 0; i < this.oCircleCoord.length; i++) {
			let x_circle = this.oCircleCoord[i][0] * scale;
			let y_circle = this.oCircleCoord[i][2] * scale;
			let radius = this.oCircleCoord[i][3] * scale;
			//distance beetween car location and circles
			let distanceFL = Math.pow((x_circle - (x_car + center_to_wheel)), 2) + Math.pow((y_circle - (y_car + center_to_front)), 2);
			let distanceFR = Math.pow((x_circle - (x_car - center_to_wheel)), 2) + Math.pow((y_circle - (y_car + center_to_front)), 2);
			let distanceBR = Math.pow((x_circle - (x_car - center_to_wheel)), 2) + Math.pow((y_circle - (y_car - center_to_back)), 2);
			let distanceBL = Math.pow((x_circle - (x_car + center_to_wheel)), 2) + Math.pow((y_circle - (y_car - center_to_back)), 2);
			let threshold = Math.pow(radius, 2);
			//when there is collision
			if (distanceBR <= threshold ||
				distanceBL <= threshold ||
				distanceFR <= threshold ||
				distanceFL <= threshold) {

				console.log("BATEU CARALHO")
				this.switch++;
				if (this.switch == 1) {
					this.vehicle.obstacle_effect1();
					this.oflag = 1;
				} else if (this.switch > 10) {
					this.vehicle.obstacle_effect2();
					this.oflag = 0;
					this.switch = 1;
				}


			}
		}
	}

	logPicking() {
		if (this.pickMode == false) {
			if (this.pickResults != null && this.pickResults.length > 0) {
				for (var i = 0; i < this.pickResults.length; i++) {
					var obj = this.pickResults[i][0];
					if (obj) {
						var customId = this.pickResults[i][1];
						//console.log("Picked object: " + obj + ", with pick id " + customId);
						//start
						if (customId == 4) {
							console.log("Menu: START")
						}
						//demo
						if (customId == 3) {
							console.log("Menu: DEMO")
						}
						//difficulty
						if (customId == 2) {
							console.log("Menu: DIFFICULTY")
							//Formula1 
							if (!this.dif2On) {
								console.log("DIFFICULTY: Formula1")
								this.dif2On = true;
							}
							//Formula2 (Default)
							else if (this.dif2On) {
								console.log("DIFFICULTY: Formula2")
								this.dif2On = false;
							}
						}
						//track
						if (customId == 1) {
							console.log("Menu: TRACK")
							//TestTrackMap
							if (!this.track2On) {
								console.log("TRACK: SGI ")
								this.vehicle.trackSelection(this.track2On);
								this.track2On = true;
							}
							//TrackMap - Abu Dhabi (Default)
							else if (this.track2On) {
								console.log("TRACK: Abu Dhabi")
								this.vehicle.trackSelection(this.track2On);
								this.track2On = false;
							}

						}
					}
				}
				this.pickResults.splice(0, this.pickResults.length);
			}
		}
	}
	/**
	 * Displays the scene.
	 */
	display() {
		// ---- BEGIN Background, camera and axis setup
		// this.selectView(this.interface.currentCameraId);
		// Clear image and depth buffer everytime we update the scene

		// When picking is enabled, the scene's display method is called once for picking, 
		// and then again for rendering.
		// logPicking does nothing in the beginning of the first pass (when pickMode is true)
		// during the first pass, a picking buffer is filled.
		// in the beginning of the second pass (pickMode false), logPicking checks the buffer and
		// collects the id's of the picked object(s) 
		this.logPicking();

		// this resets the picking buffer
		this.clearPickRegistration();

		this.gl.viewport(0, 0, this.gl.canvas.width, this.gl.canvas.height);
		this.gl.clear(this.gl.COLOR_BUFFER_BIT | this.gl.DEPTH_BUFFER_BIT);

		// Initialize Model-View matrix as identity (no transformation
		this.updateProjectionMatrix();
		this.loadIdentity();

		//HUD
		this.pushMatrix();
		this.translate(-7, 3.7, -10);
		this.quad.display();
		this.popMatrix();

		// Apply transformations corresponding to the camera position relative to the origin
		this.applyViewMatrix();

		this.setLights();

		this.pushMatrix();
		this.axis.display();

		for (var i = 0; i < this.lights.length; i++) {
			this.lights[i].setVisible(true);
			this.lights[i].enable();
		}



		if (this.sceneInited) {
			// Draw axis
			this.setDefaultAppearance();

			//set the active camera, necessary for being able to move the camera around
			this.interface.setActiveCamera(this.camera);

			// Displays the scene (MySceneGraph function).
			this.graph.displayScene();
			// this.graph.displayScene2();
			// this.obstacle.display();
			// this.powerup.display();
			//this.startline.display();
			this.vehicle.display();
			this.mysvgreader.displayScene();
			//this.wheel.display();
			// this.vehicleBody.display();


		}
		// draw objects
		for (var i = 0; i < this.objects.length; i++) {
			this.pushMatrix();
			this.materials[i].apply();
			this.translate(5, 0.2, 2 + i * 2);
			this.rotate(-Math.PI / 4, 0, 1, 0);
			this.rotate(Math.PI, 0, 0, 1);
			this.rotate(Math.PI / 2, 1, 0, 0);
			this.scale(3, 1, 0);

			// set pick id before drawing
			this.registerForPick(i + 1, this.objects[i]);

			this.objects[i].display();
			this.popMatrix();
		}
		//track 2
		if (this.track2On) {
			this.pushMatrix();
			this.track2tex.apply();
			this.translate(5, 0.2, 2 + 0 * 2);
			this.rotate(-Math.PI / 4, 0, 1, 0);
			this.rotate(Math.PI, 0, 0, 1);
			this.rotate(Math.PI / 2, 1, 0, 0);
			this.scale(3, 1, 0);
			// set pick id before drawing
			this.registerForPick(1, this.track2);
			this.track2.display();
			this.popMatrix();
		}
		//difficulty 2
		if (this.dif2On) {
			this.pushMatrix();
			this.dif2tex.apply();
			this.translate(5, 0.2, 2 + 1 * 2);
			this.rotate(-Math.PI / 4, 0, 1, 0);
			this.rotate(Math.PI, 0, 0, 1);
			this.rotate(Math.PI / 2, 1, 0, 0);
			this.scale(3, 1, 0);
			// set pick id before drawing
			this.registerForPick(2, this.dif2);
			this.dif2.display();
			this.popMatrix();
		}
		this.popMatrix();
		// ---- END Background, camera and axis setup
	}

	processKeyboard(ev) {

	}
	processKeyDown(ev) {
		this.vehicle.processKeyDown(ev);
	}
	processKeyUp(ev) {
		this.vehicle.processKeyUp(ev);
	}
}