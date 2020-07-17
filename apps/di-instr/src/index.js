import "./styles/index.scss";

import { SnackBar } from "@isptutorproject/snackbar";
import { getDBConnection } from "@isptutorproject/isp-database";
import { DiInstructionApp } from "./di-instruction-app";


let appData = require("../data/diInstr.json");

let db = getDBConnection("localstorage");
let userID = localStorage.getItem("userID");
let classCode = localStorage.getItem("classCode");
let currentActivity = localStorage.getItem("currentActivity");
let features = localStorage.getItem("currentActivityFeatures")
               .split(":")
               .filter((i) => i !== ":");
db.setCredentials(classCode, userID);
let app = new DiInstructionApp(appData, db, currentActivity, features);
let snackbar = new SnackBar();
app.setSnackbar(snackbar);
if (process.env.NODE_ENV !== "production") {
    app.setStartScene("scene28");
}
app.start();
