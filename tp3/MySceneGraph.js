import {
	CGFXMLreader,
	CGFappearance,
	CGFtexture,
	CGFcamera,
	CGFcameraOrtho
} from "../lib/CGF.js";

import {
	MyCircle
} from "./primitives/MyCircle.js";
import {
	MyRectangle
} from "./primitives/MyRectangle.js";
import {
	MyTriangle
} from "./primitives/MyTriangle.js";
import {
	MyCylinder
} from "./primitives/MyCylinder.js";
import {
	MySphere
} from "./primitives/MySphere.js";
import {
	MyPlane
} from "./primitives/MyPlane.js";
import {
	MyPatch
} from "./primitives/MyPatch.js";
import {
	MyCylinder2
} from "./primitives/MyCylinder2.js";
import {
	MyComponent
} from "./MyComponent.js";
import {
	MyObstacle
} from "./elements/MyObstacle.js";
var DEGREE_TO_RAD = Math.PI / 180;

// Order of the groups in the XML document.
var SCENE_INDEX = 0;
var VIEWS_INDEX = 1;
var AMBIENT_INDEX = 2;
var LIGHTS_INDEX = 3;
var TEXTURES_INDEX = 4;
var MATERIALS_INDEX = 5;
var TRANSFORMATIONS_INDEX = 6;
var PRIMITIVES_INDEX = 7;
var COMPONENTS_INDEX = 8;

/**
 * MySceneGraph class, representing the scene graph.
 */
export class MySceneGraph {
	/**
	 * @constructor
	 */
	constructor(filename, scene) {
		this.loadedOk = null;

		// Establish bidirectional references between scene and graph.
		this.scene = scene;
		scene.graph = this;

		this.nodes = [];

		this.idRoot = null; // The id of the root element.

		this.axisCoords = [];
		this.axisCoords["x"] = [1, 0, 0];
		this.axisCoords["y"] = [0, 1, 0];
		this.axisCoords["z"] = [0, 0, 1];

		// File reading
		this.reader = new CGFXMLreader();

		/*
		 * Read the contents of the xml file, and refer to this class for loading and error handlers.
		 * After the file is read, the reader calls onXMLReady on this object.
		 * If any error occurs, the reader calls onXMLError on this object, with an error message
		 */
		this.reader.open("scenes/" + filename, this);
	}

	/*
	 * Callback to be executed after successful reading
	 */
	onXMLReady() {
		this.log("XML Loading finished.");
		var rootElement = this.reader.xmlDoc.documentElement;

		// Here should go the calls for different functions to parse the various blocks
		var error = this.parseXMLFile(rootElement);

		if (error != null) {
			this.onXMLError(error);
			return;
		}

		this.loadedOk = true;

		// As the graph loaded ok, signal the scene so that any additional initialization depending on the graph can take place
		this.scene.onGraphLoaded();
	}

	/**
	 * Parses the XML file, processing each block.
	 * @param {XML root element} rootElement
	 */
	parseXMLFile(rootElement) {
		if (rootElement.nodeName != "SXG") return "root tag <SXG> missing";

		var nodes = rootElement.children;

		// Reads the names of the nodes to an auxiliary buffer.
		var nodeNames = [];

		for (let i = 0; i < nodes.length; i++) {
			nodeNames.push(nodes[i].nodeName);
		}

		var error;

		// Processes each node, verifying errors.

		// <scene>
		var index;
		if ((index = nodeNames.indexOf("scene")) == -1)
			return "tag <scene> missing";
		else {
			if (index != SCENE_INDEX)
				this.onXMLMinorError("tag <scene> out of order " + index);

			//Parse scene block
			if ((error = this.parseScene(nodes[index])) != null) return error;
		}

		// <views>
		if ((index = nodeNames.indexOf("views")) == -1)
			return "tag <views> missing";
		else {
			if (index != VIEWS_INDEX)
				this.onXMLMinorError("tag <views> out of order");

			//Parse views block
			if ((error = this.parseView(nodes[index])) != null) return error;
		}

		// <ambient>
		if ((index = nodeNames.indexOf("ambient")) == -1)
			return "tag <ambient> missing";
		else {
			if (index != AMBIENT_INDEX)
				this.onXMLMinorError("tag <ambient> out of order");

			//Parse ambient block
			if ((error = this.parseAmbient(nodes[index])) != null) return error;
		}

		// <lights>
		if ((index = nodeNames.indexOf("lights")) == -1)
			return "tag <lights> missing";
		else {
			if (index != LIGHTS_INDEX)
				this.onXMLMinorError("tag <lights> out of order");

			//Parse lights block
			if ((error = this.parseLights(nodes[index])) != null) return error;
		}
		// <textures>
		if ((index = nodeNames.indexOf("textures")) == -1)
			return "tag <textures> missing";
		else {
			if (index != TEXTURES_INDEX)
				this.onXMLMinorError("tag <textures> out of order");

			//Parse textures block
			if ((error = this.parseTextures(nodes[index])) != null) return error;
		}

		// <materials>
		if ((index = nodeNames.indexOf("materials")) == -1)
			return "tag <materials> missing";
		else {
			if (index != MATERIALS_INDEX)
				this.onXMLMinorError("tag <materials> out of order");

			//Parse materials block
			if ((error = this.parseMaterials(nodes[index])) != null) return error;
		}

		// <transformations>
		if ((index = nodeNames.indexOf("transformations")) == -1)
			return "tag <transformations> missing";
		else {
			if (index != TRANSFORMATIONS_INDEX)
				this.onXMLMinorError("tag <transformations> out of order");

			//Parse transformations block
			if ((error = this.parseTransformations(nodes[index])) != null)
				return error;
		}

		// <primitives>
		if ((index = nodeNames.indexOf("primitives")) == -1)
			return "tag <primitives> missing";
		else {
			if (index != PRIMITIVES_INDEX)
				this.onXMLMinorError("tag <primitives> out of order");

			//Parse primitives block
			if ((error = this.parsePrimitives(nodes[index])) != null) return error;
		}

		// <components>
		if ((index = nodeNames.indexOf("components")) == -1)
			return "tag <components> missing";
		else {
			if (index != COMPONENTS_INDEX)
				this.onXMLMinorError("tag <components> out of order");

			//Parse components block
			if ((error = this.parseComponents(nodes[index])) != null) return error;

		}
		this.log("All parsed");
	}

