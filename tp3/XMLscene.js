import {
    CGFscene,
    CGFaxis,
    CGFcamera
} from '../lib/CGF.js';
import {
    MyObstacle
} from './elements/MyObstacle.js';
import {
    MyPowerUp
} from './elements/MyPowerUp.js';
import {
    MyStartLine
} from './elements/MyStartLine.js';
import {
    MyVehicle
} from './elements/MyVehicle.js';
import {
    MyWheel
} from './elements/MyWheel.js';
import { VehicleBody } from './elements/VehicleBody.js';
import {
    MyRectangle
} from './primitives/MyRectangle.js';


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

        this.interface = myinterface;


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
        this.displayLights = false;
        this.vehicle = new MyVehicle(this);
        this.obstacle = new MyObstacle(this);
        this.powerup = new MyPowerUp(this);
        this.start = new MyStartLine(this);
        this.wheel = new MyWheel(this);
        this.vehicleBody = new VehicleBody(this);

        super.setUpdatePeriod(100);
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
        this.vehicle.updateMovement(currTime);
    }
    /**
     * Displays the scene.
     */
    display() {
        // ---- BEGIN Background, camera and axis setup
        // this.selectView(this.interface.currentCameraId);
        // Clear image and depth buffer everytime we update the scene
        this.gl.viewport(0, 0, this.gl.canvas.width, this.gl.canvas.height);
        this.gl.clear(this.gl.COLOR_BUFFER_BIT | this.gl.DEPTH_BUFFER_BIT);

        // Initialize Model-View matrix as identity (no transformation
        this.updateProjectionMatrix();
        this.loadIdentity();

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

            // this.obstacle.display();
            // this.powerup.display();
            // this.start.display();
            this.vehicle.display();
            // this.wheel.display();
            // this.vehicleBody.display();


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