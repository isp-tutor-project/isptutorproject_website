import "./styles/index.scss";

import { NavBar } from "@isptutorproject/navbar";
import { getActivityConfiguration } from "@isptutorproject/activity-config";
import { ScienceFairAssessmentApp } from "./ScienceFairAssessment";

let activityData = require("../../data/sf-assessment/sfPreTestData");

// let activityConfig = getActivityConfiguration();
// temporary hard-coding for development prior to Teacher Portal
let activityConfig = {
    userID: localStorage.getItem("userID"),
    database: localStorage.getItem("database"),
    homepage: localStorage.getItem("homepage"),
    activityID: "sfPreTest",
    activityKey: "sfPreTest",
    activityFeatures: []
};

const DEFAULT_INITIAL_APP_STATE = {
    events: [],
    // mapping of sceneid => sceneType-specific data
    sceneState: {},
    currentScene: "start"
};

let navbar = new NavBar();
navbar.displayActivityTitle("Science Fair Pre-Test");
navbar.displayUser(activityConfig.userID);
let app = new ScienceFairAssessmentApp(
    activityData, activityConfig, DEFAULT_INITIAL_APP_STATE
);
if (process.env.NODE_ENV === "development") {
    app.setStartScene("intro");
}
app.start();
