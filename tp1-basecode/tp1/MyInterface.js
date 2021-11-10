import {CGFinterface, dat} from '../lib/CGF.js';

/**
* MyInterface
* @constructor
*/
export class MyInterface extends CGFinterface {
    constructor() {
        super();
    }

    init(application) {
        // call CGFinterface init
        super.init(application);
       
        // init GUI. For more information on the methods, check:
        // https://github.com/dataarts/dat.gui/blob/master/API.md
        this.gui = new dat.GUI();

        this.gui.add(this.scene, 'displayAxis').name("Display axis");
        this.gui.add(this.scene, 'displayNormals').name("Display normals").onChange(this.scene.updateNormalViz.bind(this.scene));;
        // similar but for light 1
        var f1 = this.gui.addFolder('Light');
        f1.add(this.scene.lights[0], 'enabled').name("Enabled Lamp");
        f1.add(this.scene.lights[1], 'enabled').name("Enabled Room");
        f1.add(this.scene.lights[2], 'enabled').name("3rd Light");
        // var sf1 = f1.addFolder('Light Position');
        // sf1.add(this.scene.lights[1].position, '0', -5.0, 5.0).name("X1 Position");
        // sf1.add(this.scene.lights[1].position, '1', -5.0, 5.0).name("Y1 Position");
        // sf1.add(this.scene.lights[1].position, '2', -5.0, 5.0).name("Z1 Position");
        // sf1.add(this.scene.lights[2].position, '0', -20.0, 20.0).name("X2 Position");
        // sf1.add(this.scene.lights[2].position, '1', -20.0, 20.0).name("Y2 Position");
        // sf1.add(this.scene.lights[2].position, '2', -20.0, 20.0).name("Z2 Position");
        // var sf2 = f1.addFolder('Light Attenuation');
        // sf2.add(this.scene.lights[0], 'constant_attenuation', 0.00, 1.00).name("Const. Atten.");
        // sf2.add(this.scene.lights[0], 'linear_attenuation', 0.0, 1.0).name("Linear Atten.");
        // sf2.add(this.scene.lights[0], 'quadratic_attenuation', 0.0, 1.0).name("Quad. Atten.");


      
        return true;
    }


}