	/**
	 * Parses the <scene> block.
	 * @param {scene block element} sceneNode
	 */
	parseScene(sceneNode) {
		// Get root of the scene.
		var root = this.reader.getString(sceneNode, "root");
		if (root == null) return "no root defined for scene";

		this.idRoot = root;

		// Get axis length
		var axis_length = this.reader.getFloat(sceneNode, "axis_length");
		if (axis_length == null)
			this.onXMLMinorError("no axis_length defined for scene; assuming 'length = 1'");

		this.referenceLength = axis_length || 1;

		this.log("Parsed scene");

		return null;
	}

	/**
	 * Parses the <views> block.
	 * @param {view block element} viewsNode
	 */
	parseView(viewsNode) {
		var from;
		var to;
		var up;
		var cam;
		this.views = [];
		var children = viewsNode.children;
		var view;

		this.defaultCameraId = this.reader.getString(viewsNode, "default");

		// if there isn't a default camera
		if (this.defaultCameraId == null)
			this.onXMLError("[VIEWS] No default view defined, using a default");

		if (children.length == 0) this.onXMLError("No views found");

		for (let i = 0; i < children.length; i++) {
			view = children[i];

			// get the view id
			var viewId = this.reader.getString(view, "id");

			// perspective view
			if (view.nodeName == "perspective") {
				// near
				var near = this.reader.getFloat(view, "near");
				if (!(near != null && !isNaN(near)))
					return "unable to parse near of the view for ID = " + viewId;

				// far
				var far = this.reader.getFloat(view, "far");
				if (!(far != null && !isNaN(far)))
					return "unable to parse far of the view for ID = " + viewId;

				// angle
				var angle = this.reader.getFloat(view, "angle");
				if (!(angle != null && !isNaN(angle)))
					return "unable to parse angle of the view for ID = " + viewId;

				var viewchildren = view.children;

				//from
				if (viewchildren[0].nodeName != "from")
					return "unable to parse from of the view for ID = " + viewId;

				from = this.parseCoordinates3D(
					viewchildren[0],
					"from of the view for ID = " + viewId
				);

				//to
				if (viewchildren[1].nodeName != "to")
					return "unable to parse to of the view for ID = " + viewId;

				to = this.parseCoordinates3D(
					viewchildren[1],
					"to of the view for ID = " + viewId
				);

				cam = new CGFcamera(angle * DEGREE_TO_RAD, near, far, from, to);

				this.views[viewId] = cam;
			}
			// ortho view
			else if (view.nodeName == "ortho") {
				// near
				near = this.reader.getFloat(view, "near");
				if (!(near != null && !isNaN(near)))
					return "unable to parse near of the view for ID = " + viewId;

				// far
				far = this.reader.getFloat(view, "far");
				if (!(far != null && !isNaN(far)))
					return "unable to parse far of the view for ID = " + viewId;

				//left
				var left = this.reader.getFloat(view, "left");
				if (!(left != null && !isNaN(left)))
					return "unable to parse left of the view for ID = " + viewId;

				//right
				var right = this.reader.getFloat(view, "right");
				if (!(right != null && !isNaN(right)))
					return "unable to parse right of the view for ID = " + viewId;

				//top
				var top = this.reader.getFloat(view, "top");
				if (!(top != null && !isNaN(top)))
					return "unable to parse top of the view for ID = " + viewId;

				//bottom
				var bottom = this.reader.getFloat(view, "bottom");
				if (!(bottom != null && !isNaN(bottom)))
					return "unable to parse bottom of the view for ID = " + viewId;

				viewchildren = view.children;

				//from
				if (viewchildren[0].nodeName != "from")
					return "unable to parse from of the view for ID = " + viewId;

				from = this.parseCoordinates3D(
					viewchildren[0],
					"from of the view for ID = " + viewId);

				//to
				if (viewchildren[1].nodeName != "to")
					return "unable to parse to of the view for ID = " + viewId;
				to = this.parseCoordinates3D(
					viewchildren[1],
					"to of the view for ID = " + viewId);

				//up
				if (viewchildren.length == 3) {
					if (viewchildren[1].nodeName != "up")
						return "unable to parse up of the view for ID = " + viewId;
					up = this.parseCoordinates3D(viewchildren[1], "up of the view for ID = " + viewId);
				} else {
					up = [0, 1, 0];
				}

				cam = new CGFcameraOrtho(left, right, bottom, top, near, far, from, to, up);

				this.views[viewId] = cam;
			} else this.onXMLError("View not identified");
		}

		this.log("Parsed views");
		return null;
	}

