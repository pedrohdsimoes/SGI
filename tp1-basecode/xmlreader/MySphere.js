import { CGFobject } from "../lib/CGF.js";
/**
 * MySphere
 * @constructor
 * @param scene  - Reference to MyScene object
 * @param radius - radius of the sphere
 * @param slices - number of sides around the Z axis
 * @param stacks - number of divisions from the center to the poles (half of sphere)
 */

export class MySphere extends CGFobject {
	constructor(scene, id, radius, slices, stacks) {
		super(scene);
		this.id = id;
		this.radius = radius;
		this.slices = slices;
		this.stacks = stacks;

		this.vertices = [];
		this.indices = [];
		this.texCoords = [];

		this.initBuffers();
	}

	// Creates vertices, indices, normals and texCoords

	initBuffers() {
		const s = (2 * Math.PI) / this.slices;
		const l = Math.PI / this.stacks;

		for (let i = 0; i <= this.stacks; i++) {
			for (let j = 0; j <= this.slices; j++) {
				this.vertices.push(
					this.radius * Math.cos(s * j) * Math.sin(l * i),
					this.radius * Math.cos(l * i),
					this.radius * Math.sin(s * j) * Math.sin(l * i)
				);

				if (i != this.stacks && j != this.slices) {
					this.indices.push(
						i * (this.slices + 1) + j,
						i * (this.slices + 1) + j + this.slices + 2,
						i * (this.slices + 1) + j + this.slices + 1
					);
					this.indices.push(
						i * (this.slices + 1) + j,
						i * (this.slices + 1) + j + 1,
						i * (this.slices + 1) + j + 2 + this.slices
					);
				}

				this.texCoords.push(
					1 - i * (1 / this.stacks),
					1 - j * (1 / this.slices)
				);
			}
		}

		this.primitiveType = this.scene.gl.TRIANGLES;
		this.initGLBuffers();
	}

	updateTexCoords(s, t) { }
}
