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
let app = new DiInstructionApp(appData)
app.setSnackbar(snackbar);
app.setStartScene("start");
