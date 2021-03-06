import "./styles/index.scss";

import { NavBar } from "@isptutorproject/navbar";
import { getActivityConfiguration } from "@isptutorproject/activity-config";
import {SceneBasedApp, Scene} from "@isptutorproject/scene-app-base";

const activityData = require("../../data/hypo-gr/hypoGRData");

// let activityConfig = getActivityConfiguration();
let activityConfig = {
    userID: localStorage.getItem("userID"),
    database: localStorage.getItem("database"),
    homepage: localStorage.getItem("homepage"),
    activityID: "hypoGR",
    activityKey: "hypoGR",
    activityFeatures: []
};
console.log(activityData);


const DEFAULT_APP_INITIAL_STATE = {
    events: [],
    sceneState: {},
    currentScene: "start"
};

const NO_TRANSITIONS = -Infinity;

class HypoGRScene extends Scene {
    constructor(app, sceneInfo) {
        super(app, sceneInfo);
        this.customActions = {
            showBtns: this.showBtns,
            hideBtns: this.hideBtns,
        };
        this.btnNames = {
            prev: this.app.prevBtn,
            next: this.app.nextBtn
        };
        this.currentTransition = 0;
        // console.log(sceneInfo);

        this.el = document.getElementById(sceneInfo.id);
        this.showOnTransitionsGte = new Map();
        this.maxTransitions = NO_TRANSITIONS;
        for (let child of this.el.querySelectorAll(".show-on-transition")){
            // child.classList.add("invisible");
            if (child.dataset && child.dataset.whenTransitionGte) {
                let val = parseInt(child.dataset.whenTransitionGte, 10);
                if ((val) > this.maxTransitions) {
                    this.maxTransitions = val;
                }
                if (! this.showOnTransitionsGte.has(val)) {
                    this.showOnTransitionsGte.set(val, []);
                }
                this.showOnTransitionsGte.get(val).push(child);
            }
        }
        console.log(this.showOnTransitionsGte);
        console.log(this.maxTransitions);
    }

    performCustomEnterSceneActions() {
        console.log(`RQScene::performCustomEnterSceneActions()`);
        for (let action of this.customEnterActions) {
            let name = action.name;
            let args = action.args;
            if (this.customActions.hasOwnProperty(name)) {
                this[name](args);
            }
        }
    }

    defaultEnterSceneActions() {
        super.defaultEnterSceneActions();
        this.app.show(this.app.prevBtn);
        this.app.enable(this.app.prevBtn);
        this.app.show(this.app.nextBtn);
        this.app.enable(this.app.nextBtn);
        if (NO_TRANSITIONS !== this.maxTransitions) {
            this.handleTransitions();
        }
    }

    handleTransitions() {
        for (let i=this.maxTransitions; i>0; i--) {
            for (let e of this.showOnTransitionsGte.get(i)) {
                if (this.currentTransition >= i) {
                    e.classList.remove("invisible");
                } else {
                    e.classList.add("invisible");
                }
            }
        }
    }

    handleNextButton() {
        if ((NO_TRANSITIONS === this.maxTransitions) ||
            (this.currentTransition === this.maxTransitions)) {
            console.log(`${this.currentTransition} > ${this.maxTransitions}`);
            console.log("greater than");
            super.handleNextButton();
        }  else {
            this.currentTransition++;
            this.handleTransitions();
            console.log(`${this.currentTransition} <= ${this.maxTransitions}`);
            console.log("not greater than");
        }
    }

    handlePrevButton() {
        console.log(`${this.currentTransition}`);
        if (NO_TRANSITIONS === this.maxTransitions || 0 === this.currentTransition) {
            super.handlePrevButton();
        } else {
            this.currentTransition--;
            this.handleTransitions();
        }
    }
}


class HypoGRApp extends SceneBasedApp {

    createScene(sceneInfo) {
        let scene;
        console.log(sceneInfo);
        switch (sceneInfo.sceneType) {
            default:
                scene = new HypoGRScene(this, sceneInfo);
                break;
        }
        return scene;
    }
}

let navbar = new NavBar();
navbar.displayActivityTitle("Hypothesis Lesson");
navbar.displayUser(activityConfig.userID);

let app = new HypoGRApp(
    activityData, activityConfig, DEFAULT_APP_INITIAL_STATE
);

if (process.env.NODE_ENV === "development") {
    app.setStartScene("start");
}
app.start();