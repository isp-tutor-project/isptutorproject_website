
import { DiInstructionApp } from "./di-instruction-app";

import "./styles/index.css";

let appData = require("../data/diInstr.json");

let app = new DiInstructionApp(appData)
app.setStartScene("intro1");
