import {
    CGFXMLreader,
    CGFappearance,
    CGFtexture,
    CGFcamera,
    CGFcameraOrtho
} from "../lib/CGF.js";
import {
    MyComponent
} from "./MyComponent.js";
import {
    MyObstacle
} from "./elements/MyObstacle.js";
import {
    MyPowerUp
} from "./elements/MyPowerUp.js";
import {
    MyStartLine
} from "./elements/MyStartLine.js";
import {
    MyRoute
} from "./MyRoute.js";
import {
    MyVehicle
} from "./elements/MyVehicle.js";
var DEGREE_TO_RAD = Math.PI / 180;

/**
 * MySVGReader class, representing the scene graph.
 */
export class MySVGReader {
    /**
     * @constructor
     */
    constructor(filename, scene) {
        this.loadedOk = null;

        // Establish bidirectional references between scene and graph.
        this.scene = scene;
        //scene.graph = this;

        this.nodes = [];
        this.powerup = [];
        this.obstacle = [];
        this.puIndex = 0;
        this.oIndex = 0;
        this.puCircleIndex = 0;
        this.oCircleIndex = 0;
        this.idRoot = null; // The id of the root element.
        this.routes = [];
        this.puCircleColision = [];
        this.oCircleColision = [];
        this.axisCoords = [];
        this.axisCoords["x"] = [1, 0, 0];
        this.axisCoords["y"] = [0, 1, 0];
        this.axisCoords["z"] = [0, 0, 1];
        this.circleIndex = 0;
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
        //this.scene.onGraphLoaded();
    }

    /**
     * Parses the XML file, processing each block.
     * @param {XML root element} rootElement
     */
    parseXMLFile(rootElement) {
        if (rootElement.nodeName != "svg") return "root tag <svg> missing";

        var nodes = rootElement.children;

        // Reads the names of the nodes to an auxiliary buffer.
        var nodeNames = [];

        for (let i = 0; i < nodes.length; i++) {
            nodeNames.push(nodes[i].nodeName);
        }

        var error;

        // Processes each node, verifying errors.

        // <g>
        var index;
        if ((index = nodeNames.indexOf("g")) == -1)
            return "tag <g> missing";
        else {


            //Parse g block
            for (let gIndex = index; gIndex < nodeNames.length - 1; gIndex++)
                if ((error = this.parseG(nodes[gIndex])) != null) return error;
        }

        this.log("G Parsed");
    }


    /**
     * Parses the <g> block.
     * @param {view block element} gNode
     */
    parseG(gNode) {
        var children = gNode.children;
        var g;

        // this.groupmode = this.reader.getString(gNode, "inkscape:groupmode");

        // this.GId = this.reader.getString(gNode, "id");

        this.label = this.reader.getString(gNode, "inkscape:label");

        //	this.style = this.reader.getString(gNode, "style");



        if (children.length == 0) this.onXMLError("No g found");
        //this.puIndex = 0;
        //let oIndex = 0;
        for (let i = 0; i < children.length; i++) {
            g = children[i];
            // path view
            if (g.nodeName == "path") {

                // id
                var id = this.reader.getString(g, "id");
                if (!(id != null)) return "unable to parse id of the view for ID = " + id;

                // style
                var style = this.reader.getString(g, "style");
                if (!(style != null))
                    return "unable to parse style of the view for ID = " + id;

                // d
                var d = this.reader.getString(g, "d");
                if (!(d != null))
                    return "unable to parse d of the view for ID = " + id;

                if (this.label == "Routes") {
                    this.send_route = new MyRoute(this.scene, d);
                    // console.log("COORD=" + this.routes);
                }
                if (this.label == "Start") {
                    //Splits d-string into start coordinates [x,0,y]
                    var splited = [];
                    splited = d.split(" ");
                    let coord = splited[1].split(",");
                    let x = coord[0];
                    let y = coord[1];
                    var pos = [x, 0, y];
                    this.start = new MyStartLine(this.scene, pos, "TrackMap.svg");
                }

            } else if (g.nodeName == "circle") {

                // style
                var style = this.reader.getString(g, "style");
                if (!(style != null))
                    return "unable to parse style of the view for ID = " + id;

                // id
                var id = this.reader.getString(g, "id");
                if (!(id != null))
                    return "unable to parse id of the view for ID = " + id;

                // cx,cy,r
                var circleCoord = this.parseCoordinatesCircle(g, "circleCoordinates");

                if (this.label == "PowerUps") {
                    this.powerup[this.puIndex] = new MyPowerUp(this.scene, circleCoord);
                    this.puIndex++;
                    this.puCircleColision[this.puCircleIndex] = circleCoord;
                    this.puCircleIndex++;

                } else
                if (this.label == "Obstacles") {
                    this.obstacle[this.oIndex] = new MyObstacle(this.scene, circleCoord);
                    this.oIndex++;
                    this.oCircleColision[this.oCircleIndex] = circleCoord;
                    this.oCircleIndex++;
                }

            } else this.onXMLError("g not identified");
        }

        this.log("Parsed g");
        return null;
    }


    /**
     * Parse the coordinates from a node with ID = id
     * @param {block element} node
     * @param {message to be displayed in case of error} messageError
     */
    parseCoordinatesCircle(node, messageError) {
        var position = [];

        // cx
        var cx = this.reader.getFloat(node, "cx");
        if (!(cx != null && !isNaN(cx)))
            return "unable to parse x-coordinate of the " + messageError;

        // cy
        var cy = this.reader.getFloat(node, "cy");
        if (!(cy != null && !isNaN(cy)))
            return "unable to parse y-coordinate of the " + messageError;

        // r
        var r = this.reader.getFloat(node, "r");
        if (!(r != null && !isNaN(r)))
            return "unable to parse r of the " + messageError;
        //cx,cy -> cx,cz
        position.push(...[cx, 0, cy, r]);

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
        this.scene.pushMatrix();
        //PowerUps
        this.scene.pushMatrix();
        this.scene.scale(3.77, 3.77, 3.77)
        for (let i = 0; i < this.puIndex; i++)
            this.powerup[i].display();
        this.scene.popMatrix();
        //Obstacles
        this.scene.pushMatrix();
        this.scene.scale(3.77, 3.77, 3.77)
        for (let i = 0; i < this.oIndex; i++)
            this.obstacle[i].display();
        this.scene.popMatrix();
        //Start
        this.scene.pushMatrix();
        this.scene.scale(3.77, 3.77, 3.77)
        this.start.display();
        this.scene.popMatrix();

        this.scene.popMatrix();
    }

}