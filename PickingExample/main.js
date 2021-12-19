import { CGFapplication, CGFinterface } from '../lib/CGF.js';
import { PickingScene } from './PickingScene.js';

function main()
{
    var app = new CGFapplication(document.body);
    var myScene = new PickingScene();
    var myInterface = new CGFinterface();

    app.init();

    app.setScene(myScene);
    app.setInterface(myInterface);

    myInterface.setActiveCamera(myScene.camera);

    app.run();
}

main();