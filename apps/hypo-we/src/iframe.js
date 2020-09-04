import {
    EVT_ON_VAR_CHANGE,
    ISPCaptivateActivity
} from "@isptutorproject/isp-captivate";

import { getActivityConfiguration } from "@isptutorproject/activity-config";


const FTR_ONE_DIR = "FTR_ONE_DIRECTIONAL";
const FTR_BI_DIR  = "FTR_BI_DIRECTIONAL";
const COND_ONE_DIR = "one-directional";
const COND_BI_DIR  = "bi-directional";

const TRACKED_VARS = [
    "condition",
    "gender",
    "prediction",
    "sibling",
    "VINName",
    "VINTwinName"
];

const VINImages = [
    "VINImageall",
    "VINImageall_bi",
    "VINImageall_bi_681"
];

const VINTwinImages = [
    "VINTwin_all",
    "VINTwin_bi",
    "VINTwin_bi_682",
    "VINTwin_all_724"
];

function undefinedOrSame(currState, value) {
    return ("undefined" === typeof(currState) || currState === value)
}

class HypoWECaptivateActivity extends ISPCaptivateActivity {
    constructor(activityConfig, cpAPI, varsToTrack) {
        super(activityConfig, cpAPI, varsToTrack);
        this.onFinished = this.onFinished.bind(this);
    }

    processFeatures() {
        let feats = [...this.features];
        let hasOneDir = feats.includes(FTR_ONE_DIR);
        let hasBiDir = feats.includes(FTR_BI_DIR);
        let currentDBVal = this.state.condition;
        if (hasOneDir && hasBiDir) {
            console.error("has features for both conditions");
        } else if (!hasOneDir && !hasBiDir) {
            console.error("doesn't have feature for either condition");
        } else if (hasOneDir) {
            if (!undefinedOrSame(this.state.condition, COND_ONE_DIR)) {
                console.error(`state.condition(${this.state.condition}) !== to feature value(${COND_ONE_DIR})`);
            } else {
                this.state.condition = COND_ONE_DIR;
                feats = feats.filter((item) => item !== FTR_ONE_DIR);
                this.setCaptivateVariable("condition", COND_ONE_DIR);
            }
        } else if (hasBiDir) {
            if (!undefinedOrSame(this.state.condition, COND_BI_DIR)) {
                console.error(`state.condition(${this.state.condition}) !== to feature value(${COND_BI_DIR})`);
            } else {
                this.state.condition = COND_BI_DIR;
                feats = feats.filter((item) => item !== FTR_BI_DIR);
                this.setCaptivateVariable("condition", COND_BI_DIR);
            }
        } else {
            console.error("WTF! how did I get here?")
        }
        console.log("remaining feats:", feats);
        console.log("# remaining feats", feats.length);
    }

    setupCustomEventHandlers() {
        this.cpEventEmitter.addEventListener(EVT_ON_VAR_CHANGE, this.onFinished, "Finished")
    }

    onFinished(evt) {
        // console.log(evt);
        const varName = evt.cpData.varName;
        const newVal = evt.cpData.newVal;
        const oldVal = evt.cpData.oldVal;
        if (varName !== "Finished") {
            console.error(`WTF! This event handler is only supposed be called on changes to 'Finished' var. varName '${varName}'`);
            return;
        }
        if (newVal !== 1) {
            console.log("I only act when the value of Finished is set to 1. aborting");
            return;
        }
        console.log("marking HypoWE as completed")
        this.db.markActivityAsCompleted(this.activityID)
            .then(() => this.goHomePage());
    }

    overrideDefaultWithNormal(value, defaultVal) {
        return (value === defaultVal) ? "Normal" : value;
    }

    restoreMultiStateObjects() {
        if ("VINName" in this.state) {
            let val = this.overrideDefaultWithNormal(this.state.VINName, "Joy");
            for (let smartObjName of VINImages) {
                console.log(`Restoring state of object "${smartObjName}" to "${val}`);
                this.cp.changeState(smartObjName, val);
            }
        }
        if ("VINTwinName" in this.state) {
            let val = this.overrideDefaultWithNormal(this.state.VINTwinName, "Ari");
            for (let smartObjName of VINTwinImages) {
                console.log(`Restoring state of object "${smartObjName}" to "${val}`);
                this.cp.changeState(smartObjName, val);
            }
        }
    }

    appSpecificInit() {
        if ("development" == process.env.NODE_ENV) {
            console.log("appSpecificInit() running in dev mode");
            this.gotoSlide(129);
        } else {
            console.log("appSpecificInit() NOT running in dev mode");
        }
    }
}


function initApp(event) {
    console.log("initApp()");
    let activityConfig = getActivityConfiguration();

    // event.Data is the same as window.cpAPIInterface
    const cpAPI = event.Data;
    const app = new HypoWECaptivateActivity(activityConfig, cpAPI, TRACKED_VARS);
    app.init();
}


// window.addEventListener("load", initApp);
window.addEventListener("moduleReadyEvent", initApp);
