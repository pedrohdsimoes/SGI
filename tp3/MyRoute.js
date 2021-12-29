import {
    CGFobject
} from "../../lib/CGF.js";
import {
    MySVGReader
} from "./MySVGReader.js";
/**
 * MyRoute
 * @constructor
 * @param scene - Reference to MyScene object
 */
export class MyRoute extends CGFobject {
    constructor(scene, d) {
        super(scene);

        this.d = d;
        this.routes = [];
        this.store_route();

    }

    store_route() {
        var splitedR = [];
        let coord = this.d;
        splitedR = coord.split(" ");
        for (let c = 1; c < splitedR.length - 1; c++) {
            let coordR = splitedR[c].split(",");
            this.routes[c] = [coordR[0], 0, coordR[1]];
        }
        // console.log("COORD=" + this.routes);
    }
}