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
		this.scene = scene;
		this.npartsU = npartsU;
		this.npartsV = npartsV;

		this.initBuffers();
	}

	initBuffers() {

		this.controlPoints = [	// U = 0
			[	// V = 0..1
				[-0.5, -0.5, 0.0, 0.5],
				[-0.5, 0.5, 0.0, 0.5]

			],
			// U = 1
			[ // V = 0..1
				[0.5, -0.5, 0.0, 0.5],
				[0.5, 0.5, 0.0, 0.5]
			]
		];

		this.nurbsSurface = new CGFnurbsSurface(1, 1, this.controlPoints);

		this.object = new CGFnurbsObject(this.scene, this.npartsU, this.npartsV, this.nurbsSurface);

	}

	display() {
		this.object.display();
	}

	updateTexCoords(s, t) { }
}