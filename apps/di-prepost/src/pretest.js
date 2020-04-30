
import { DiTestApp, DiTestScene, DiTestResultsScene } from "./index";

const preTestData = require("@isptutorproject/isp-data/dist/diPreTest.json");

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
        // errMsg.classList.add("visible");
    }
}

class MemoryResultsScene extends DiTestResultsScene {
    constructor(app, sceneInfo) {
        super(app, sceneInfo);
    }
}

class RocketsResultsScene extends DiTestResultsScene {
    constructor(app, sceneInfo) {
        super(app, sceneInfo);
    }
}

class DiPreTestApp extends DiTestApp {
    constructor(appData, testName) {
        super(appData, testName);
    }

    createScene(sceneInfo) {
        let scene;
        console.log("DiPreTestApp::createScene()", sceneInfo);
        switch(sceneInfo.sceneType) {
            case "memoryResults":
                scene = new MemoryResultsScene(this, sceneInfo);
                break;
            case "rocketsResults":
                scene = new RocketsResultsScene(this, sceneInfo);
                break;
            default:
                scene = new DiTestScene(this, sceneInfo);
        }
        return scene;
    }
}

let app = new DiPreTestApp(preTestData, "dipretest");
app.setStartScene("rocketsResults1");
