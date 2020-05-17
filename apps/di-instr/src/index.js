
import { DiInstructionApp } from "./di-instruction-app";

import "./styles/index.scss";

let appData = require("../data/diInstr.json");

let app = new DiInstructionApp(appData)
app.setStartScene("start");
