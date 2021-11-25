import { CGFobject } from "../lib/CGF.js";
/**
 * MyComponent
 * @constructor
 * @param scene - Reference to MyScene object
 * @param id
 * @param transformation
 * @param materials
 * @param texture
 * @param length_s
 * @param length_t
 * @param children
 * @param leaves
 */
export class MyComponent extends CGFobject {
  constructor(scene,id,transformation,materials,texture,length_s,length_t,children,leaves) {
    super(scene);
    this.scene = scene;
    this.id = id;
    this.transformation = transformation;
    this.materials = materials;
    this.currentMaterialIndex = 0;
    this.currentMaterialID = this.materials[0];
    this.texture = texture;
    this.length_s = length_s;
    this.length_t = length_t;
    this.children = children;
    this.leaves = leaves;
  }

  updateMaterial() {
    this.currentMaterialIndex++;
    if (this.currentMaterialIndex == this.materials.length)
        this.currentMaterialIndex = 0;
      
    this.currentMaterialID = this.materials[this.currentMaterialIndex];
  }
}