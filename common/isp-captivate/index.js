import { getDBConnection } from "@isptutorproject/isp-database";

export const EVT_ON_VAR_CHANGE  = "CPAPI_VARIABLEVALUECHANGED";
export const EVT_ON_SLIDE_ENTER = "CPAPI_SLIDEENTER";
export const EVT_ON_SLIDE_EXIT  = "CPAPI_SLIDEEXIT";
export const EVT_ON_QUES_SUBMIT = "CPAPI_QUESTIONSUBMIT";
export const EVT_ON_INTERACTION_SUBMIT = "CPAPI_INTERACTIVEITEM_SUBMIT";

const INITIAL_STATE = {
    transitions: [],
    answers: [],
    variableChanges: []
};

// allows us to log to the parent windows console
// NOTE: the parent window needs to have some companion
// code to make this work
const _log = console.log;
// Override the console
console.log = function (...rest) {
    // window.parent is the parent frame that made this window
    window.parent.postMessage(
        {
            source: 'iframe',
            message: rest,
        },
        '*'
    );
    // Finally applying the console statements to saved instance earlier
    _log.apply(console, arguments);
};


export class ISPCaptivateActivity {
    constructor(activityConfig, cpAPI, variablesToTrack) {
        console.log(activityConfig);
        this.activityConfig = activityConfig;
        this.db = getDBConnection(activityConfig.database);
        this.userID = activityConfig.userID;
        this.activityID = activityConfig.activityID;
        this.activityKey = activityConfig.activityKey;
        this.features = activityConfig.activityFeatures;
        // bind event handlers
        this.onSlideEnter = this.onSlideEnter.bind(this);
        this.onQuestionSubmit = this.onQuestionSubmit.bind(this);
        this.onInteractiveItemSubmit = this.onInteractiveItemSubmit.bind(this);
        this.onVarChange = this.onVarChange.bind(this);
        // this.onSlideTransition = this.onSlideTransition.bind(this);
        this.cp = document.Captivate;
        this.cpAPI = cpAPI;
        this.cpEventEmitter = this.cpAPI.getEventEmitter();
        this.variablesToTrack = variablesToTrack;
        }


    init() {
        this.db.setCredentials(this.userID);
        this.getAppData()
        .then((state) => {
            console.log("getAppData() returned:", state);
            if (typeof(state) === "undefined" || null === state) {
                // if no state exists in db, copy INITIAL_STATE
                this.state = { ...INITIAL_STATE };
            } else {
                console.log("Restoring App State from database");
                this.state = state;
            }
            this.showState();
            return this.state;
        })
        .then(() => {
            // do some stuff beforehand (if necessary) prior to
            // setting up event handlers
            this.processFeatures();
            this.restoreCaptivateState();
            // call hook to do app-specific stuff - primarily for
            // development, but I suppose it could be useful for other stuff
            this.appSpecificInit();
            this.setupEventHandlers();
        });

    }

    processFeatures() {

    }

    restoreCaptivateState() {

        for (let varName of this.variablesToTrack) {
            if (varName in this.state) {
                console.log(`Restoring Captivate Variable "${varName}" to ${this.state[varName]}`);
                this.setCaptivateVariable(varName, this.state[varName]);
            }
        }
        if ("currentSlide" in this.state) {
            console.log(`restoring to slide number ${this.state.currentSlide}`);
            this.gotoSlide(this.state.currentSlide);
        } else {
            console.log("skipping slide 1");
            this.gotoSlide(2);
        }

        this.restoreMultiStateObjects();
    }

    restoreMultiStateObjects() {}

    appSpecificInit() {

    }

    showState() {
        console.log(this.state);
    }

    pushTransition(transition) {
        // console.log(transition);
        this.state.transitions.push(transition);
        this.state.currentSlide = transition.slide_number;
        this.showState();
    }

    pushAnswer(answer) {
        // console.log(answer);
        this.state.answers.push(answer);
        this.showState();
    }

    pushVarChange(varChange) {
        if (typeof (this.state.variableChanges) === "undefined") {
            this.state.variableChanges = [];
        }
        this.state.variableChanges.push(varChange);
        this.showState();
    }


    setupEventHandlers() {
        this.cpEventEmitter.addEventListener(EVT_ON_SLIDE_ENTER,
                                             this.onSlideEnter);
        // this.cpEventEmitter.addEventListener(EVT_ON_SLIDE_EXIT,
        //                                      this.onSlideTransition);
        this.cpEventEmitter.addEventListener(EVT_ON_QUES_SUBMIT,
                                             this.onQuestionSubmit);
        this.cpEventEmitter.addEventListener(EVT_ON_INTERACTION_SUBMIT,
                                             this.onInteractiveItemSubmit);
        for (let varName of this.variablesToTrack) {
            this.cpEventEmitter.addEventListener(
                EVT_ON_VAR_CHANGE, this.onVarChange, varName
            );
        }
        this.setupCustomEventHandlers();
    }

    setupCustomEventHandlers() {
        // hook for initializing any custom event handlers
    }

    onSlideEnter(evt) {
        this.pushTransition({
            slide_number: evt.cpData.slideNumber,
            slide_label: evt.cpData.lb,
            timestamp: Date.now()
        });
        this.saveAppData();
    }

    getAppData() {
        console.log("looking for saved app data in database");
        return this.db.getActivityData(this.activityKey)
        .then((data) => {
            console.log(data);
            return data;
        });
    }

    saveAppData() {
        console.log("saving app data");
        this.db.setActivityData(this.activityKey, this.state)
    }
    // onSlideTransition(evt) {
    //     // console.log(evt);
    //     const transitionType = ("CPSlideEnter" === evt.cpName) ? "enter" : "exit";
    //     let label = evt.cpData.lb;
    //     const slideNumber = `${evt.cpData.slideNumber}`;
    //     if ("" === label) {
    //         label = slideNumber;
    //     }
    //     const now = Date.now();
    //     console.log(`${now}:: ${transitionType}ing slide: ${label}`);
    // }

    onQuestionSubmit(evt) {
        let data = Object.assign(evt.cpData, {timestamp: Date.now()});
        this.pushAnswer(data);
    }

    onInteractiveItemSubmit(evt) {
        console.log("onInteractiveItemSubmit()")
        let data = Object.assign(evt.cpData, {timestamp: Date.now()});
        console.log(data);
    }

    onVarChange(evt) {
        const now = Date.now();
        const varName = evt.cpData.varName;
        const newVal = evt.cpData.newVal;
        const oldVal = evt.cpData.oldVal;
        console.log(`Captivate variable ${varName} changed from: ${oldVal} to: ${newVal}`);
        this.state[varName] = newVal;
        this.pushVarChange({
            variable: varName,
            newValue: newVal,
            oldValue: oldVal,
            timestamp: now
        });
    }

    gotoSlide(slideNumber) {
        // wierd. when animate reports the slide number you are on, they
        // are one-based, but gotoSlide() is 0 based
        console.log("manually navigating to slide:", slideNumber);
        this.cpAPI.gotoSlide(slideNumber-1);
    }

    setCaptivateVariable(varName, value) {
        this.cpAPI.setVariableValue(varName, value);
    }

    goHomePage() {
        // top instead of window because we're in an iframe
        let url = this.activityConfig.homepage;
        // console.log(url);
        top.location.href = url;
    }
}