	/**
	 * Parses the <ambient> node.
	 * @param {ambient block element} ambientsNode
	 */
	parseAmbient(ambientsNode) {
		var children = ambientsNode.children;

		this.ambient = [];
		this.background = [];
		var nodeNames = [];

		for (var i = 0; i < children.length; i++)
			nodeNames.push(children[i].nodeName);

		var ambientIndex = nodeNames.indexOf("ambient");
		var backgroundIndex = nodeNames.indexOf("background");

		var color = this.parseColor(children[ambientIndex], "ambient");
		if (!Array.isArray(color))
			return color;
		else this.ambient = color;

		color = this.parseColor(children[backgroundIndex], "background");

		if (!Array.isArray(color))
			return color;
		else this.background = color;

		this.log("Parsed ambient");

		return null;
	}

	/**
	 * Parses the <light> node.
	 * @param {lights block element} lightsNode
	 */
	parseLights(lightsNode) {
		var children = lightsNode.children;

		var grandChildren = [];
		var nodeNames = [];
		this.lights = [];
		var numLights = 0;

		// Any number of lights.
		for (var i = 0; i < children.length; i++) {
			// Storing light information
			var global = [];
			var attributeNames = [];
			var attributeTypes = [];

			// Check type of light
			if (children[i].nodeName != "omni" && children[i].nodeName != "spot") {
				this.onXMLMinorError("unknown tag <" + children[i].nodeName + ">");
				continue;
			} else {
				attributeNames.push(...["location", "ambient", "diffuse", "specular"]);
				attributeTypes.push(...["position", "color", "color", "color"]);
			}

			// Get id of the current light.
			var lightId = this.reader.getString(children[i], "id");
			if (lightId == null)
				return "no ID defined for light";

			// Checks for repeated IDs.
			if (this.lights[lightId] != null)
				return ("ID must be unique for each light (conflict: ID = " + lightId + ")");

			// Light enable/disable
			var enableLight = true;
			var aux = this.reader.getBoolean(children[i], "enabled");

			if (!(aux != null && !isNaN(aux)))
				this.onXMLMinorError("unable to parse value component of the 'enable light' field for ID = " + lightId + "; assuming 'value = 1'");

			enableLight = aux || 1;

			//Add enabled boolean and type name to light info
			global.push(enableLight);
			global.push(children[i].nodeName);

			grandChildren = children[i].children;

			// Specifications for the current light.
			nodeNames = [];

			for (var j = 0; j < grandChildren.length; j++) {
				nodeNames.push(grandChildren[j].nodeName);
			}

			for (j = 0; j < attributeNames.length; j++) {
				var attributeIndex = nodeNames.indexOf(attributeNames[j]);

				if (attributeIndex != -1) {
					if (attributeTypes[j] == "position")
						aux = this.parseCoordinates4D(grandChildren[attributeIndex], "light position for ID" + lightId);
					else
						aux = this.parseColor(grandChildren[attributeIndex], attributeNames[j] + " illumination for ID" + lightId);

					if (!Array.isArray(aux))
						return aux;

					global.push(aux);
				} else
					return ("light " + attributeNames[i] + " undefined for ID = " + lightId);
			}

			// Gets the additional attributes of the spot light
			if (children[i].nodeName == "spot") {
				var angle = this.reader.getFloat(children[i], "angle");
				if (!(angle != null && !isNaN(angle)))
					return "unable to parse angle of the light for ID = " + lightId;

				var exponent = this.reader.getFloat(children[i], "exponent");
				if (!(exponent != null && !isNaN(exponent)))
					return "unable to parse exponent of the light for ID = " + lightId;

				var targetIndex = nodeNames.indexOf("target");

				// Retrieves the light target.
				var targetLight = [];
				if (targetIndex != -1) {
					aux = this.parseCoordinates3D(grandChildren[targetIndex], "target light for ID " + lightId);
					if (!Array.isArray(aux))
						return aux;

					targetLight = aux;
				} else
					return "light target undefined for ID = " + lightId;

				global.push(...[angle, exponent, targetLight]);
			}

			this.lights[lightId] = global;
			numLights++;
		}

		if (numLights == 0)
			return "at least one light must be defined";

		else if (numLights > 8)
			this.onXMLMinorError("too many lights defined; WebGL imposes a limit of 8 lights");

		this.log("Parsed lights");
		return null;
	}

	/**
	 * Parses the <textures> block.
	 * @param {textures block element} texturesNode
	 */
	parseTextures(texturesNode) {
		this.textures = [];
		var children = texturesNode.children;

		if (children.length == 0)
			this.onXMLError("No textures found");

		//For each texture in textures block, check ID and file URL
		for (let i = 0; i < children.length; i++) {
			var textureID = this.reader.getString(children[i], "id");

			if (textureID == null) {
				this.onXMLMinorError("Texture with null ID");
			}

			if (this.textures[textureID] != null) {
				this.onXMLMinorError("Texture with ID" + textureID + "already in use");
			}

			var textureFile = this.reader.getString(children[i], "file");

			if (textureFile == null) {
				this.onXMLMinorError("Texture with null filepath");
			}

			var tex = new CGFtexture(this.scene, textureFile);
			this.textures[textureID] = tex;
		}

		this.log("Parsed textures");
		return null;
	}

