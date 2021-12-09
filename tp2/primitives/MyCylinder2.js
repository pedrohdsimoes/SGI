import { CGFobject, CGFnurbsObject, CGFnurbsSurface } from "../lib/CGF.js";

/**
 * MyCylinder2
 * @constructor
 * @param scene  - Reference to MyScene object
 * @param height - size in the direction of the positive Z axis
 * @param top    - (Z = height)
 * @param base   - (Z = 0)
 * @param slices - parts per section
 * @param stacks - sections along height
 */
export class MyCylinder2 extends CGFobject {
	constructor(scene, id, slices, stacks, height, base, top) {
		super(scene);
		this.height = height;
		this.top = top;
		this.base = base;
		this.slices = slices;
		this.stacks = stacks;

		this.initBuffers();
	}

	initBuffers() {
		this.controlPoints = [
			[
				[-this.top, 0.0, this.height, 1],
				[-this.base, 0.0, 0.0, 1]
			],
			[
				[-this.top, (4 / 3) * this.top, this.height, 1],
				[-this.base, (4 / 3) * this.base, 0.0, 1]
			],
			[
				[this.top, (4 / 3) * this.top, this.height, 1],
				[this.base, (4 / 3) * this.base, 0.0, 1]
			],
			[
				[this.top, 0.0, this.height, 1],
				[this.base, 0.0, 0.0, 1]
			]
		];

		this.surface = new CGFnurbsSurface(3, 1, this.controlPoints);

		this.cylin2 = new CGFnurbsObject(this.scene, this.slices/2, this.stacks, this.surface);

	}

	display() {

		this.cylin2.display();
		this.scene.pushMatrix();
		this.scene.rotate(Math.PI, 0.0, 0.0, 1.0);
		this.cylin2.display();
		this.scene.popMatrix();
	}

	updateTexCoords(s,t) { }
}
