import { CGFobject, CGFnurbsObject, CGFnurbsSurface } from "../lib/CGF.js";
/**
 * MyPatch
 * @constructor
 * @param scene - Reference to MyScene object
 * @param npointsU - number of points of the patch on U domain
 * @param npointsV - number of points of the patch on V domain
 * @param npartsU - number of parts of the patch on U domain
 * @param npartsV -- number of parts of the patch on V domain
 * @param controlPoints
 */

export class MyPatch extends CGFobject {
	constructor(scene, npointsU, npointsV, npartsU, npartsV, controlPoints) {
		super(scene);
		this.npointsU = npointsU;
		this.npointsV = npointsV;
		this.npartsU = npartsU;
		this.npartsV = npartsV;
		this.controlPoints = controlPoints;

		this.vertices = [];
		this.indices = [];

		this.creatSurface();
	}

	creatSurface() {

		var nurbSurface = new CGFnurbsSurface(this.npointsU ,this.npointsV ,this.controlPointsAux);

		this.patch = new CGFnurbsObject(this.scene,this.npartsU,this.npartsV,nurbSurface);
	}

	display() {
		this.patch.display();
	}

	/**
	 * @method updateTexCoords
	 * @param {Array} coords - Array of texture coordinates
	 */
	updateTexCoords(s, t) { };
}
