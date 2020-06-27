

const EVT_ON_VAR_CHANGE  = "CPAPI_VARIABLEVALUECHANGED";
const EVT_ON_SLIDE_ENTER = "CPAPI_SLIDEENTER";
const EVT_ON_SLIDE_EXIT  = "CPAPI_SLIDEEXIT";
const EVT_ON_QUES_SUBMIT = "CPAPI_QUESTIONSUBMIT";

const TRACKED_VARS = [
    "condition", "prediction", "gender", "VINname", "twinName"
];

let cpAPI;
let cpEventEmitter;
let prevSlide = "";

function onQuestionSubmit(evt) {
    console.log(evt);
}

function onSlideTransition(evt) {
    // console.log(evt);
    const transitionType = ("CPSlideEnter" === evt.cpName) ? "enter" : "exit";
    let label = evt.cpData.lb;
    const slideNumber = `${evt.cpData.slideNumber}`;
    if ("" === label) {
        label = slideNumber;
    }
    const now = new Date().toLocaleString();
    console.log(`${transitionType}ing slide: ${label} time: ${now}`);
}


function onVarChange(evt) {
    const varName = evt.cpData.varName;
    const oldVal = evt.cpData.oldVal;
    const newVal = evt.cpData.newVal;
    console.log(`${varName} changed from: ${oldVal} to: ${newVal}`);
}

function myInit() {
    for (let varName of TRACKED_VARS) {
        cpEventEmitter.addEventListener(EVT_ON_VAR_CHANGE,
                                        onVarChange,
                                        varName);
    }
    cpEventEmitter.addEventListener(EVT_ON_SLIDE_ENTER, onSlideTransition);
    cpEventEmitter.addEventListener(EVT_ON_SLIDE_EXIT,  onSlideTransition);
    cpEventEmitter.addEventListener(EVT_ON_QUES_SUBMIT, onQuestionSubmit);
}

function onModuleReady(event) {
    // event.Data is the same as window.cpAPIInterface
    cpAPI = event.Data;
    cpEventEmitter = cpAPI.getEventEmitter();
    myInit();
}

// window.addEventListener("load", initIframe);
window.addEventListener("moduleReadyEvent", onModuleReady);