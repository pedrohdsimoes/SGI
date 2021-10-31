import {CGFobject} from '../lib/CGF.js';
/**
* MyQuad
* @constructor
 * @param scene - Reference to MyScene object
*/
export class MyTriangule extends CGFobject {
    constructor(scene) {
        super(scene);
        this.initBuffers();
    }

    initBuffers() {

        // Generate vertices
        this.vertices = [
            -0.5, 0.5, 0.0, // ignorado pq indices = 1,2,3
            -0.5, -0.70710678118655, 0.0,
            0.0, 0.0, 0.0,
            0.5, -0.70710678118655, 0.0
        ];
      
        this.indices = [
            3,2,1
        ];

        this.normals = [
            0,0,1,
            0,0,1,
            0,0,1,
            0,0,1
        ];

        this.primitiveType = this.scene.gl.TRIANGLES;
        this.initGLBuffers();
    }
}