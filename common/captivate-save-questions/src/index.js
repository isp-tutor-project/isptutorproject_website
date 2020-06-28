const EVT_ON_VAR_CHANGE = "CPAPI_VARIABLEVALUECHANGED";
const EVT_ON_SLIDE_ENTER = "CPAPI_SLIDEENTER";
const EVT_ON_SLIDE_EXIT = "CPAPI_SLIDEEXIT";
const EVT_ON_QUES_SUBMIT = "CPAPI_QUESTIONSUBMIT";


class ISPCaptivateActivity {
    constructor(varsToTrack) {
        this.varsToTrack = varsToTrack;
        this.state = {
        };
        // bind event handlers
        this.onModuleReady = this.onModuleReady.bind(this);
        this.onSlideTransition = this.onSlideTransition.bind(this);
        this.onVarChange = this.onVarChange.bind(this);
        this.onQuestionSubmit = this.onQuestionSubmit.bind(this);
        // add event handler for initialization
        window.addEventListener("moduleReadyEvent", this.onModuleReady);
        this.prevSlide = "";
    }

    onModuleReady(event) {
        // event.Data is the same as window.cpAPIInterface
        this.cpAPI = event.Data;
        this.cpEventEmitter = cpAPI.getEventEmitter();
        this.setupEventHandlers();
    }

    setupEventHandlers() {
        cpEventEmitter.addEventListener(EVT_ON_SLIDE_ENTER, onSlideTransition);
        cpEventEmitter.addEventListener(EVT_ON_SLIDE_EXIT, onSlideTransition);
        cpEventEmitter.addEventListener(EVT_ON_QUES_SUBMIT, onQuestionSubmit);
        for (let varName of this.varsToTrack) {
            cpEventEmitter.addEventListener(
                EVT_ON_VAR_CHANGE, onVarChange, varName
            );
        }
    }

    onSlideTransition(evt) {
        // console.log(evt);
        const transitionType = ("CPSlideEnter" === evt.cpName) ? "enter" : "exit";
        let label = evt.cpData.lb;
        const slideNumber = `${evt.cpData.slideNumber}`;
        if ("" === label) {
            label = slideNumber;
        }
        const now = new Date().toLocaleString();
        console.log(`${now}:: ${transitionType}ing slide: ${label}`);
    }

    onVarChange(evt) {
        const varName = evt.cpData.varName;
        const oldVal = evt.cpData.oldVal;
        const newVal = evt.cpData.newVal;
        const now = new Date().toLocaleString();
        console.log(`${now}:: variable ${varName} changed from: "${oldVal}" to: "${newVal}"`);
    }

    onQuestionSubmit(evt) {
        console.log(evt);
    }

}
