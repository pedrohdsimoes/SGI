import { CGFobject, CGFnurbsObject, CGFnurbsSurface } from "../../lib/CGF.js";
/**
 * MyPatch
 * @constructor
 * @param scene - Reference to MyScene object
 * @param npointsU - number of points of the patch on U domain
 * @param npointsV - number of points of the patch on V domain
 * @param npartsU - number of parts of the patch on U domain
 * @param npartsV - number of parts of the patch on V domain
 * @param controlPoints - control points
 */

export class MyPatch extends CGFobject {
	constructor(scene, id, npointsU, npointsV, npartsU, npartsV, controlPoints) {
		super(scene);
		this.npointsU = npointsU;
		this.npointsV = npointsV;
		this.npartsU = npartsU;
		this.npartsV = npartsV;
		this.controlPoints = controlPoints;

		this.initBuffers();
	}

	initBuffers() {

		this.controlPointsAux = [];

		for (var i = 0; i < this.npointsU; i++) {
			var point = [];
			for (var j = 0; j < this.npointsV; j++) {
				point.push([
					this.controlPoints[i * this.npointsV + j][0],
					this.controlPoints[i * this.npointsV + j][1],
					this.controlPoints[i * this.npointsV + j][2],
					1]);
			}
			this.controlPointsAux.push(point);
		}

		this.surface = new CGFnurbsSurface(this.npointsU - 1, this.npointsV - 1, this.controlPointsAux);

		this.patch = new CGFnurbsObject(this.scene, this.npartsU, this.npartsV, this.surface);

	}

	display() {
		this.patch.display();
	}

	updateTexCoords(s, t) {
	};
}