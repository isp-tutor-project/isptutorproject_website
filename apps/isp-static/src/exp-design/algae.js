import "./styles/index.scss"

import { ExpDesignApp } from "./expDesign"

import { NavBar } from "@isptutorproject/navbar"

import { getActivityConfiguration } from "@isptutorproject/activity-config"

import { Model } from "./model.js";

const activityData = require("../../data/exp-design/expDesignAlgaeData")

const DEFAULT_APP_INITIAL_STATE = {
    events: [],
    sceneState: {},
    currentScene: "intro10"
}

// let activityConfig = getActivityConfiguration()
// temporary hard-coding for development prior to Teacher Portal
let activityConfig = {
    userID: localStorage.getItem("userID"),
    database: localStorage.getItem("database"),
    homepage: localStorage.getItem("homepage"),
    activityID: "expDesign",
    activityKey: "expDesign",
    activityFeatures: []
};


let navbar = new NavBar()
navbar.displayActivityTitle("Experimental Design Lesson")
navbar.displayUser(activityConfig.userID)


const PROPS = [
    "temp", "music_exposure", "amt_co2", "amt_sunlight",
    "tank_shape", "tank_material", "music_type", "volume",
    "amt_water"
];

class Algae extends Model {
    constructor(cond) {
        super(cond, PROPS);
        this.calcAllSelectors = this.calcAllSelectors.bind(this);
        this.area = "A4";
        this.topic = "T2";
        this.propAlternatives = {
            amt_co2: ["a_lot", "none"],  //V3
            amt_sunlight: ["some", "none"],  //V4
            music_exposure: ["constant", "none"],  //V2
            music_type: ["jazz", "rock"],  //V8
            tank_material: ["acrylic", "glass", "plastic"], //v7
            tank_shape: ["bubble", "cylindrical", "spherical", "cubic"], // V5
            temp: ["cool", "hot"], //V1
            volume: ["high", "low"], //v9
            amt_water: ["low", "high", "med"] //V6
        };
    }

    calcAllSelectors() {
        let pas = this.propAlternatives;
        let all = []
        for (let prop of PROPS.slice(0, 8)) {
            pas[prop].forEach((val) => all.push(`${prop}__${val}`));
        }
        for (let ts of pas["tank_shape"]) {
            for (let aw of pas["amt_water"]) {
                all.push(`${ts}__${aw}`);
            }
        }
        return all;
    }

    getSelectorsForProps() {
        // simple selectors
        let currSelectors = [];
        for (let prop of PROPS.slice(0, 6)) {
            let computed = this.getSelectorForProp(prop);
            currSelectors.push(computed);
        }
        currSelectors.push(this.getCompoundSelectorFromProps("tank_shape", "amt_water"));
        if ("constant" === this.props.music_exposure) {
            currSelectors.push(this.getSelectorForProp("music_type"));
            currSelectors.push(this.getSelectorForProp("volume"));
        }
        return currSelectors;
    }
}

// let cond1 = new Algae("cond1");
// let cond2 = new Algae("cond2");


let app = new ExpDesignApp(
    activityData, activityConfig, DEFAULT_APP_INITIAL_STATE
)
app.start()
