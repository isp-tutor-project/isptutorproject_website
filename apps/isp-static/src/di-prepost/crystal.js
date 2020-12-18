import { DiTestApp } from "./index";
import { NavBar } from "@isptutorproject/navbar";

import { getActivityConfiguration } from "@isptutorproject/activity-config";


const DEFAULT_APP_INITIAL_STATE = {
    events: [],
    // mapping of sceneIDs -> scene-type specific data
    sceneState: {},
    currentScene: "start"
};


let activityConfig = getActivityConfiguration();
const activityData = require("../../data/diCrystalTest.json");

let navbar = new NavBar();
navbar.displayActivityTitle("Crystal Growth Data Interpretation");
navbar.displayUser(activityConfig.userID);

// console.log(activityConfig);

let app = new DiTestApp(
    activityData, activityConfig, DEFAULT_APP_INITIAL_STATE
);
if (process.env.NODE_ENV === "development") {
    app.setStartScene("start");
}
app.start()

