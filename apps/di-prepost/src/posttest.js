import { DiTestApp, DiTestScene, DiTestResultsScene } from "./index";

const postTestData = require("../data/diPostTest.json");


class CarResultsScene extends DiTestResultsScene {
    constructor(app, sceneInfo) {
        super(app, sceneInfo);
    }
}

class LibraryResultsScene extends DiTestResultsScene {
    constructor(app, sceneInfo) {
        super(app, sceneInfo);
    }
}

class DiPostTestApp extends DiTestApp {

    createScene(sceneInfo) {
        let scene;
        console.log("DiPostTestApp::createScene()", sceneInfo);
        switch (sceneInfo.sceneType) {
            case "carResults":
                scene = new CarResultsScene(this, sceneInfo);
                break;
            case "libraryResults":
                scene = new LibraryResultsScene(this, sceneInfo);
                break;
            default:
                scene = new DiTestScene(this, sceneInfo);
        }
        return scene;
    }
}

let app = new DiPostTestApp(postTestData, "diposttest");
app.setStartScene("start");
