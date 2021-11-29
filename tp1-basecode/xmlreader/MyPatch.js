import { CGFobject, CGFnurbsObject, CGFnurbsSurface } from "../lib/CGF.js";
/**
 * MyPatch
 * @constructor
 * @param scene - Reference to MyScene object
 * @param pointsU
 * @param pointsV
 * @param npartsU - divisões na direção U
 * @param npartsV - divisões na direção V
 * @param controlPoints
 */

export class MyPatch extends CGFobject {
  constructor(scene, pointsU, pointsV, npartsU, npartsV, controlPoints) {
    super(scene);
    this.pointsU = pointsU;
    this.pointsV = pointsV;
    this.npartsU = npartsU;
    this.npartsV = npartsV;
    this.controlPoints = controlPoints;

    this.vertices = [];
    this.indices = [];

    this.initBuffers();
  }

  initBuffers() {
    this.controlPointsAux = [];

    for (var i = 0; i < this.pointsU; i++) {
      var point = [];
      for (var j = 0; j < this.pointsV; j++) {
        point.push([
          this.controlPoints[i * this.pointsV + j][0],
          this.controlPoints[i * this.pointsV + j][1],
          this.controlPoints[i * this.pointsV + j][2],
          1,
        ]);
      }
      this.controlPointsAux.push(point);
    }

    var nurbSurface = new CGFnurbsSurface(this.pointsU-1, this.pointsV - 1, this.controlPointsAux);

    this.plane = new CGFnurbsObject(
      this.scene,
      this.npartsU,
      this.npartsV,
      nurbSurface
    );
  }

  /**
   * @method updateTexCoords
   * @param {Array} coords - Array of texture coordinates
   */
  updateTexCoords(s,t) {
  }
}
