import { CGFscene, CGFcamera, CGFaxis, CGFappearance } from "../lib/CGF.js";
import { MyRoom } from "./MyRoom.js";


/**
 * MyScene
 * @constructor
 */
export class MyScene extends CGFscene {
  constructor() {
    super();
  }
  init(application) {
    super.init(application);
    this.initCameras();
    this.initLights();
    this.initMaterials();

    //Background color
    this.gl.clearColor(0.0, 0.0, 0.0, 1.0);

    this.gl.clearDepth(100.0);
    this.gl.enable(this.gl.DEPTH_TEST);
    this.gl.enable(this.gl.CULL_FACE);
    this.gl.depthFunc(this.gl.LEQUAL);

    //Initialize scene objects
    this.axis = new CGFaxis(this);
    this.room = new MyRoom(this);

    //Variables connected to MyInterface
    this.displayAxis = true;
    this.displayNormals = false;

    this.updateNormalViz();
  }
  initLights() {
    this.setGlobalAmbientLight(0.2, 0.2, 0.2, 1.0);

    this.lights[0].setPosition( -5.0, 4.4, -4.1 ,1.0);
    this.lights[0].setDiffuse(0.7, 0.7, 0.7, 1.0);
    this.lights[0].setSpecular(0.2, 0.7, 0.2, 1.0);
    this.lights[0].enable();
    this.lights[0].setVisible(false);
    this.lights[0].update();

    this.lights[1].setPosition(5.0, 10.0, 5.0, 1.0);
    this.lights[1].setDiffuse(0.8, 0.8, 0.8, 1.0);
    //this.lights[1].setSpecular(0.5, 0.5, 0.5, 1.0);
    this.lights[1].enable();
    this.lights[1].setVisible(false);
    this.lights[1].update();

    this.lights[2].setPosition(9.0, 3.8, 7.8, 1.0);
    //this.lights[2].setDiffuse(0.3, 0.3, 0.3, 1.0);
    this.lights[2].setSpecular(0.2, 0.2, 0.3, 1.0);
    this.lights[2].enable();
    this.lights[2].setVisible(false);
    this.lights[2].update();
  }
  initCameras() {
    this.camera = new CGFcamera(
      1.8,
      0.1,
      500,
      vec3.fromValues(10, 5, 10),
      vec3.fromValues(0, 0, 0)
    );
  }

  updateCustomMaterial() {
    this.customMaterial.setAmbient(
      ...this.hexToRgbA(this.customMaterialValues["Ambient"])
    );
    this.customMaterial.setDiffuse(
      ...this.hexToRgbA(this.customMaterialValues["Diffuse"])
    );
    this.customMaterial.setSpecular(
      ...this.hexToRgbA(this.customMaterialValues["Specular"])
    );
    this.customMaterial.setShininess(this.customMaterialValues["Shininess"]);
  }

  initMaterials() {
    this.material = new CGFappearance(this);
    this.material.setAmbient(0.3,0.3,0.3,1);
    this.material.setDiffuse(0.70,0.40,0,1.0);
    this.material.setSpecular(0,0,0,0,1.0);
    this.material.setShininess(110.0);
    
}
  display() {
    // ---- BEGIN Background, camera and axis setup
    // Clear image and depth buffer everytime we update the scene
    this.gl.viewport(0, 0, this.gl.canvas.width, this.gl.canvas.height);
    this.gl.clear(this.gl.COLOR_BUFFER_BIT | this.gl.DEPTH_BUFFER_BIT);

    // Initialize Model-View matrix as identity (no transformation
    this.updateProjectionMatrix();
    this.loadIdentity();

    // Apply transformations corresponding to the camera position relative to the origin
    this.applyViewMatrix();

    this.lights[0].update();
    this.lights[1].update();
    this.lights[2].update();

    // Draw axis
    if (this.displayAxis) this.axis.display();

    // ---- BEGIN Primitive drawing section
    this.material.apply();

    this.room.display();

    // ---- END Primitive drawing section
  }

  updateNormalViz() {
    if (this.displayNormals) {
      this.room.enableNormalViz();
    } else {
      this.room.disableNormalViz();
    }
  }

  hexToRgbA(hex) {
    var ret;
    //either we receive a html/css color or a RGB vector
    if (/^#([A-Fa-f0-9]{3}){1,2}$/.test(hex)) {
      ret = [
        parseInt(hex.substring(1, 3), 16).toPrecision() / 255.0,
        parseInt(hex.substring(3, 5), 16).toPrecision() / 255.0,
        parseInt(hex.substring(5, 7), 16).toPrecision() / 255.0,
        1.0,
      ];
    } else
      ret = [
        hex[0].toPrecision() / 255.0,
        hex[1].toPrecision() / 255.0,
        hex[2].toPrecision() / 255.0,
        1.0,
      ];
    return ret;
  }
}
