import { CGFobject } from "../lib/CGF.js";
/**
 * MyTriangle
 * @constructor
 * @param scene - Reference to MyScene object
 * @param x1 - x coordinate of the 1st vertex
 * @param y1 - y coordinate of the 1st vertex
 * @param z1 - z coordinate of the 1st vertex
 * @param x2 - x coordinate of the 2nd vertex
 * @param y2 - y coordinate of the 2nd vertex
 * @param z2 - z coordinate of the 2nd vertex
 * @param x3 - x coordinate of the 3rd vertex
 * @param y3 - y coordinate of the 3rd vertex
 * @param z3 - z coordinate of the 3rd vertex
 */

export class MyTriangle extends CGFobject {
	constructor(scene, id, x1, y1, z1, x2, y2, z2, x3, y3, z3) {
		super(scene);
		this.x1 = x1;
		this.y1 = y1;
		this.z1 = z1;
		this.x2 = x2;
		this.y2 = y2;
		this.z2 = z2;
		this.x3 = x3;
		this.y3 = y3;
		this.z3 = z3;

		this.initBuffers();
	}

	initBuffers() {
		this.vertices = [
			this.x1, this.y1, this.z1, // 0
			this.x2, this.y1, this.z2, // 1
			this.x3, this.y3, this.z3, // 2
			this.x1, this.y1, this.z1, // 0
			this.x2, this.y1, this.z2, // 1
			this.x3, this.y3, this.z3, // 2
		];

		this.indices = [
			0, 1, 2,
			0, 2, 1,
		];

		// Distance calculation between vertices
		this.a = Math.sqrt(Math.pow(this.x2 - this.x1, 2) + Math.pow(this.y2 - this.y1, 2) + Math.pow(this.z2 - this.z1, 2));
		this.b = Math.sqrt(Math.pow(this.x3 - this.x2, 2) + Math.pow(this.y3 - this.y2, 2) + Math.pow(this.z3 - this.z2, 2));
		this.c = Math.sqrt(Math.pow(this.x1 - this.x3, 2) + Math.pow(this.y1 - this.y3, 2) + Math.pow(this.z1 - this.z3, 2));

		this.cos = (Math.pow(this.a, 2) - Math.pow(this.b, 2) + Math.pow(this.c, 2)) / (2 * this.a * this.c);
		this.sin = Math.sqrt(1 - Math.pow(this.cos, 2));

		this.textCoords = [
			0, 0,
			this.a, 0,
			this.c * this.cos, this.c * this.sin,
			1, 0,
			1 - this.a, 0,
			1 - this.c * this.cos, this.c * this.sin
		];

		this.primitiveType = this.scene.gl.TRIANGLES;
		this.initGLBuffers();
	}

	/**
	 * @method updateTexCoords
	 * Updates the list of texture coordinates of the rectangle
	 * @param {Array} coords - Array of texture coordinates
	 */

	updateTexCoords(s, t) {

		this.texCoords = [
			0, 0,
			this.a / s, 0,
			(this.c * this.cos) / s, (this.c * this.sin) / t,
			1, 0,
			1 - this.a / s, 0,
			1 - this.c * this.cos / s, this.c * this.sin / t
		];

		this.updateTexCoordsGLBuffers();
	}
}