	/**
	 * Parses the <materials> node.
	 * @param {materials block element} materialsNode
	 */
	parseMaterials(materialsNode) {
		var children = materialsNode.children;
		this.materials = [];

		if (children.length == 0)
			this.onXMLError("No materials found");

		var grandChildren = [];

		// Any number of materials.
		for (var i = 0; i < children.length; i++) {
			if (children[i].nodeName != "material") {
				this.onXMLMinorError("unknown tag <" + children[i].nodeName + ">");
				continue;
			}

			// Get id of the current material.
			var materialID = this.reader.getString(children[i], "id");

			if (materialID == null)
				return "no ID defined for material";

			// Checks for repeated IDs.
			if (this.materials[materialID] != null)
				return ("ID must be unique for each light (conflict: ID = " + materialID + ")");

			var shininess = this.reader.getFloat(children[i], "shininess");
			if (!(shininess != null && !isNaN(shininess)))
				return ("unable to parse shininess of the material for ID = " + materialID);

			grandChildren = children[i].children;

			if (
				grandChildren[0].nodeName != "emission" ||
				grandChildren[1].nodeName != "ambient" ||
				grandChildren[2].nodeName != "diffuse" ||
				grandChildren[3].nodeName != "specular"
			)
				return ("Material with ID = " + materialID + "has wrong children components ");

			var emission = this.parseColor(grandChildren[0], "emission of the material with ID = " + materialID);
			var ambient = this.parseColor(grandChildren[1], "ambient of the material with ID = " + materialID);
			var diffuse = this.parseColor(grandChildren[2], "diffuse of the material with ID = " + materialID);
			var specular = this.parseColor(grandChildren[3], "specular of the material with ID = " + materialID);

			var material = new CGFappearance(this.scene);

			material.setTextureWrap("REPEAT", "REPEAT");
			material.setShininess(shininess);
			material.setEmission(emission[0], emission[1], emission[2], emission[3]);
			material.setAmbient(ambient[0], ambient[1], ambient[2], ambient[3]);
			material.setDiffuse(diffuse[0], diffuse[1], diffuse[2], diffuse[3]);
			material.setSpecular(specular[0], specular[1], specular[2], specular[3]);

			this.materials[materialID] = material;
		}

		this.log("Parsed materials");
		return null;
	}

	/**
	 * Parses the <transformations> block.
	 * @param {transformations block element} transformationsNode
	 */
	parseTransformations(transformationsNode) {
		var children = transformationsNode.children;

		if (children.length == 0)
			this.onXMLError("No transformations found");

		this.transformations = [];
		var grandChildren = [];

		// Any number of transformations.
		for (let i = 0; i < children.length; i++) {
			if (children[i].nodeName != "transformation") {
				this.onXMLMinorError("unknown tag <" + children[i].nodeName + ">");
				continue;
			}

			// Get id of the current transformation.
			var transformationID = this.reader.getString(children[i], "id");

			if (transformationID == null)
				return "no ID defined for transformation";

			// Checks for repeated IDs.
			if (this.transformations[transformationID] != null)
				return ("ID must be unique for each transformation (conflict: ID = " + transformationID + ")");

			grandChildren = children[i].children;

			if (grandChildren.length == 0)
				this.onXMLError("No transformations found for transformation " + transformationID);

			this.transformations[transformationID] = this.parseTransformationsAux(grandChildren);
		}

		this.log("Parsed transformations");
		return null;
	}

	// Specifications for the current transformation.
	parseTransformationsAux(grandChildren) {
		var transfMatrix = mat4.create();

		for (let j = 0; j < grandChildren.length; j++) {
			var coordinates;
			switch (grandChildren[j].nodeName) {
				case "translate":
					coordinates = this.parseCoordinates3D(grandChildren[j], "translate transformation");

					if (!Array.isArray(coordinates))
						return coordinates;

					transfMatrix = mat4.translate(transfMatrix, transfMatrix, coordinates);
					break;

				case "scale":
					coordinates = this.parseCoordinates3D(grandChildren[j], "scale transformation");

					if (!Array.isArray(coordinates))
						return coordinates;

					transfMatrix = mat4.scale(transfMatrix, transfMatrix, coordinates);
					break;

				case "rotate":
					var axis = this.reader.getString(grandChildren[j], "axis");

					if (axis == null || axis.length != 1)
						return "unable to parse axis of the rotation";

					var angle = this.reader.getFloat(grandChildren[j], "angle");

					if (angle == null || isNaN(angle))
						return "unable to parse angle of the rotation";

					angle = angle * DEGREE_TO_RAD;

					switch (axis) {
						case "x":
							transfMatrix = mat4.rotateX(transfMatrix, transfMatrix, angle);
							break;
						case "y":
							transfMatrix = mat4.rotateY(transfMatrix, transfMatrix, angle);
							break;
						case "z":
							transfMatrix = mat4.rotateZ(transfMatrix, transfMatrix, angle);
							break;
						default:
							return "unable to parse axis of the rotation";
					}
					break;
				default:
					this.onXMLError("The transformation must be one of three types (translate, rotate, scale).");
			}
		}
		return transfMatrix;
	}

