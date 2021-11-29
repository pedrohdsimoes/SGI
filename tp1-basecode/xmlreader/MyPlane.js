import { CGFobject, CGFnurbsObject, CGFnurbsSurface } from "../lib/CGF.js";
/**
 * MyPlane
 * @constructor
 * @param scene - Reference to MyScene object
 * @param npartsU - divisões na direção U
 * @param npartsV - divisões na direção V
 */

export class MyPlane extends CGFobject {
  constructor(scene, id, npartsU, npartsV) {
    super(scene);
    this.vertices = [];
    this.indices = [];
    this.texCoords = [];

    this.initBuffers(npartsU + 1, npartsV + 1);
  }

  initBuffers(npartsU, npartsV) {
    let x, y;
    var xdiff = 1.0 / (npartsU - 1);
    var ydiff = 1.0 / (npartsV - 1);

    for (y = 0; y < v; y++) {
      for (x = 0; x < u; x++) {
        this.vertices.push(xdiff * x, 0, ydiff * y);
        this.texCoords.push(xdiff * x, ydiff * y);
        if (x > 0 && y > 0) {
          this.indices.push(u * y + x, u * (y - 1) + x - 1, u * y + x - 1);
          this.indices.push(u * y + x, u * (y - 1) + x, u * (y - 1) + x - 1);
        }
      }
    }

    this.primitiveType = this.scene.gl.TRIANGLES;
    this.initGLBuffers();
  }

  updateTexCoords(s, t) {}
}