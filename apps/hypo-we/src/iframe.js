import {
    // EVT_ON_VAR_CHANGE,
    ISPCaptivateActivity
} from "@isptutorproject/isp-captivate";


import {
    getDBConnection
} from "@isptutorproject/isp-database";

const FTR_ONE_DIR = "FTR_ONE_DIRECTIONAL";
const FTR_BI_DIR  = "FTR_BI_DIRECTIONAL";
const COND_ONE_DIR = "one-directional";
const COND_BI_DIR  = "bi-directional";

const TRACKED_VARS = [
    "condition", "prediction", "gender", "VINname", "twinName"
];

function undefinedOrSame(currState, value) {
    return ("undefined" === typeof(currState) || currState === value)
}

class HypoWECaptivateActivity extends ISPCaptivateActivity {
    constructor(cpAPI, db, varsToTrack) {
        super(cpAPI, db, varsToTrack);
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
                // this.setCaptivateVariable("condition", COND_ON_DIR);
            }
        } else if (hasBiDir) {
            if (!undefinedOrSame(this.state.condition, COND_BI_DIR)) {
                console.error(`state.condition(${this.state.condition}) !== to feature value(${COND_BI_DIR})`);
            } else {
                this.state.condition = COND_BI_DIR;
                feats = feats.filter((item) => item !== FTR_BI_DIR);
                // this.setCaptivateVariable("condition", COND_BI_DIR);
            }
        } else {
            console.error("WTF! how did I get here?")
        }
        console.log("remaining feats:", feats);
        console.log("# remaining feats", feats.length);
    }

}

function initApp(event) {
    console.log("initApp()");
    // event.Data is the same as window.cpAPIInterface
    const cpAPI = event.Data;
    const db = getDBConnection("localstorage");
    const app = new HypoWECaptivateActivity(cpAPI, db, TRACKED_VARS);
    app.init();
}


// window.addEventListener("load", initApp);
window.addEventListener("moduleReadyEvent", initApp);
