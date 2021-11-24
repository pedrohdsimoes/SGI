import { CGFobject } from "../lib/CGF.js";
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
    this.npartsU = npartsU;
    this.npartsV = npartsV;

    this.initBuffers();
  }

  initBuffers() {
    this.nurbsSurface = [
      // U = 0
      // V = [0..1]
      [
        [-0.5, 0.0, 0.5, 1],
        [-0.5, 0.0, -0.5, 1],
      ][
        // U = 1
        ([0.5, 0.0, 0.5, 1], [0.5, 0.0, -0.5, 1])
      ],
    ];

    let nurbs = new CGFnurbsSurface(1, 1, this.nurbsSurface);

    this.plane = new CGFnurbsObject(
      this.scene,
      this.nPartsU,
      this.nPartsV,
      nurbs
    );

    this.primitiveType = this.scene.gl.TRIANGLES;
    this.initGLBuffers();
  }

  //   display() {
  //     this.plane.display();
  //   }

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
