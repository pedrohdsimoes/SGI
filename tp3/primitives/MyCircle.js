import {
    CGFobject
} from "../../lib/CGF.js";
/**
 * MyCircle
 * @constructor
 * @param scene - Reference to MyScene object
 * @param radius - radius of the circle 
 * @param slices - parts per section
 */

export class MyCircle extends CGFobject {
    constructor(scene, id, radius, slices) {
        super(scene);
        this.slices = slices;
        this.radius = radius;

        this.initBuffers();
    }

    initBuffers() {
        this.vertices = [];
        this.indices = [];
        this.texCoords = [];

        var ang = (2 * Math.PI / this.slices);

        for (var i = 0; i <= this.slices; i++) {
            //vertices 
            this.vertices.push(Math.cos(ang * i) * this.radius, Math.sin(ang * i) * this.radius, 0);
            //indices
            this.indices.push(0, i, i + 1);
            //texCoords
            this.texCoords.push((Math.cos(ang * (i + 1)) + 1) / 2, 1 - (Math.sin(ang * (i + 1)) + 1) / 2);
        }

        this.primitiveType = this.scene.gl.TRIANGLES;
        this.initGLBuffers();
    }

    /**
     * @method updateTexCoords
     * Updates the list of texture coordinates of the rectangle
     * @param {Array} coords - Array of texture coordinates
     */
    updateTexCoords(s,t) {
    }
}