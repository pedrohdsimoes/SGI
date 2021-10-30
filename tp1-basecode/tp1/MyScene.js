import { CGFscene, CGFcamera, CGFaxis, CGFappearance } from "../lib/CGF.js";
import { Table1 } from "./Table1.js";
import { Table2 } from "./Table2.js";
import { Table3 } from "./Table3.js";
import { Floor } from "./Floor.js";
import { Wall1 } from "./Wall1.js";
import { Wall2 } from "./Wall2.js";
import { Wall3 } from "./Wall3.js";
import { Wall4 } from "./Wall4.js";

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
        this.table1 = new Table1(this);
        this.table2 = new Table2(this);
        this.table3 = new Table3(this);
        this.floor = new Floor(this);
        this.wall1 = new Wall1(this);
        this.wall2 = new Wall2(this);
        this.wall3 = new Wall3(this);
        this.wall4 = new Wall4(this);
        
        //Variables connected to MyInterface
        this.displayAxis = true;
        this.displayNormals = false;

        this.updateNormalViz();

    }
    initLights() {
        this.setGlobalAmbientLight(0.2, 0.2, 0.2, 1.0);

        this.lights[0].setPosition(2.0, 2.0, -1.0, 1.0);
        this.lights[0].setDiffuse(1.0, 1.0, 1.0, 1.0);
        this.lights[0].setSpecular(1.0, 1.0, 1.0, 1.0);
        this.lights[0].enable();
        this.lights[0].setVisible(false);
        this.lights[0].update();

        this.lights[1].setPosition(0.0, -1.0, 2.0, 1.0);
        this.lights[1].setDiffuse(0.5, 0.5, 0.5, 1.0);
        this.lights[1].setSpecular(0.5, 0.5, 0.0, 1.0);
        this.lights[1].enable();
        this.lights[1].setVisible(false);
        this.lights[1].update();
    }
    initCameras() {
        this.camera = new CGFcamera(1.8, 0.1, 500, vec3.fromValues(10, 5, 10), vec3.fromValues(0, 0, 0));
    }

    updateCustomMaterial() {
        this.customMaterial.setAmbient(...this.hexToRgbA(this.customMaterialValues['Ambient']));
        this.customMaterial.setDiffuse(...this.hexToRgbA(this.customMaterialValues['Diffuse']));
        this.customMaterial.setSpecular(...this.hexToRgbA(this.customMaterialValues['Specular']));
        this.customMaterial.setShininess(this.customMaterialValues['Shininess']);
    };

    initMaterials() {

        // Custom material (can be changed in the interface)
        // initially midrange values on ambient, diffuse and specular, on R, G and B respectively

        this.customMaterialValues = {
            'Ambient': '#0000ff',
            'Diffuse': '#ff0000',
            'Specular': '#000000',
            'Shininess': 10
        }
        this.customMaterial = new CGFappearance(this);

        this.updateCustomMaterial();
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

        // Draw axis
        if (this.displayAxis)
            this.axis.display();

        // ---- BEGIN Primitive drawing section

        this.customMaterial.apply();

        
        this.table1.display();
        this.table2.display();
        this.table3.display();
        this.floor.display();
        this.wall1.display();
        this.wall2.display();
        this.wall3.display();
        this.wall4.display();

        // ---- END Primitive drawing section
    }

    updateNormalViz()
    {
        if (this.displayNormals) {
            this.table1.enableNormalViz();
            this.table2.enableNormalViz();
            this.table3.enableNormalViz();
            this.floor.enableNormalViz();
            this.wall1.enableNormalViz();
            this.wall2.enableNormalViz();
            this.wall3.enableNormalViz();
            this.wall4.enableNormalViz();
        }
        else {
            this.table1.disableNormalViz();
            this.table2.disableNormalViz();
            this.table3.disableNormalViz();
            this.floor.disableNormalViz();
            this.wall1.disableNormalViz();
            this.wall2.disableNormalViz();
            this.wall3.disableNormalViz();
            this.wall4.disableNormalViz();
        }
    }

    hexToRgbA(hex)
    {
        var ret;
        //either we receive a html/css color or a RGB vector
        if(/^#([A-Fa-f0-9]{3}){1,2}$/.test(hex)){
            ret=[
                parseInt(hex.substring(1,3),16).toPrecision()/255.0,
                parseInt(hex.substring(3,5),16).toPrecision()/255.0,
                parseInt(hex.substring(5,7),16).toPrecision()/255.0,
                1.0
            ];
        }
        else
            ret=[
                hex[0].toPrecision()/255.0,
                hex[1].toPrecision()/255.0,
                hex[2].toPrecision()/255.0,
                1.0
            ];
        return ret;
    }


}