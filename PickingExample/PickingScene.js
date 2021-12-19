import { CGFscene, CGFcamera, CGFaxis, CGFappearance, CGFplane } from "../lib/CGF.js";

/**
* MyScene
* @constructor
*/
export class PickingScene extends CGFscene {
    constructor() {
        super();
    }

    init(application) {
        super.init(application);
        this.initCameras();
        this.initLights();

        //Background color
        this.gl.clearColor(0.0, 0.0, 0.0, 1.0);

        this.gl.clearDepth(100.0);
        this.gl.enable(this.gl.DEPTH_TEST);
        this.gl.enable(this.gl.CULL_FACE);
        this.gl.depthFunc(this.gl.LEQUAL);

        //Initialize scene objects
        this.axis = new CGFaxis(this);

		this.appearance = new CGFappearance(this);
		this.appearance.setAmbient(0.3, 0.3, 0.3, 1);
		this.appearance.setDiffuse(0.7, 0.7, 0.7, 1);
		this.appearance.setSpecular(0.0, 0.0, 0.0, 1);	
		this.appearance.setShininess(120);
		
		this.objects= [
			new CGFplane(this),
			new CGFplane(this),
			new CGFplane(this),
			new CGFplane(this)
		];
	
		this.setPickEnabled(true);
			
    }
    initLights() {
        this.setGlobalAmbientLight(0.3, 0.3, 0.3, 1.0);

        this.lights[0].setPosition(4.0, 3.0, 2.0, 1.0);
        this.lights[0].setDiffuse(1.0, 1.0, 1.0, 1.0);
        this.lights[0].setSpecular(1.0, 1.0, 0.0, 1.0);
        this.lights[0].disable();
        this.lights[0].setVisible(true);
        this.lights[0].update();
    }
    initCameras() {
        this.camera = new CGFcamera(0.4, 0.1, 500, vec3.fromValues(10, 10, 10), vec3.fromValues(0, 0, 0));
    }

	logPicking()
	{
		if (this.pickMode == false) {
			if (this.pickResults != null && this.pickResults.length > 0) {
				for (var i=0; i< this.pickResults.length; i++) {
					var obj = this.pickResults[i][0];
					if (obj)
					{
						var customId = this.pickResults[i][1];				
						console.log("Picked object: " + obj + ", with pick id " + customId);
					}
				}
				this.pickResults.splice(0,this.pickResults.length);
			}		
		}
	}

    display() {
		// When picking is enabled, the scene's display method is called once for picking, 
		// and then again for rendering.
		// logPicking does nothing in the beginning of the first pass (when pickMode is true)
		// during the first pass, a picking buffer is filled.
		// in the beginning of the second pass (pickMode false), logPicking checks the buffer and
		// collects the id's of the picked object(s) 
		this.logPicking();

		// this resets the picking buffer
		this.clearPickRegistration();
	
		// Clear image and depth buffer every time we update the scene
		this.gl.viewport(0, 0, this.gl.canvas.width, this.gl.canvas.height);
		this.gl.clear(this.gl.COLOR_BUFFER_BIT | this.gl.DEPTH_BUFFER_BIT);
		this.gl.enable(this.gl.DEPTH_TEST);
	
		// Initialize Model-View matrix as identity (no transformation)
		this.updateProjectionMatrix();
		this.loadIdentity();
	
		// Apply transformations corresponding to the camera position relative to the origin
		this.applyViewMatrix();
	
		// Update lights used
		this.lights[0].update();
	
		// Draw axis
		this.axis.display();	
		
		this.appearance.apply();
	
		this.rotate(Math.PI/2.0,1,0,0);
	
		// draw objects
		for (var i =0; i<this.objects.length; i++) {
			this.pushMatrix();
		
			this.translate(i*2, 0, 0);

			// set pick id before drawing
			this.registerForPick(i+1, this.objects[i]);
			
			this.objects[i].display();
			this.popMatrix();
		}
    }
}
