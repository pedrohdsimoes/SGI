import { CGFobject, CGFnurbsObject, CGFnurbsSurface } from "../lib/CGF.js";
/**
 * MyPlane
 * @constructor
 * @param scene - Reference to MyScene object
 * @param npartsU - divisões na direção U
 * @param npartsV - divisões na direção V
 */

export class MyPlane extends CGFobject {
  constructor(scene, npartsU, npartsV) {
    super(scene);
    this.npartsU = npartsU;
    this.npartsV = npartsV;

    this.initBuffers();
    this.defineNurb();
  }

  initBuffers() {
    this.initControlPoints = [
      [
        [0.5, 0.0, -0.5, 1],
        [0.5, 0.0, 0.5, 1],
      ],
      [ 
        [-0.5, 0.0, -0.5, 1],
        [-0.5, 0.0, 0.5, 1],
      ]

    ];
  }

    defineNurb() {
      var nurbSurface =
          new CGFnurbsSurface(1,1, this.controlPoints);
  
      this.nurbObject =
          new CGFnurbsObject(this.scene, this.uDivs, this.vDivs, nurbSurface);
    }
}
