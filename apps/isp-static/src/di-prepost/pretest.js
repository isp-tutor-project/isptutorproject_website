import { DiTestApp } from "./index";
import { NavBar } from "@isptutorproject/navbar";

import { getActivityConfiguration } from "@isptutorproject/activity-config";

const activityData = require("../../data/di-prepost/diPreTestData");

const DEFAULT_APP_INITIAL_STATE = {
    events: [],
    // mapping of sceneIDs -> scene-type specific data
    sceneState: {},
    currentScene: "start"
};


let activityConfig = getActivityConfiguration();

let navbar = new NavBar();
navbar.displayActivityTitle("Data Interpretation Pre-Test");
navbar.displayUser(activityConfig.userID);

// console.log(activityConfig);

let app = new DiTestApp(
    activityData, activityConfig, DEFAULT_APP_INITIAL_STATE
);
if (process.env.NODE_ENV === "development") {
    app.setStartScene("start");
}
app.start()

