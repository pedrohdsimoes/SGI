import { CGFobject } from "../lib/CGF.js";
/**
 * MyCylinder
 * @constructor
 * @param scene  - Reference to MyScene object
 * @param height - size in the direction of the positive Z axis
 * @param top    - (Z = height)
 * @param base   - (Z = 0)
 * @param slices - number of sides around the circumference
 * @param stacks - number of divisions along the Z direction
 */
export class MyCylinder extends CGFobject {
	constructor(scene, id, height, top, base, slices, stacks) {
		super(scene);
		this.slices = slices;
		this.stacks = stacks;
		this.height = height;
		this.base = base;
		this.top = top;

		this.initBuffers();
	}

	initBuffers() {
		this.vertices = [];
		this.indices = [];
		this.normals = [];
		this.texCoords = [];

		var radiusDif = this.base - this.top;
		let ang = 0;
		var alphaAng = (2 * Math.PI) / this.slices;
		this.stackHeight = this.height / this.stacks;
		let radius = this.base;
		this.pointsPerStack = this.slices + 1;

		for (let x = 0; x <= this.stacks; x++) {
			ang = 0;
			for (let i = 0; i < this.pointsPerStack; i++) {
				this.vertices.push(
					radius * Math.cos(ang),
					-Math.sin(ang) * radius,
					this.stackHeight * x
				);
				if (x > 0 && i > 0) {
					this.indices.push(
						(x - 1) * this.pointsPerStack + i - 1,
						x * this.pointsPerStack + i - 1,
						x * this.pointsPerStack + i
					);
					this.indices.push(
						(x - 1) * this.pointsPerStack + i - 1,
						x * this.pointsPerStack + i,
						(x - 1) * this.pointsPerStack + i
					);
				}

				this.texCoords.push(-(i / this.slices), -(x * this.stacks));
				ang += alphaAng;
			}
			radius -= radiusDif / this.stacks;
		}

		this.primitiveType = this.scene.gl.TRIANGLES;
		this.initGLBuffers();
	}

	updateTexCoords(s, t) {
		// this.texCoords = [];
		// for (var x = 0; x <= this.stacks; x++) {
		// 	for (var i = 0; i < this.pointsPerStack; i++) {
		// 		this.texCoords.push(i / this.slices / s, (x * this.stacks) / t);
		// 	}
		// }
	}
}
