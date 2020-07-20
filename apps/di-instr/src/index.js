import "./styles/index.scss";

import { NavBar } from "@isptutorproject/navbar";
import { getActivityConfiguration } from "@isptutorproject/activity-config";
import { DiInstructionApp } from "./di-instruction-app";

let activityConfig = getActivityConfiguration();
let activityData = require("../data/diInstr.json");

const DEFAULT_INITIAL_APP_STATE = {
    events: [],
    // mapping of sceneid => sceneType-specific data
    sceneState: {},
    currentScene: "start"
};

let navbar = new NavBar();
navbar.displayActivityTitle("Data Interpretation Lesson");
navbar.displayUser(activityConfig.userID);
let app = new DiInstructionApp(
    activityData, activityConfig, DEFAULT_INITIAL_APP_STATE
);
if (process.env.NODE_ENV === "development") {
    app.setStartScene("scene28");
}
app.start();
