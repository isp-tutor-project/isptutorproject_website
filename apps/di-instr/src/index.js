import "./styles/index.scss";

import { SnackBar } from "@isptutorproject/snackbar";
import { getActivityConfiguration } from "@isptutorproject/activity-config";
// import { getDBConnection } from "@isptutorproject/isp-database";
import { DiInstructionApp } from "./di-instruction-app";

let activityConfig = getActivityConfiguration();

let appData = require("../data/diInstr.json");

let app = new DiInstructionApp(appData, activityConfig); //db, currentActivity, features);
let snackbar = new SnackBar();
app.setSnackbar(snackbar);
if (process.env.NODE_ENV !== "production") {
    app.setStartScene("scene28");
}
app.start();
