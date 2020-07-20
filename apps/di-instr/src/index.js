import "./styles/index.scss";

import { getActivityConfiguration } from "@isptutorproject/activity-config";
import { DiInstructionApp } from "./di-instruction-app";

let activityConfig = getActivityConfiguration();
let activityData = require("../data/diInstr.json");

let app = new DiInstructionApp(activityData, activityConfig);
if (process.env.NODE_ENV === "development") {
    app.setStartScene("scene28");
}
app.start();
