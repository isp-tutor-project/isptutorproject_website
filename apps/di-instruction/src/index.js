
import { DiInstructionApp } from "./di-instruction-app";

import "./styles/index.css";

let appData = require("@isptutorproject/isp-data/dist/diInstr.json");

let app = new DiInstructionApp(appData)
app.setStartScene("scene1");
