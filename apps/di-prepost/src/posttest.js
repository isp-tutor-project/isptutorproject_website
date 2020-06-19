import { DiTestApp, DiTestScene, DiTestResultsScene } from "./index";

const postTestData = require("../data/diPostTest.json");

function handleQ1Submit(e) {
    console.log("clicked");
    e.preventDefault();
    let btn = e.target;
    let sceneId = btn.id.split('_')[0];
    let form = document.getElementById(`${sceneId}_q1_form`);
    if (form.checkValidity()) {
        let selected = form.querySelector('input[type="radio"]:checked');
        console.log(selected.value, selected.labels[0].innerText);
    } else {
        console.log("invalid");
        let errMsg = document.getElementById(`${sceneId}_notification_region`);
        console.log(errMsg);
        errMsg.classList.remove("invisible");
    }
}

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
