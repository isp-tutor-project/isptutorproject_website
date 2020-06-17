import "./styles/index.scss";

import { HypoWEApp } from "./hypo-we-app";

let appData = require("../data/hypoWE.json");

let app = new HypoWEApp(appData);
app.setStartScene("selectVIN");

