
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
        errMsg.classList.add("visible");
    }
}

// function initApp(sceneId) {
//     console.log("initializating app...");
//     console.log(scenes);

//     const tm = new TransitionsManager(scenes);
//     tm.registerTransitionLogger(logTransition);
//     tm.registerActionHandler("displaySceneId", displaySceneId);
//     tm.registerActionHandler('hideBtns', hideBtns);
//     tm.registerActionHandler('showBtns', showBtns);
//     tm.registerActionHandler('disableBtns', disableBtns);
//     tm.registerActionHandler("initForms", initForms);
//     tm.initialize();
//     tm.setCurrScene(sceneId);
    
//     prevBtn.addEventListener("click", (e) => {
//         e.preventDefault();
//         tm.transitionTo("prev");
//     });
//     nextBtn.addEventListener("click", (e) => {
//         e.preventDefault();
//         tm.transitionTo("next");
//     });

//     for (let btn of document.getElementsByClassName("reveal-mean")) {
//         btn.addEventListener("click", revealMean);
//     }
//     for (let btn of document.getElementsByClassName("show-sorted-img")) {
//         btn.addEventListener("click", handleSortImageClick);
//     }
//     for (let btn of document.getElementsByClassName("submit-q1")) {
//         console.log(btn);
//         btn.addEventListener("click", handleQ1Submit);
//     }
//     for (let radio of document.querySelectorAll('input[type="radio"]')) {
//         radio.addEventListener("change", handleFormChange);        
//     }
//     console.log("app init complete");
// }
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