	/**
	 * Parses the <primitives> block.
	 * @param {primitives block element} primitivesNode
	 */
	parsePrimitives(primitivesNode) {
		var children = primitivesNode.children;

		if (children.length == 0)
			this.onXMLError("No primitives found");

		this.primitives = [];

		var grandChildren = [];

		// Any number of primitives.
		for (var i = 0; i < children.length; i++) {
			if (children[i].nodeName != "primitive") {
				this.onXMLMinorError("unknown tag <" + children[i].nodeName + ">");
				continue;
			}

			// Get id of the current primitive.
			var primitiveId = this.reader.getString(children[i], "id");
			if (primitiveId == null)
				return "no ID defined for texture";

			// Checks for repeated IDs.
			if (this.primitives[primitiveId] != null)
				return ("ID must be unique for each primitive (conflict: ID = " + primitiveId + ")");

			grandChildren = children[i].children;

			// Validate the primitive type
			if (
				grandChildren.length != 1 ||
				(grandChildren[0].nodeName != "circle" &&
					grandChildren[0].nodeName != "rectangle" &&
					grandChildren[0].nodeName != "triangle" &&
					grandChildren[0].nodeName != "cylinder" &&
					grandChildren[0].nodeName != "sphere" &&
					grandChildren[0].nodeName != "plane" &&
					grandChildren[0].nodeName != "patch" &&
					grandChildren[0].nodeName != "cylinder2")
			) {
				return "There must be exactly 1 primitive type (circle,rectangle, triangle, cylinder, sphere, plane, patch or cylinder2)";
			}

			// Specifications for the current primitive.
			var primitiveType = grandChildren[0].nodeName;

			//   Retrieves the primitive coordinates.

			// RECTANGLE
			if (primitiveType == "rectangle") {
				// x1
				var x1 = this.reader.getFloat(grandChildren[0], "x1");
				if (!(x1 != null && !isNaN(x1)))
					return ("unable to parse x1 of the primitive coordinates for ID = " + primitiveId);

				// y1
				var y1 = this.reader.getFloat(grandChildren[0], "y1");
				if (!(y1 != null && !isNaN(y1)))
					return ("unable to parse y1 of the primitive coordinates for ID = " + primitiveId);

				// x2
				var x2 = this.reader.getFloat(grandChildren[0], "x2");
				if (!(x2 != null && !isNaN(x2) && x2 > x1))
					return ("unable to parse x2 of the primitive coordinates for ID = " + primitiveId);

				// y2
				var y2 = this.reader.getFloat(grandChildren[0], "y2");
				if (!(y2 != null && !isNaN(y2) && y2 > y1))
					return ("unable to parse y2 of the primitive coordinates for ID = " + primitiveId);

				var rect = new MyRectangle(this.scene, primitiveId, x1, x2, y1, y2);

				this.primitives[primitiveId] = rect;
			}

			// CIRCLE
			else if (primitiveType == "circle") {
				// radius
				var radius = this.reader.getFloat(grandChildren[0], "radius");
				if (!(radius != null && !isNaN(radius)))
					return ("unable to parse radius of the primitive coordinates for ID = " + primitiveId);

				var slices = this.reader.getFloat(grandChildren[0], "slices");
				if (!(slices != null && !isNaN(slices)))
					return ("unable to parse slices of the primitive coordinates for ID = " + primitiveId);

				var circ = new MyCircle(this.scene, primitiveId, radius, slices);

				this.primitives[primitiveId] = circ;
			}

			// TRIANGLE
			else if (primitiveType == "triangle") {
				// x1
				x1 = this.reader.getFloat(grandChildren[0], "x1");
				if (!(x1 != null && !isNaN(x1)))
					return ("unable to parse x1 of the primitive coordinates for ID = " + primitiveId);

				// y1
				y1 = this.reader.getFloat(grandChildren[0], "y1");
				if (!(y1 != null && !isNaN(y1)))
					return ("unable to parse y1 of the primitive coordinates for ID = " + primitiveId);

				// z1
				var z1 = this.reader.getFloat(grandChildren[0], "z1");
				if (!(z1 != null && !isNaN(z1)))
					return ("unable to parse z1 of the primitive coordinates for ID = " + primitiveId);

				// x2
				x2 = this.reader.getFloat(grandChildren[0], "x2");
				if (!(x2 != null && !isNaN(x2)))
					// x2 > x1 para ficar voltado para +ZZ
					return ("unable to parse x2 of the primitive coordinates for ID = " + primitiveId);

				// y2
				y2 = this.reader.getFloat(grandChildren[0], "y2");
				if (!(y2 != null && !isNaN(y2)))
					return ("unable to parse y2 of the primitive coordinates for ID = " + primitiveId);

				// z2
				var z2 = this.reader.getFloat(grandChildren[0], "z2");
				if (!(z2 != null && !isNaN(z2)))
					return ("unable to parse z2 of the primitive coordinates for ID = " + primitiveId);

				// x3
				var x3 = this.reader.getFloat(grandChildren[0], "x3");
				if (!(x3 != null && !isNaN(x3)))
					return ("unable to parse x3 of the primitive coordinates for ID = " + primitiveId);

				// y3
				var y3 = this.reader.getFloat(grandChildren[0], "y3");
				if (!(y3 != null && !isNaN(y3)))
					// y3 > 0 para ficar voltado para +ZZ e ser triângulo
					return ("unable to parse y3 of the primitive coordinates for ID = " + primitiveId);

				// z3
				var z3 = this.reader.getFloat(grandChildren[0], "z3");
				if (!(z3 != null && !isNaN(z3)))
					return ("unable to parse z3 of the primitive coordinates for ID = " + primitiveId);

				var triang = new MyTriangle(this.scene, primitiveId, x1, y1, z1, x2, y2, z2, x3, y3, z3);

				this.primitives[primitiveId] = triang;
			}

			// CYLINDER
			else if (primitiveType == "cylinder") {
				// height
				var height = this.reader.getFloat(grandChildren[0], "height");
				if (!(height != null && !isNaN(height)))
					return ("unable to parse height of the primitive coordinates for ID = " + primitiveId);

				// top
				var top = this.reader.getFloat(grandChildren[0], "top");
				if (!(top != null && !isNaN(top)))
					return ("unable to parse top of the primitive coordinates for ID = " + primitiveId);

				// base
				var base = this.reader.getFloat(grandChildren[0], "base");
				if (!(base != null && !isNaN(base)))
					return ("unable to parse base of the primitive coordinates for ID = " + primitiveId);

				// slices
				var slices = this.reader.getInteger(grandChildren[0], "slices");
				if (!(slices != null && !isNaN(slices)))
					return ("unable to parse slices of the primitive coordinates for ID = " + primitiveId);

				// stacks
				var stacks = this.reader.getInteger(grandChildren[0], "stacks");
				if (!(stacks != null && !isNaN(stacks)))
					return ("unable to parse stacks of the primitive coordinates for ID = " + primitiveId);

				var cylin = new MyCylinder(this.scene, primitiveId, height, top, base, slices, stacks);

				this.primitives[primitiveId] = cylin;
			}

			// SPHERE
			else if (primitiveType == "sphere") {
				// radius
				var radius = this.reader.getFloat(grandChildren[0], "radius");
				if (!(radius != null && !isNaN(radius)))
					return ("unable to parse radius of the primitive coordinates for ID = " + primitiveId);

				// slices
				slices = this.reader.getInteger(grandChildren[0], "slices");
				if (!(slices != null && !isNaN(slices)))
					return ("unable to parse slices of the primitive coordinates for ID = " + primitiveId);

				// stacks
				stacks = this.reader.getInteger(grandChildren[0], "stacks");
				if (!(stacks != null && !isNaN(stacks)))
					return ("unable to parse stacks of the primitive coordinates for ID = " + primitiveId);

				var sph = new MySphere(this.scene, primitiveId, radius, slices, stacks);

				this.primitives[primitiveId] = sph;
			}

			// PLANE
			else if (primitiveType == "plane") {
				// npartsU
				var npartsU = this.reader.getInteger(grandChildren[0], "npartsU");
				if (!(npartsU != null && !isNaN(npartsU)))
					return ("unable to parse npartsU of the primitive coordinates for ID = " + primitiveId);

				// npartsV
				var npartsV = this.reader.getInteger(grandChildren[0], "npartsV");
				if (!(npartsV != null && !isNaN(npartsV)))
					return ("unable to parse npartsV of the primitive coordinates for ID = " + primitiveId);

				var pla = new MyPlane(this.scene, primitiveId, npartsU, npartsV);

				this.primitives[primitiveId] = pla;
			}

			// PATCH
			else if (primitiveType == "patch") {
				// npointsU
				var npointsU = this.reader.getInteger(grandChildren[0], "npointsU");
				if (!(npointsU != null && !isNaN(npointsU)))
					return ("unable to parse npointsU of the primitive coordinates for ID = " + primitiveId);

				// npointsV
				var npointsV = this.reader.getInteger(grandChildren[0], "npointsV");
				if (!(npointsV != null && !isNaN(npointsV)))
					return ("unable to parse npointsV of the primitive coordinates for ID = " + primitiveId);

				// npartsU
				npartsU = this.reader.getInteger(grandChildren[0], "npartsU");
				if (!(npartsU != null && !isNaN(npartsU)))
					return ("unable to parse npartsU of the primitive coordinates for ID = " + primitiveId);

				// npartsV
				npartsV = this.reader.getInteger(grandChildren[0], "npartsV");
				if (!(npartsV != null && !isNaN(npartsV)))
					return ("unable to parse npartsV of the primitive coordinates for ID = " + primitiveId);

				let points = [];
				for (let i = 0; i < npointsU * npointsV; i++) {
					// xx
					var xx = this.reader.getFloat(grandChildren[0].children[i], "xx");
					if (!(xx != null && !isNaN(xx)))
						return ("unable to parse xx of the primitive coordinates for ID = " + primitiveId);

					// yy
					var yy = this.reader.getFloat(grandChildren[0].children[i], "yy");
					if (!(yy != null && !isNaN(yy)))
						return ("unable to parse yy of the primitive coordinates for ID = " + primitiveId);

					// zz
					var zz = this.reader.getFloat(grandChildren[0].children[i], "zz");
					if (!(zz != null && !isNaN(zz)))
						return ("unable to parse zz of the primitive coordinates for ID = " + primitiveId);

					var point = [xx, yy, zz];
					points.push(point);
				}

				var patch = new MyPatch(this.scene, primitiveId, npointsU, npointsV, npartsU, npartsV, points);

				this.primitives[primitiveId] = patch;
			}

			// CYLINDER2
			else if (primitiveType == "cylinder2") {
				// height
				height = this.reader.getFloat(grandChildren[0], "height");
				if (!(height != null && !isNaN(height)))
					return ("unable to parse height of the primitive coordinates for ID = " + primitiveId);

				// top
				top = this.reader.getFloat(grandChildren[0], "top");
				if (!(top != null && !isNaN(top)))
					return ("unable to parse top of the primitive coordinates for ID = " + primitiveId);

				// base
				base = this.reader.getFloat(grandChildren[0], "base");
				if (!(base != null && !isNaN(base)))
					return ("unable to parse base of the primitive coordinates for ID = " + primitiveId);

				// slices
				slices = this.reader.getInteger(grandChildren[0], "slices");
				if (!(slices != null && !isNaN(slices)))
					return ("unable to parse slices of the primitive coordinates for ID = " + primitiveId);

				// stacks
				stacks = this.reader.getInteger(grandChildren[0], "stacks");
				if (!(stacks != null && !isNaN(stacks)))
					return ("unable to parse stacks of the primitive coordinates for ID = " + primitiveId);

				var cylin2 = new MyCylinder2(this.scene, primitiveId, slices, stacks, height, base, top);

				this.primitives[primitiveId] = cylin2;
			} else {
				console.warn("Unable to identify primitive");
			}
		}

		this.log("Parsed primitives");
		return null;
	}


