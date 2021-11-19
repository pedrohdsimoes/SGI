import { CGFobject } from "../lib/CGF.js";
/**
 * MySphere
 * @constructor
 * @param scene  - Reference to MyScene object
 * @param radius - radius of the sphere
 * @param slices - number of sides around the Z axis
 * @param stacks - number of divisions from the center to the poles (half of sphere)
 */
export class MySphere extends CGFobject {
  constructor(scene, id, radius, slices, stacks) {
    super(scene);
    this.radius = radius;
    this.latDivs = stacks * 2;
    this.longDivs = slices;

    this.initBuffers();
  }

    initBuffers() {
        this.vertices = [];
        this.indices = [];
        this.normals = [];
        this.texCoords = [];
    
        
        
        
        
        
        
        this.primitiveType = this.scene.gl.TRIANGLES;
        this.initGLBuffers();
  }

  /**
   * @method updateTexCoords
   * Updates the list of texture coordinates of the rectangle
   * @param {Array} coords - Array of texture coordinates
   */
  updateTexCoords(coords) {
    this.texCoords = [...coords];
    this.updateTexCoordsGLBuffers();
  }
}
