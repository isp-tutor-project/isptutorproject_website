import "./styles/index.scss";

import { DiInstructionApp } from "./di-instruction-app";


let appData = require("../data/diInstr.json");

let app = new DiInstructionApp(appData)
app.setStartScene("start");