	/**
	 * Parses the <components> block.
	 * @param {components block element} componentsNode
	 */
	parseComponents(componentsNode) {
		var child; // id of the child
		var transformation;
		var children = componentsNode.children;

		this.components = [];
		var grandChildren = [];
		var grandgrandChildren = [];
		var nodeNames = [];

		// Any number of components.
		for (let i = 0; i < children.length; i++) {
			var x;
			if (children[i].nodeName != "component") {
				this.onXMLMinorError("unknown tag <" + children[i].nodeName + ">");
				continue;
			}

			// Get id of the current component.
			var componentID = this.reader.getString(children[i], "id");
			if (componentID == null)
				return "no ID defined for componentID";

			// Checks for repeated IDs.
			if (this.components[componentID] != null)
				return ("ID must be unique for each component (conflict: ID = " + componentID + ")");



			grandChildren = children[i].children;
			nodeNames = [];

			for (let j = 0; j < grandChildren.length; j++) {
				nodeNames.push(grandChildren[j].nodeName);
			}

			var transformationIndex = nodeNames.indexOf("transformation");
			var materialsIndex = nodeNames.indexOf("materials");
			var textureIndex = nodeNames.indexOf("texture");
			var childrenIndex = nodeNames.indexOf("children");

			// Transformations
			if (transformationIndex != 0)
				this.onXMLError("Transformations for component " + componentID + " not found");

			if (grandChildren[transformationIndex].children.length == 0) {
				transformation = mat4.create();
			} else if (grandChildren[transformationIndex].children[0].nodeName == "transformationref") {
				var id = this.reader.getString(grandChildren[transformationIndex].children[0], "id");

				if (this.transformations[id] != null) {
					transformation = this.transformations[id];
				} else this.onXMLMinorError("No transformation for ID : " + id);
			} else
				transformation = this.parseTransformationsAux(grandChildren[transformationIndex].children);


			// Materials
			if (materialsIndex != 1 && materialsIndex != 2)
				this.onXMLError("Material for component " + componentID + " not found");

			var materialID = [];

			for (x = 0; x < grandChildren[materialsIndex].children.length; x++) {
				materialID[x] = this.reader.getString(grandChildren[materialsIndex].children[x], "id");

				if (materialID[x] != "inherit" && this.materials[materialID[x]] == null) {
					this.onXMLMinorError("No material for ID : " + materialID[x]);
				}
			}

			// Texture
			if (textureIndex != 2 && textureIndex != 3)
				this.onXMLError("Texture for component " + componentID + " not found");

			var textureID = this.reader.getString(grandChildren[textureIndex], "id");

			if (textureID != "none" && textureID != "inherit" && this.textures[textureID] == null) {
				this.onXMLMinorError("No texture for ID : " + textureID);
			}

			var textureLenghtS = this.reader.getFloat(grandChildren[textureIndex], "length_s", false);
			var textureLenghtT = this.reader.getFloat(grandChildren[textureIndex], "length_t", false);

			// Children
			if (childrenIndex != 3 && childrenIndex != 4)
				this.onXMLError("Children for component " + componentID + " not found");

			grandgrandChildren = grandChildren[childrenIndex].children;
			var leaves = [];
			var componentchildren = [];

			for (x = 0; x < grandgrandChildren.length; x++) {
				if (grandgrandChildren[x].nodeName == "componentref") {
					child = this.reader.getString(grandgrandChildren[x], "id");
					componentchildren.push(child);
				} else if (grandgrandChildren[x].nodeName == "primitiveref") {
					child = this.reader.getString(grandgrandChildren[x], "id");
					if (this.primitives[child] == null)
						this.onXMLMinorError("No primitive for ID : " + child);
					leaves.push(child);
				} else {
					this.onXMLMinorError("unknown tag <" + grandgrandChildren[x].nodeName + ">");
				}
			}
			var component = new MyComponent(this.scene, componentID, transformation, materialID, textureID, textureLenghtS, textureLenghtT, componentchildren, leaves);

			//	if (component.componentID == id)

			this.components[componentID] = component;
		}
		this.log("Parsed components");
	}

