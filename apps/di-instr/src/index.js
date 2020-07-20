import "./styles/index.scss";

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

let app = new DiInstructionApp(
    activityData, activityConfig, DEFAULT_INITIAL_APP_STATE
);
if (process.env.NODE_ENV === "development") {
    app.setStartScene("scene28");
}
app.start();
