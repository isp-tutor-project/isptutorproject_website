export const EVT_ON_VAR_CHANGE  = "CPAPI_VARIABLEVALUECHANGED";
export const EVT_ON_SLIDE_ENTER = "CPAPI_SLIDEENTER";
export const EVT_ON_SLIDE_EXIT  = "CPAPI_SLIDEEXIT";
export const EVT_ON_QUES_SUBMIT = "CPAPI_QUESTIONSUBMIT";


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
    constructor(cpAPI, db, variablesToTrack) {
        // bind event handlers
        this.onSlideEnter = this.onSlideEnter.bind(this);
        // this.onSlideTransition = this.onSlideTransition.bind(this);
        this.onQuestionSubmit = this.onQuestionSubmit.bind(this);
        this.onVarChange = this.onVarChange.bind(this);
        this.cpAPI = cpAPI;
        this.cpEventEmitter = this.cpAPI.getEventEmitter();
        this.variablesToTrack = variablesToTrack;
        this.userID = localStorage.getItem("userID");
        this.classCode = localStorage.getItem("classCode");
        this.currentActivity = localStorage.getItem("currentActivity");
        this.features = (localStorage.getItem("currentActivityFeatures") || "")
                        .split(":").filter((item) => item !== "");
        this.db = db;
    }


    init() {
        this.db.setCredentials(this.classCode, this.userID);
        this.db.getActivityData(this.currentActivity)
        .then((data) => {
            if (typeof(data) === "undefined" || null === data) {
                // if no state exists in db, copy INITIAL_STATE
                this.state = { ...INITIAL_STATE };
            } else {
                this.state = data;
            }
            this.showState();
            return this.state;
        })
        .then(() => {
            // do some stuff beforehand (if necessary) prior to
            // setting up event handlers
            this.processFeatures();
            this.restoreCaptivateState();
            this.setupEventHandlers();
        });

    }

    processFeatures() {

    }

    restoreCaptivateState() {

    }

    showState() {
        console.log(this.state);
    }

    pushTransition(transition) {
        // console.log(transition);
        this.state.transitions.push(transition);
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

    onVarChange(evt) {
        const now = Date.now();
        const varName = evt.cpData.varName;
        const newVal = evt.cpData.newVal;
        const oldVal = evt.cpData.oldVal;
        this.state[varName] = newVal;
        this.pushVarChange({
            variable: varName,
            newValue: newVal,
            oldValue: oldVal,
            timestamp: now
        });
    }

    gotoSlide(slideNumber) {
        console.log("manually navigating to slide:", slideNumber);
        this.cpAPI.gotoSlide(slideNumber);
    }

    setCaptivateVariable(varName, value) {
        this.cpAPI.setVariableValue(varName, value);
    }

}