	/**
	 * Parse the coordinates from a node with ID = id
	 * @param {block element} node
	 * @param {message to be displayed in case of error} messageError
	 */
	parseCoordinates3D(node, messageError) {
		var position = [];

		// x
		var x = this.reader.getFloat(node, "x");
		if (!(x != null && !isNaN(x)))
			return "unable to parse x-coordinate of the " + messageError;

		// y
		var y = this.reader.getFloat(node, "y");
		if (!(y != null && !isNaN(y)))
			return "unable to parse y-coordinate of the " + messageError;

		// z
		var z = this.reader.getFloat(node, "z");
		if (!(z != null && !isNaN(z)))
			return "unable to parse z-coordinate of the " + messageError;

		position.push(...[x, y, z]);

		return position;
	}

	/**
	 * Parse the coordinates from a node with ID = id
	 * @param {block element} node
	 * @param {message to be displayed in case of error} messageError
	 */
	parseCoordinates4D(node, messageError) {
		let position = [];

		//Get x, y, z
		position = this.parseCoordinates3D(node, messageError);

		if (!Array.isArray(position)) return position;

		// w
		var w = this.reader.getFloat(node, "w");
		if (!(w != null && !isNaN(w)))
			return "unable to parse w-coordinate of the " + messageError;

		position.push(w);

		return position;
	}

