import "./styles/index.scss"

import { ExpDesignApp } from "./expDesign"

import { NavBar } from "@isptutorproject/navbar"

import { getActivityConfiguration } from "@isptutorproject/activity-config"

const activityData = require("../../data/exp-design/expDesignRedirectData")

const DEFAULT_APP_INITIAL_STATE = {
    events: [],
    sceneState: {},
    currentScene: "start"
}

// let activityConfig = getActivityConfiguration()
// temporary hard-coding for development prior to Teacher Portal
const activityConfig = {
    userID: localStorage.getItem("userID"),
    database: localStorage.getItem("database"),
    homepage: localStorage.getItem("homepage"),
    activityID: "expDesign",
    activityKey: "expDesign",
    activityFeatures: []
};

const navbar = new NavBar()
navbar.displayActivityTitle("Exp-Design Change RQ Page")
navbar.displayUser(activityConfig.userID)

let app = new ExpDesignApp(
    activityData, activityConfig, DEFAULT_APP_INITIAL_STATE
)
app.start()
