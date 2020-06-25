import "./styles/index.scss";

import { SnackBar } from "@isptutorproject/snackbar";
import { DiInstructionApp } from "./di-instruction-app";


let appData = require("../data/diInstr.json");

let snackbar = new SnackBar();
let app = new DiInstructionApp(appData)
app.setSnackbar(snackbar);
app.setStartScene("start");
