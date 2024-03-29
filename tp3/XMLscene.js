import {
    CGFscene,
    CGFaxis,
    CGFcamera,
    CGFplane,
    CGFappearance,
    CGFtexture,
    CGFshader
} from '../lib/CGF.js';
import {
    MyQuad
} from '../TextExample/MyQuad.js';
import {
    MyAbuDhabi
} from './elements/MyAbuDhabi.js';
import {
    MySGITrack
} from './elements/MySGITrack.js';
import {
    MyVehicle
} from './elements/MyVehicle.js';
import {
    MySVGReader
} from './MySVGReader.js';


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
        this.puflag = 0;
        this.oflag = 0;
        this.track2On = false;
        this.dif2On = false;
        this.startOn = false;
        this.demoOn = false;
        this.tempo = new Number();
        this.tempo = 150;
        this.laps = 0;
        this.lap_aux = 0;
        this.won = 0;
        this.puCollision = 0;
        this.obsCollision = 0;
        this.powerupOn_aux = 0;
        this.obstacleOn_aux = 0;
        this.demo_aux = 0;
        this.puTime = false;
        this.oTime = false;
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
        this.route = [];
        this.axis = new CGFaxis(this);
        this.hud = new MyQuad(this);
        this.timerquad = new MyQuad(this);
        this.displayLights = false;
        this.vehicle = new MyVehicle(this);
        this.mysvgreader = new MySVGReader("TrackMap.svg", this);
        this.mysvgreader2 = new MySVGReader("TestTrackMap.svg", this);
        this.objects = [
            new MyQuad(this),
            new MyQuad(this),
            new MyQuad(this),
            new MyQuad(this)
        ];
        this.track2 = new MyQuad(this);
        this.dif2 = new MyQuad(this);
        this.abuDhabi = new MyAbuDhabi(this);
        this.sgiTrack = new MySGITrack(this);

        this.start = new CGFappearance(this);
        this.start.setAmbient(1, 1, 1, 1);
        this.start.setDiffuse(1, 1, 1, 1);
        this.start.setSpecular(1, 1, 1, 1);
        this.start.setEmission(1, 1, 1, 1);
        this.start.setShininess(10.0);
        this.start.loadTexture('scenes/images/menu/start.png');
        this.start.setTextureWrap('REPEAT', 'REPEAT');

        this.demoTex = new CGFappearance(this);
        this.demoTex.setAmbient(1, 1, 1, 1);
        this.demoTex.setDiffuse(1, 1, 1, 1);
        this.demoTex.setSpecular(1, 1, 1, 1);
        this.demoTex.setEmission(1, 1, 1, 1);
        this.demoTex.setShininess(100.0);
        this.demoTex.loadTexture('scenes/images/menu/demo.png');
        this.demoTex.setTextureWrap('REPEAT', 'REPEAT');

        this.difficulty = new CGFappearance(this);
        this.difficulty.setAmbient(1, 1, 1, 1);
        this.difficulty.setDiffuse(1, 1, 1, 1);
        this.difficulty.setSpecular(1, 1, 1, 1);
        this.difficulty.setEmission(1, 1, 1, 1);
        this.difficulty.setShininess(100.0);
        this.difficulty.loadTexture('scenes/images/menu/f2dif.jpeg');
        this.difficulty.setTextureWrap('REPEAT', 'REPEAT');

        this.track = new CGFappearance(this);
        this.track.setAmbient(1, 1, 1, 1);
        this.track.setDiffuse(1, 1, 1, 1);
        this.track.setSpecular(1, 1, 1, 1);
        this.track.setEmission(1, 1, 1, 1);
        this.track.setShininess(100.0);
        this.track.loadTexture('scenes/images/menu/adtrack.jpeg');
        this.track.setTextureWrap('REPEAT', 'REPEAT');

        this.track2tex = new CGFappearance(this);
        this.track2tex.setAmbient(1, 1, 1, 1);
        this.track2tex.setDiffuse(1, 1, 1, 1);
        this.track2tex.setSpecular(1, 1, 1, 1);
        this.track2tex.setEmission(1, 1, 1, 1);
        this.track2tex.setShininess(10.0);
        this.track2tex.loadTexture('scenes/images/menu/SGItrack.png');
        this.track2tex.setTextureWrap('REPEAT', 'REPEAT');

        this.dif2tex = new CGFappearance(this);
        this.dif2tex.setAmbient(1, 1, 1, 1);
        this.dif2tex.setDiffuse(1, 1, 1, 1);
        this.dif2tex.setSpecular(1, 1, 1, 1);
        this.dif2tex.setEmission(1, 1, 1, 1);
        this.dif2tex.setShininess(10.0);
        this.dif2tex.loadTexture('scenes/images/menu/f1dif.png');
        this.dif2tex.setTextureWrap('REPEAT', 'REPEAT');

        this.hudtex = new CGFappearance(this);
        this.hudtex.setAmbient(1, 1, 1, 1);
        this.hudtex.setDiffuse(1, 1, 1, 1);
        this.hudtex.setSpecular(1, 1, 1, 1);
        this.hudtex.setEmission(1, 1, 1, 1);
        this.hudtex.setShininess(100.0);
        this.hudtex.loadTexture('scenes/images/HUD.png');
        this.hudtex.setTextureWrap('REPEAT', 'REPEAT');

        this.pause = new CGFappearance(this);
        this.pause.setAmbient(1, 1, 1, 1);
        this.pause.setDiffuse(1, 1, 1, 1);
        this.pause.setSpecular(1, 1, 1, 1);
        this.pause.setEmission(1, 1, 1, 1);
        this.pause.setShininess(100.0);
        this.pause.loadTexture('scenes/images/pause2.jpeg');
        this.pause.setTextureWrap('REPEAT', 'REPEAT');

        this.puHUD = new CGFappearance(this);
        this.puHUD.setAmbient(0, 1, 0, 1);
        this.puHUD.setDiffuse(0, 1, 0, 1);
        this.puHUD.setSpecular(0, 1, 0, 1);
        this.puHUD.setShininess(100.0);

        this.oHUD = new CGFappearance(this);
        this.oHUD.setAmbient(1, 0, 0, 1);
        this.oHUD.setDiffuse(1, 0, 0, 1);
        this.oHUD.setSpecular(1, 0, 0, 1);
        this.oHUD.setShininess(100.0);

        this.timerTex = new CGFappearance(this);
        this.timerTex.setAmbient(0, 0, 0, 1);
        this.timerTex.setDiffuse(0, 0, 0, 1);
        this.timerTex.setSpecular(0, 0, 0, 1);
        this.timerTex.setShininess(100.0);

        this.lapTex = new CGFappearance(this);
        this.lapTex.setAmbient(0, 0, 0, 1);
        this.lapTex.setDiffuse(0, 0, 0, 1);
        this.lapTex.setSpecular(0, 0, 0, 1);
        this.lapTex.setShininess(100.0);

        this.kimiWon = new CGFappearance(this);
        this.kimiWon.setAmbient(1, 1, 1, 1);
        this.kimiWon.setDiffuse(1, 1, 1, 1);
        this.kimiWon.setSpecular(1, 1, 1, 1);
        this.kimiWon.setEmission(1, 1, 1, 1);
        this.kimiWon.setShininess(100.0);
        this.kimiWon.loadTexture('scenes/images/kimiWon.jpeg');
        this.kimiWon.setTextureWrap('REPEAT', 'REPEAT');

        this.kimiLost = new CGFappearance(this);
        this.kimiLost.setAmbient(1, 1, 1, 1);
        this.kimiLost.setDiffuse(1, 1, 1, 1);
        this.kimiLost.setSpecular(1, 1, 1, 1);
        this.kimiLost.setEmission(1, 1, 1, 1);
        this.kimiLost.setShininess(100.0);
        this.kimiLost.loadTexture('scenes/images/kimiLost.jpeg');
        this.kimiLost.setTextureWrap('REPEAT', 'REPEAT');

        this.setPickEnabled(true);
        this.materials = [
            this.track,
            this.difficulty,
            this.demoTex,
            this.start
        ]
        //TEXT ON SCENE
        this.appearance = new CGFappearance(this);

        // font texture: 16 x 16 characters
        // http://jens.ayton.se/oolite/files/font-tests/rgba/oolite-font.png
        this.fontTexture = new CGFtexture(this, "textures/oolite-font.trans.png");
        this.appearance.setTexture(this.fontTexture);

        // plane where texture character will be rendered
        this.quad = new MyQuad(this);

        // instatiate text shader (used to simplify access via row/column coordinates)
        // check the two files to see how it is done
        this.textShader = new CGFshader(this.gl, "shaders/font.vert", "shaders/font.frag");

        // set number of rows and columns in font texture
        this.textShader.setUniformsValues({
            'dims': [16, 16]
        });



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
        if (this.cameraID == "carCamera") this.camera = this.cam;
        else this.camera = this.graph.views[this.cameraID];
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
        // this.trackCarCamera();
        this.initXMLCameras();

        //initializing the interface elements
        this.interface.createInterface(this.graph.views);

        this.initLights();

        this.sceneInited = true;
    }

    update(currTime) {
        // Goes to menu when ESC is pressed in DEMO MODE
        if (this.vehicle.esc && this.demoOn) {
            this.updateCamera("menu")
            this.demoOn = false;
            this.vehicle.key = -1;
        }
        // DEMO MODE is Activated, disabling Menu, Reset and Pause keys
        if (this.demoOn) {
            this.vehicle.keyP = false;
            this.demo_aux++;
            //every second demo coordinates are updated
            if (this.demo_aux % 10 == 0) {
                this.vehicle.demoVelocity = true;
                this.vehicle.updateDemo(currTime)

                //Demo Cameras
                console.log("CAMERA DEMO " + this.vehicle.route[this.vehicle.key])
                if (this.vehicle.route[this.vehicle.key] == "395.0505,94.212402") this.updateCamera("carCamera")
                if (this.vehicle.route[this.vehicle.key] == "57.77131,200.27272") this.updateCamera("demoCam1")
                if (this.vehicle.route[this.vehicle.key] == "53.30471,232.12842") this.updateCamera("demoCam2")
                if (this.vehicle.route[this.vehicle.key] == "38.335839,415.11111") this.updateCamera("demoCam3")
                if (this.vehicle.route[this.vehicle.key] == "145.25041,194.2482") this.updateCamera("carCamera")
                if (this.vehicle.route[this.vehicle.key] == "339.94653,321.69028") this.updateCamera("trackView")
                this.demo_aux = 0;

            }
        } else
            this.vehicle.demoVelocity = false;
        // M key goes to MENU
        if (this.vehicle.keyM && !this.demoOn) this.cameraID = "menu";
        // R key restarts the game
        if (this.vehicle.keyR && this.cameraID == "carCamera" && !this.demoOn) {
            this.startOn = true;
            this.vehicle.direction = 0;
            this.vehicle.velocity = 0;
            this.vehicle.steeringAngle = 0;
            this.vehicle.placeCarOnStart(this.track2On, this.startOn);
            this.cameraID = "menu"
            if (this.dif2On && !this.track2On) this.tempo = 150;
            else if (this.dif2On && this.track2On) this.tempo = 90;
            else if (!this.dif2On && this.track2On) this.tempo = 120;
            else this.tempo = 180;
            this.startCountDown();
            this.cameraID = "carCamera"
        }
        this.car_location = this.vehicle.updateMovement(currTime);

        var x_location = this.car_location[0];
        var z_location = this.car_location[2];
        // ABU DHABI FINISH LINE COORDINATES
        var min_x = 185.8;
        var max_x = 230;
        var min_z = 226.5;
        var max_z = 230.2;
        // SGI TRACK FINISH LINE COORDINATES
        if (this.track2On) {
            var min_x = 91;
            var max_x = 128;
            var min_z = 231;
            var max_z = 235;
        }
        // LAP COUNTER
        if ((x_location > min_x && x_location < max_x) && (z_location > min_z && z_location < max_z) && this.lap_aux == 0) {
            this.lap_aux = 1;
            switch (this.laps) {
                case 0:
                    this.laps = 1;
                    break;
                case 1:
                    this.laps = 2;
                    break;
                case 2:
                    this.laps = 3;
                    break;
            }
            setTimeout(() => this.lap_aux = 0, 15000);
        }

        this.collision_detection(this.dif2On, this.track2On);
        this.vehicle.trackSelection(this.track2On);
        // First Person Camera
        this.cam = new CGFcamera(0.8, 2, 500, vec3.fromValues(this.vehicle.location[0], this.vehicle.location[1] + 3.5, this.vehicle.location[2]), vec3.fromValues(this.vehicle.locationFront[0], this.vehicle.locationFront[1], this.vehicle.locationFront[2]));
        if (this.cameraID == "carCamera") this.updateCamera("carCamera")
        // Sets car next to menu and car is static
        if (this.cameraID == "menu") {
            this.vehicle.location = new vec3.fromValues(0, 0, 0);
            this.vehicle.direction = 0;
            this.vehicle.velocity = 0;
            this.vehicle.steeringAngle = 0
        }
        // When Player completes 3 laps in time - WIN display and then goes to menu
        if (this.laps == 3 && this.won == 0) {
            this.won = 1;
            console.log("GANHOUUUUUUU")
            setTimeout(() => {
                this.updateCamera("menu"), this.laps = 0
            }, 10000);
            setTimeout(() => this.won = 0, 15000);

            if (this.demoOn)
                this.demoOn = false;
        }

    }
    // Time Countdown
    startCountDown() {
        if (this.tempo - 1 >= 0 && this.cameraID != "menu") {
            var min = parseInt(this.tempo / 60);
            var seg = this.tempo % 60;

            if (min < 10) {
                min = "0" + min;
                min = min.substr(0, 2);
            }
            if (seg <= 9)
                seg = "0" + seg;

            this.min = min;
            this.seperator = 10;
            this.seg = seg;

            if (!this.vehicle.keyP) this.tempo--;
            setTimeout(() => this.startCountDown(), 1000);

        } else { // Back to the menu 
            if (this.dif2On && !this.track2On) this.tempo = 150;
            else if (this.dif2On && this.track2On) this.tempo = 90;
            else if (!this.dif2On && this.track2On) this.tempo = 120;
            else this.tempo = 180;


            this.startOn = false;
            this.updateCamera("menu");
        }
    }
    // Detects collision with objects 
    collision_detection(dif2On, track2On) {
        var center_to_front = 10.7;
        var center_to_back = 0.8;
        var center_to_wheel = 1.6;
        var scale = 3.77;


        //coordinates of car (x,y)
        let x_car = this.car_location[0];
        let y_car = this.car_location[2];
        //circle coordinates and radius
        if (!track2On) {
            this.puCircleCoord = this.mysvgreader.puCircleColision;
            this.oCircleCoord = this.mysvgreader.oCircleColision;
        } else {
            this.puCircleCoord = this.mysvgreader2.puCircleColision;
            this.oCircleCoord = this.mysvgreader2.oCircleColision;
        }

        //PowerUps 
        for (let i = 0; i < this.puCircleCoord.length; i++) {
            let x_circle = this.puCircleCoord[i][0] * scale;
            let y_circle = this.puCircleCoord[i][2] * scale;
            let radius = this.puCircleCoord[i][3] * scale;
            //distance beetween car location and circles
            let distanceBL = Math.pow((x_circle - (x_car + center_to_wheel)), 2) + Math.pow((y_circle - (y_car + center_to_front)), 2) + 100;
            let distanceBR = Math.pow((x_circle - (x_car - center_to_wheel)), 2) + Math.pow((y_circle - (y_car + center_to_front)), 2) + 140;
            let distanceFR = Math.pow((x_circle - (x_car - center_to_wheel)), 2) + Math.pow((y_circle - (y_car - center_to_back)), 2) + 10;
            let distanceFL = Math.pow((x_circle - (x_car + center_to_wheel)), 2) + Math.pow((y_circle - (y_car - center_to_back)), 2);
            let threshold = 70;
            // console.log("THRESHOLD: " + threshold);            
            // console.log("BR: " + distanceBR);
            // console.log("BL: " + distanceBL);
            // console.log("FR: " + distanceFR);
            // console.log("FL: " + distanceFL);
            // console.log("\n");

            // when there is collision
            if ((distanceBR <= threshold ||
                distanceBL <= threshold ||
                distanceFR <= threshold ||
                distanceFL <= threshold) && this.puCollision == 0) {

                console.log("BATEU PU")
                this.puCollision = 1;
                setTimeout(() => this.puCollision = 0, 2000);

                if (!dif2On) {
                    if (i % 2 == 0) {
                        this.vehicle.f2_powerup_effect1();
                    } else {
                        this.tempo += 15;
                        this.puTime = true;
                    }
                } else this.vehicle.f1_powerup_effect1();
            }

        }

        //Obstacles
        for (let i = 0; i < this.oCircleCoord.length; i++) {
            let x_circle = this.oCircleCoord[i][0] * scale;
            let y_circle = this.oCircleCoord[i][2] * scale;
            let radius = this.oCircleCoord[i][3] * scale;
            // distance between car location and circles
            let distanceFL = Math.pow((x_circle - (x_car + center_to_wheel)), 2) + Math.pow((y_circle - (y_car + center_to_front)), 2) + 100;
            let distanceFR = Math.pow((x_circle - (x_car - center_to_wheel)), 2) + Math.pow((y_circle - (y_car + center_to_front)), 2) + 140;
            let distanceBR = Math.pow((x_circle - (x_car - center_to_wheel)), 2) + Math.pow((y_circle - (y_car - center_to_back)), 2) + 10;
            let distanceBL = Math.pow((x_circle - (x_car + center_to_wheel)), 2) + Math.pow((y_circle - (y_car - center_to_back)), 2);
            let threshold = 70;


            // when there is collision
            if ((distanceBR <= threshold ||
                distanceBL <= threshold ||
                distanceFR <= threshold ||
                distanceFL <= threshold) && this.obsCollision == 0) {

                console.log("BATEU OBS")
                this.obsCollision = 1;
                setTimeout(() => this.obsCollision = 0, 2000);

                if (!dif2On) {
                    if (i % 2 == 0) {
                        this.vehicle.f2_obstacle_effect1();
                    } else {
                        this.tempo -= 15;
                        this.oTime = true;
                    }
                } else this.vehicle.f1_obstacle_effect1();

            }
        }
    }

    // MENU: Click Input
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
                            this.startOn = true;
                            this.vehicle.placeCarOnStart(this.track2On, this.startOn);
                            if (this.dif2On && !this.track2On) this.tempo = 150;
                            else if (this.dif2On && this.track2On) this.tempo = 90;
                            else if (!this.dif2On && this.track2On) this.tempo = 120;
                            else this.tempo = 180;

                            this.cameraID = "carCamera"
                            this.startCountDown();



                        }
                        //demo
                        if (customId == 3) {
                            console.log("Menu: DEMO")
                            this.demoOn = true;
                            this.vehicle.placeCarOnStart(this.track2On, this.demoOn);
                            this.updateCamera("trackView")

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
                                this.track2On = true;
                            }
                            //TrackMap - Abu Dhabi (Default)
                            else if (this.track2On) {
                                console.log("TRACK: Abu Dhabi")
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

        //HUD (VISUALS)
        this.pushMatrix();
        this.hudtex.apply();

        //car camera view (VISUALS)
        if (this.cameraID == "carCamera") this.translate(-3.7, 2.8, -8);
        //track view (VISUALS)
        else this.translate(-4.8, 3.5, -4);
        this.scale(5, 1, 1)
        this.hud.display();
        this.popMatrix();

        // Player collided with powerUp (VISUALS)
        // 10 sec green bar
        if (this.vehicle.powerupOn) {
            if (this.powerupOn_aux == 0) {
                setTimeout(() => this.vehicle.powerupOn = false, 10000);
                setTimeout(() => this.powerupOn_aux = 0, 10000);
            }
            this.powerupOn_aux = 1;

            this.pushMatrix();
            this.puHUD.apply();
            if (this.cameraID == "carCamera") this.translate(-3.7, 2.2, -8);
            else this.translate(-4.8, 3, -4);
            this.scale(5, 0.3, 1)
            this.hud.display();
            this.popMatrix();
        }
        // 1.5 sec green bar
        if (this.puTime) {
            if (this.powerupOn_aux == 0) {
                setTimeout(() => this.puTime = false, 1400);
                setTimeout(() => this.powerupOn_aux = 0, 3000);
            }
            this.powerupOn_aux = 1;

            this.pushMatrix();
            this.puHUD.apply();
            if (this.cameraID == "carCamera") this.translate(-3.7, 2.2, -8);
            else this.translate(-4.8, 3, -4);
            this.scale(5, 0.3, 1)
            this.hud.display();
            this.popMatrix();
        }

        // Player collided with obstacle (VISUALS)
        // 10 sec red bar
        if (this.vehicle.obstacleOn) {
            if (this.obstacleOn_aux == 0) {
                setTimeout(() => this.vehicle.obstacleOn = false, 10000);
                setTimeout(() => this.obstacleOn_aux = 0, 10000);
            }
            this.obstacleOn_aux = 1;

            this.pushMatrix();
            this.oHUD.apply();
            if (this.cameraID == "carCamera") this.translate(-3.7, 1.9, -8);
            else this.translate(-4.8, 2.7, -4);
            this.scale(5, 0.3, 1)
            this.hud.display();
            this.popMatrix();
        }
        // 1.5 sec green bar
        if (this.oTime) {
            if (this.obstacleOn_aux == 0) {
                setTimeout(() => this.oTime = false, 1400);
                setTimeout(() => this.obstacleOn_aux = 0, 3000);
            }
            this.obstacleOn_aux = 1;

            this.pushMatrix();
            this.oHUD.apply();
            if (this.cameraID == "carCamera") this.translate(-3.7, 1.9, -8);
            else this.translate(-4.8, 2.7, -4);
            this.scale(5, 0.3, 1)
            this.hud.display();
            this.popMatrix();
        }
        // Player is out of track (VISUALS)
        if (this.vehicle.color == 255) {
            this.pushMatrix();
            this.oHUD.apply();
            if (this.cameraID == "carCamera") this.translate(0.45, 2.5, -8);
            else this.translate(-0.15, 3.2, -4);
            this.scale(2.6, 0.3, 1)
            this.hud.display();
            this.popMatrix();
        }
        // P key was pressed and PAUSE MODE is activated (VISUALS)
        if (this.vehicle.keyP && !this.demoOn) {
            this.vehicle.velocity = 0;
            this.pushMatrix();
            this.pause.apply();
            this.translate(0, 0, -3);
            this.scale(3, 2, 1)
            this.hud.display();
            this.popMatrix();

        }
        // WIN (VISUALS)
        if (this.laps == 3) {
            this.vehicle.keyForward = this.vehicle.keyBackward = false;

            this.pushMatrix();
            this.kimiWon.apply();
            this.translate(0, 0, -3);
            this.scale(3, 2, 1)
            this.hud.display();
            this.popMatrix();
        }
        // LOST (VISUALS)
        if (this.tempo == 0 && this.laps != 3 && this.cameraID != "menu") {
            this.vehicle.keyForward = this.vehicle.keyBackward = false;

            this.pushMatrix();
            this.kimiLost.apply();
            this.translate(0, 0, -3);
            this.scale(3, 2, 1)
            this.hud.display();
            this.popMatrix();
        }

        //HUD LAPS (VISUALS)
        this.pushMatrix();
        this.lapTex.apply();
        if (this.cameraID == "carCamera") this.translate(4.15, 2.7, -8);
        else this.translate(3.8, 3.5, -4);
        this.scale(1.1, 1.1, 1)
        this.hud.display();
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

            //car body from XML
            this.pushMatrix();
            this.translate(this.vehicle.location[0], this.vehicle.location[1], this.vehicle.location[2]);
            this.rotate(this.vehicle.direction * Math.PI / 180, 0, 1, 0);
            this.graph.displayComponent("carbody", null, null, 1, 1);
            this.popMatrix();

            this.pushMatrix();

            this.vehicle.display();

            this.popMatrix();
            //parses Abu Dhabi Track and displays it
            if (!this.track2On) {
                this.vehicle.route = this.mysvgreader.send_route.routes;
                this.mysvgreader.displayScene();
                this.abuDhabi.display();
            } else {
                //parses SGI Track and displays it
                this.mysvgreader2.displayScene();
                this.sgiTrack.display();
                this.vehicle.route = this.mysvgreader2.send_route.routes;
            }

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
        // track 2 (VISUALS)
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
        // difficulty 2 (VISUALS)
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
        // TEXT IN SCENE
        // activate shader for rendering text characters
        this.setActiveShaderSimple(this.textShader);

        // Optional: disable depth test so that it is always in front (need to reenable in the end)
        this.gl.disable(this.gl.DEPTH_TEST);

        // activate texture containing the font
        this.appearance.apply();

        this.pushMatrix();
        // 	Reset transf. matrix to draw independent of camera
        this.loadIdentity();

        // transform as needed to place on screen

        //car camera view
        if (this.cameraID == "carCamera") this.translate(-7.7, 3.5, -12);
        //track view
        else this.translate(-7.4, 3.5, -6);

        // set character to display to be in the Nth column, Mth line (0-based)
        // the shader will take care of computing the correct texture coordinates 
        // of that character inside the font texture (check shaders/font.vert )
        // Homework: This should be wrapped in a function/class for displaying a full string

        // ------------------------- WORDS AND NUMBERS DISPLAYED ON SCREEN -------------------------//
        let velocity1 = [Math.trunc(Math.abs(this.vehicle.velocity) * 80 / 100), 3];
        let velocity2 = [Math.trunc((Math.abs(this.vehicle.velocity) * 80 / 10) % 10), 3];
        let velocity3 = [Math.trunc(Math.abs(this.vehicle.velocity) * 80 % 10), 3];
        let gearR = [2, 5];
        let gear1 = [1, 3];
        let gear2 = [2, 3];
        let gear3 = [3, 3];
        let gear4 = [4, 3];
        let gear5 = [5, 3];
        let gear6 = [6, 3];
        let gear7 = [7, 3];
        let gear8 = [8, 3];
        let curGear;
        if (this.vehicle.velocity >= 0 && this.vehicle.velocity <= 0.5) curGear = gear1;
        if (this.vehicle.velocity > 0.5 && this.vehicle.velocity <= 1) curGear = gear2;
        if (this.vehicle.velocity > 1 && this.vehicle.velocity <= 1.5) curGear = gear3;
        if (this.vehicle.velocity > 1.5 && this.vehicle.velocity <= 2) curGear = gear4;
        if (this.vehicle.velocity > 2 && this.vehicle.velocity <= 2.5) curGear = gear5;
        if (this.vehicle.velocity > 2.5 && this.vehicle.velocity <= 3) curGear = gear6;
        if (this.vehicle.velocity > 3 && this.vehicle.velocity <= 3.5) curGear = gear7;
        if (this.vehicle.velocity > 3.5 && this.vehicle.velocity <= 4) curGear = gear8;
        if (this.vehicle.velocity > 4) curGear = gear8;
        if (this.vehicle.velocity < 0) curGear = gearR;
        // Gear Display
        this.translate(0.6, 0, 2);
        this.activeShader.setUniformsValues({
            'charCoords': curGear
        });
        this.quad.display();
        //VELOCITY DISPLAY

        //car camera view
        if (this.cameraID == "carCamera") this.translate(-7, 3.5, -12.5);
        //track view
        else this.translate(-9, 4.9, -6.5);
        this.activeShader.setUniformsValues({
            'charCoords': velocity1
        }); // centenas
        this.quad.display();

        this.translate(0.5, 0, 0);
        this.activeShader.setUniformsValues({
            'charCoords': velocity2
        }); // dezenas
        this.quad.display();

        this.translate(0.5, 0, 0);
        this.activeShader.setUniformsValues({
            'charCoords': velocity3
        }); // unidades
        this.quad.display();

        this.translate(0.5, 0, 0);
        this.activeShader.setUniformsValues({
            'charCoords': [11, 4]
        }); // K
        this.quad.display();

        this.translate(0.5, 0, 0);
        this.activeShader.setUniformsValues({
            'charCoords': [13, 4]
        }); // M
        this.quad.display();

        this.translate(0.7, 0, 0);
        this.activeShader.setUniformsValues({
            'charCoords': [15, 2]
        }); // /
        this.quad.display();

        this.translate(0.3, 0, 0);
        this.activeShader.setUniformsValues({
            'charCoords': [8, 4]
        }); // H
        this.quad.display();


        // CLOCK DISPLAY -> Disabled in Demo Mode
        this.translate(5, 0, 0);
        this.activeShader.setUniformsValues({
            'charCoords': [this.min, 3]
        }); // min
        if (!this.demoOn)
            this.timerquad.display();
        this.translate(0.5, 0, 0);
        this.activeShader.setUniformsValues({
            'charCoords': [this.seperator, 3]
        }); // :
        if (!this.demoOn)
            this.timerquad.display();
        this.translate(0.5, 0, 0);
        this.activeShader.setUniformsValues({
            'charCoords': [Math.trunc(this.seg / 10), 3]
        }); // seg2
        if (!this.demoOn)
            this.timerquad.display();
        this.translate(0.5, 0, 0);
        this.activeShader.setUniformsValues({
            'charCoords': [this.seg % 10, 3]
        }); // seg2
        if (!this.demoOn)
            this.timerquad.display();

        // OUT OF TRACK DISPLAY
        if (this.vehicle.color == 255) {
            this.translate(3, 0, 0);
            this.activeShader.setUniformsValues({
                'charCoords': [6, 4]
            }); // F
            this.quad.display();

            this.translate(0.5, 0, 0);
            this.activeShader.setUniformsValues({
                'charCoords': [15, 4]
            }); // O
            this.quad.display();

            this.translate(0.6, 0, 0);
            this.activeShader.setUniformsValues({
                'charCoords': [2, 5]
            }); // R
            this.quad.display();

            this.translate(0.5, 0, 0);
            this.activeShader.setUniformsValues({
                'charCoords': [1, 4]
            }); // A
            this.quad.display();

            this.translate(1, 0, 0);
            this.activeShader.setUniformsValues({
                'charCoords': [4, 4]
            }); // D
            this.quad.display();

            this.translate(0.5, 0, 0);
            this.activeShader.setUniformsValues({
                'charCoords': [1, 4]
            }); // A
            this.quad.display();

            this.translate(1, 0, 0);
            this.activeShader.setUniformsValues({
                'charCoords': [0, 5]
            }); // P
            this.quad.display();


            this.translate(0.5, 0, 0);
            this.activeShader.setUniformsValues({
                'charCoords': [9, 4]
            }); // I
            this.quad.display();

            this.translate(0.3, 0, 0);
            this.activeShader.setUniformsValues({
                'charCoords': [3, 5]
            }); // S
            this.quad.display();

            this.translate(0.5, 0, 0);
            this.activeShader.setUniformsValues({
                'charCoords': [4, 5]
            }); // T
            this.quad.display();

            this.translate(0.5, 0, 0);
            this.activeShader.setUniformsValues({
                'charCoords': [1, 4]
            }); // A
            this.quad.display();

        }
        //VOLTAS
        if (this.vehicle.color == 255) this.translate(6.1, 1, 0);
        else this.translate(15, 1, 0);

        this.translate(0.3, 0, 0);
        this.activeShader.setUniformsValues({
            'charCoords': [6, 5]
        }); // V
        this.quad.display();
        this.translate(0.5, 0, 0);
        this.activeShader.setUniformsValues({
            'charCoords': [15, 4]
        }); // O
        this.quad.display();
        this.translate(0.6, 0, 0);
        this.activeShader.setUniformsValues({
            'charCoords': [12, 4]
        }); // L
        this.quad.display();

        this.translate(0.5, 0, 0);
        this.activeShader.setUniformsValues({
            'charCoords': [4, 5]
        }); // T
        this.quad.display();

        this.translate(0.5, 0, 0);
        this.activeShader.setUniformsValues({
            'charCoords': [1, 4]
        }); // A
        this.quad.display();

        this.translate(-1, -1, 0);
        this.activeShader.setUniformsValues({
            'charCoords': [this.laps, 3]
        }); // volta n
        this.quad.display();

        this.popMatrix();

        // re-enable depth test 
        // re-enable depth test 
        // re-enable depth test 
        this.gl.enable(this.gl.DEPTH_TEST);

        // reactivate default shader
        this.setActiveShaderSimple(this.defaultShader);

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