import "./styles/index.scss";

import { NavBar } from "@isptutorproject/navbar";
import { getActivityConfiguration } from "@isptutorproject/activity-config";
import {SceneBasedApp, Scene} from "@isptutorproject/scene-app-base";

const activityData = require("../../data/hypoGR.json");

// let activityConfig = getActivityConfiguration();
let activityConfig = {
    userID: localStorage.getItem("userID"),
    database: localStorage.getItem("database"),
    homepage: localStorage.getItem("homepage"),
    activityID: "hypoGR",
    activityKey: "hypoGR",
    activityFeatures: []
};
console.log(activityData);


const DEFAULT_APP_INITIAL_STATE = {
    events: [],
    sceneState: {},
    currentScene: "start"
};


class HypoGRScene extends Scene {
    constructor(app, sceneInfo) {
        super(app, sceneInfo);
        this.customActions = {
            showBtns: this.showBtns,
            hideBtns: this.hideBtns,
        };
        this.btnNames = {
            prev: this.app.prevBtn,
            next: this.app.nextBtn
        };
    }

    performCustomEnterSceneActions() {
        console.log(`RQScene::performCustomEnterSceneActions()`);
        for (let action of this.customEnterActions) {
            let name = action.name;
            let args = action.args;
            if (this.customActions.hasOwnProperty(name)) {
                this[name](args);
            }
        }
    }
}


class HypoGRApp extends SceneBasedApp {

    createScene(sceneInfo) {
        let scene;
        console.log(sceneInfo);
        switch (sceneInfo.sceneType) {
            default:
                scene = new HypoGRScene(this, sceneInfo);
                break;
        }
        return scene;
    }
}

let navbar = new NavBar();
navbar.displayActivityTitle("Hypothesis Lesson");
navbar.displayUser(activityConfig.userID);

let app = new HypoGRApp(
    activityData, activityConfig, DEFAULT_APP_INITIAL_STATE
);

if (process.env.NODE_ENV === "development") {
    app.setStartScene("start");
}
app.start();