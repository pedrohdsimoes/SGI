import {
    CGFobject
} from "../../lib/CGF.js";


/**
 * MyRoute
 * @constructor
 * @param scene - Reference to MyScene object
 */
export class MyRoute extends CGFobject {
    constructor(scene, d) {
        super(scene);

        this.scene = scene;
        this.d = d;
        this.routes = [];
        this.store_route();

    }

    // Recebe as coordenadas dos pontos da pista provenientes do MySVGReader
    // É criada uma KeyFrame para cada coordenada que depois é adicionada à KeyFrameAnimation
    // que guarda toda a animação
    store_route() {
        var splitedR = [];
        var splitedC = [];
        let coord = this.d;

        splitedR = coord.split(" ");
        for (let c = 1; c < splitedR.length - 1; c++) {
            let coordR = splitedR[c].split(",");
            this.routes[c - 1] = [coordR[0], coordR[1]];
        }

        // console.log("COORD=" + this.routes);
        return this.routes;
    }
}