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

		for (y = 0; y < npartsV; y++) {
			for (x = 0; x < npartsU; x++) {
				this.vertices.push((xdiff * x) - 0.5, -(ydiff * y) + 0.5, 0);
				this.texCoords.push(xdiff * x, ydiff * y);
				if (x > 0 && y > 0) {
					this.indices.push(npartsU * y + x, npartsU * (y - 1) + x - 1, npartsU * y + x - 1);
					this.indices.push(npartsU * y + x, npartsU * (y - 1) + x, npartsU * (y - 1) + x - 1);
				}
			}
		}

		this.primitiveType = this.scene.gl.TRIANGLES;
		this.initGLBuffers();
	}

	updateTexCoords(s, t) { }
}