import { CGFobject } from "../lib/CGF.js";
/**
 * MyCylinder2
 * @constructor
 * @param scene  - Reference to MyScene object
 * @param height - size in the direction of the positive Z axis
 * @param top    - (Z = height)
 * @param base   - (Z = 0)
 * @param slices - number of sides around the circumference
 * @param stacks - number of divisions along the Z direction
 */
export class MyCylinder2 extends CGFobject {
  constructor(scene, id, height, top, base, slices, stacks) {
    super(scene);
    this.height = height;
    this.top = top;
    this.base = base;
    this.slices = slices;
    this.stacks = stacks;

    this.initBuffers();
  }

  initBuffers() {
    this.vertices = [];
    this.indices = [];
    this.normals = [];
    this.texCoords = [];

    var ang = (2.0 * Math.PI) / this.slices;

    for (var stack = 0; stack <= this.stacks; stack++) {
      var aux_ang = 0.0;
      var r = (this.top - this.base) * (stack / this.stacks) + this.base;
      var z = (this.height * stack) / this.stacks;

      for (slice = 0; slice <= this.slices; slice++) {
        var x = Math.cos(aux_ang) * r;
        var y = Math.sin(aux_ang) * r;

        this.vertices.push(x, y, z);
        let size = Math.sqrt(Math.pow(x, 2) + Math.pow(y, 2));
        this.normals.push(x / size, y / size, 0);
        // this.normals.push(x, y, 0);

        aux_ang += ang;
      }
    }

    for (var stack = 0; stack < this.stacks; stack++) {
      for (var slice = 0; slice < this.slices; slice++) {
        var i1 = slice + stack * (this.slices + 1);
        var i2 = slice + stack * (this.slices + 1) + 1;
        var i3 = slice + (stack + 1) * (this.slices + 1);
        var i4 = slice + (stack + 1) * (this.slices + 1) + 1;
        this.indices.push(i4, i3, i1);
        this.indices.push(i1, i2, i4);
      }
    }

    for (var stack = 0; stack <= this.stacks; stack++) {
      for (var slice = 0; slice <= this.slices; slice++) {
        this.texCoords.push(1 - slice / this.slices, 1 - stack / this.stacks);
      }
    }

    this.primitiveType = this.scene.gl.TRIANGLES;
    //this.enableNormalViz();
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