	/**
	 * Parse the color components from a node
	 * @param {block element} node
	 * @param {message to be displayed in case of error} messageError
	 */
	parseColor(node, messageError) {
		var color = [];

		// R
		var r = this.reader.getFloat(node, "r");
		if (!(r != null && !isNaN(r) && r >= 0 && r <= 1))
			return "unable to parse R component of the " + messageError;

		// G
		var g = this.reader.getFloat(node, "g");
		if (!(g != null && !isNaN(g) && g >= 0 && g <= 1))
			return "unable to parse G component of the " + messageError;

		// B
		var b = this.reader.getFloat(node, "b");
		if (!(b != null && !isNaN(b) && b >= 0 && b <= 1))
			return "unable to parse B component of the " + messageError;

		// A
		var a = this.reader.getFloat(node, "a");
		if (!(a != null && !isNaN(a) && a >= 0 && a <= 1))
			return "unable to parse A component of the " + messageError;

		color.push(...[r, g, b, a]);

		return color;
	}

	/*
	 * Callback to be executed on any read error, showing an error on the console.
	 * @param {string} message
	 */
	onXMLError(message) {
		console.error("XML Loading Error: " + message);
		this.loadedOk = false;
	}

	/**
	 * Callback to be executed on any minor error, showing a warning on the console.
	 * @param {string} message
	 */
	onXMLMinorError(message) {
		console.warn("Warning: " + message);
	}

	/**
	 * Callback to be executed on any message.
	 * @param {string} message
	 */
	log(message) {
		console.log("   " + message);
	}

	/**
	 * Displays the scene, processing each node, starting in the root node.
	 */

	displayScene() {
		this.displayComponent(this.idRoot, null, null, 1, 1);

	}

	displayComponent(componentID, material, texture, s, t) {
		let i;
		if (this.components[componentID] == null)
			this.onXMLMinorError("No component for ID : " + componentID);

		var component = this.components[componentID];
		this.scene.pushMatrix();
		this.scene.multMatrix(component.transformation);

		if (component.currentMaterialID != "inherit")
			material = this.materials[component.currentMaterialID];

		if (component.texture == "inherit") {
			material.setTexture(this.textures[texture]);
			component.length_s = s;
			component.length_t = t;
		} else if (component.texture == "none")
			material.setTexture(null);

		else {
			texture = component.texture;
			material.setTexture(this.textures[texture]);
		}

		material.apply();

		for (i in component.leaves) {
			if (component.length_s == null && component.length_t == null)
				this.primitives[component.leaves[i]].updateTexCoords(1, 1);
			else if (component.length_s == null)
				this.primitives[component.leaves[i]].updateTexCoords(1, component.length_t);
			else if (component.length_t == null)
				this.primitives[component.leaves[i]].updateTexCoords(component.length_s, 1);
			else
				this.primitives[component.leaves[i]].updateTexCoords(component.length_s, component.length_t);

			this.primitives[component.leaves[i]].display();
		}

		for (i in component.children)
			this.displayComponent(component.children[i], material, texture, s, t);

		this.scene.popMatrix();
	}

	changeTexture() {
		for (let i in this.components)
			this.components[i].updateMaterial();
	}
}