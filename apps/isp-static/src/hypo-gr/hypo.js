// this is hypo.js, responsible for the functionality of the hypo module

/*
 * This is some serious code smell if I need to tell the linter to not
 * complain about all of these variables from other <script> tags
 * FIXME: We need a build system
 */
/*global db, collectionID, userID */
/*global createjs */

import "./styles/index.css";
import { getDBConnection } from "@isptutorproject/isp-database";
import { NavBar } from "@isptutorproject/navbar";
import { SnackBar } from "@isptutorproject/snackbar";
import { ontology } from "./ontology";
import { hypoOntology } from "./hypoOntology";
import {
    computeHypoTasks
} from "./features";

const snackbar = new SnackBar();
const navbar = new NavBar();
let db;

// ============================================================================
// ======================== Constants and Variables ===========================
// ============================================================================

// calculuate the pixel ratio of the screen
const PIXEL_RATIO = (function () {
    var ctx = document.createElement("canvas").getContext("2d"),
        dpr = window.devicePixelRatio || 1,
        bsr = ctx.webkitBackingStorePixelRatio ||
        ctx.mozBackingStorePixelRatio ||
        ctx.msBackingStorePixelRatio ||
        ctx.oBackingStorePixelRatio ||
        ctx.backingStorePixelRatio || 1;
    let pRatio = dpr / bsr;
    return pRatio;
})();

// constants regarding canvas size
const CANVAS_WIDTH = 1200;
const CANVAS_HEIGHT = 750;

// calculate the scaling ratio for making canvas responsive
const SCALE_RATIO = (function () {
    let iw = window.innerWidth;
    let ih = window.innerHeight;
    let xRatio = iw / CANVAS_WIDTH;
    let yRatio = ih / CANVAS_HEIGHT;
    let sRatio = Math.min(xRatio, yRatio);
    return sRatio;
})();

// for keeping track of scaling ratio in makeResponsive;
let scalingRatio = 1;

// constants regarding bubble customization
const BUBBLE_WIDTH = 120;
const BUBBLE_HEIGHT = 100;
const BUBBLE_RADIUS = 10;
const BUBBLE_INCREMENT = .5 * BUBBLE_WIDTH;
const BUBBLE_COLOR = "#4286f4";
const FIXED_BUBBLE_COLOR = "#99bbff";

const BUTTON_WIDTH = 80;
const BUTTON_HEIGHT = 40;
const BUTTON_RADIUS = 10;
const BUTTON_COLOR = "#136bfb";

const ARROW_BACKGROUND_WIDTH = 20;
const ARROW_BACKGROUND_HEIGHT = 20;

const OPTION_MIN_WIDTH = 100;
const OPTION_HEIGHT = 40;
const OPTION_COLOR = "#f4d041";

const CONNECTOR_RADIUS = (createjs.Touch.isSupported()) ? 15 : 7;

// constants regarding position of nodes,
// nodes/bubbles are centered upon the x and y positions selected
const BUBBLE_X = CANVAS_WIDTH / 4;
const BUBBLE_Y = CANVAS_HEIGHT * .75 - 1.5 * BUBBLE_HEIGHT;

// const IV_X = CANVAS_WIDTH * 0.1;
const IV_X = CANVAS_WIDTH * 0.175;
const IV_Y = CANVAS_HEIGHT * 0.8;

// const DV_X = CANVAS_WIDTH * 0.9;
const DV_X = CANVAS_WIDTH * 0.825;
const DV_Y = CANVAS_HEIGHT * 0.8;

// these are for displaying information
let stage;
// isn't used anywhere
// let textField;
// yellow panel that shows up upon mouse click
let panel;

// related with drawing arrows
let currentArrow = null;
// no longer using
// let connectorOver = null;
let somethingHighlighted = false;

// for option width purposes
let optionWidth;

// for storing steps taken by user
//    steps include an action, an object, an index, a timestamp, and possibly
//    additional text
let steps;

// this queue is for the preloader to contain all the image files that have
// been preloaded
let queue;
// for the loading text at start
let loadingText;


// placeholder (Crystal) constants regarding values of nodes
// FIXME: we need a better way to have default values without resorting to
// globals
// const IV = "Initial water temperature"
// const DV = "Amount crystal growth on string"
// // there can be 1 - 8 nodes (or else it will look strange)
// const NODES = [
//     "Kinetic energy of water molecules",
//     "Evaporation rate of water",
//     "Amount of water in jar",
//     "Concentration of Na+ and Cl- in water",
//     "Amount of water string absorbs"
// ];
// const CAUSES = [
//     "Electric force",
//     "Conservation of matter",
//     "Energy to escape electric forces"
// ];
const IV = "Independent Variable"
const DV = "Dependent Variable"
// there can be 1 - 8 nodes (or else it will look strange)
const NODES = [
    "Concept 1",
    "Concept 2",
    "Concept 3"
];
const CAUSES = [
    "Cause 1",
    "Cause 2",
    "Cause 3",
    "Cause 4"
];

/*
 * Alternative placeholder values for Stefani's Concept Map Video
 */
// const IV = "Listening to songs while studying"
// const DV = "Grades in the class"
// // there can be 1 - 8 nodes (or else it will look strange)
// const NODES = [
//     "Knowledge of lyrics",
//     "Reading comprehension of material",
//     "Learning of material"
// ];
// const CAUSES = [
//     "Concentration",
//     "Familiarity",
//     "Mood"
// ];


// variable versions of iv and dv. setting them to the defaults above, and
// later if loadData() is successfull, the defaults will be overriden by what's
// in firebase
let iv = IV;
let dv = DV;
// abbreviated dv
let dvabb = DV;
let nodes = NODES;
// these two negative indices are just using while logging steps
nodes[-2] = IV;
nodes[-1] = DV;
let causes = CAUSES;

// true corresponds to "increasing" and false corresponds to "decreasing"
// FIXME: Scott's not sure this makes sense.  Basically both predictions
// end up with a value of "increasing" prior to the student doing anything
let firstPrediction; //= true;
let secondPrediction; //= true;

// The following state vars were added by Scott as we wanted to both display what
// the user previously selected when they return to the page via a back button
// and if the user had saved a subsequent concept map, no longer allow them
// to change the prediction they made beforehand.answered

// if true, will highlight the current value, but still let you change it
// if this gets set to true, you will not be able to change the first prediction
let initialHypoLocked;
let initialHypoLockedReason = "";
// ditto for the second prediction
let finalHypoLocked;
let finalHypoLockedReason = "";

let currentHypo;
let currentBubbles;
let arrowz;

// ============================================================================
// ================================= database =================================
// ============================================================================

// this is old function to load rq data, uses hypoOntology.js, might not work
// anymore
//
// Scott - this is definitely working, as it's in use and the rqted
// data is indeed fetched.  My question is, does this really need to be an
// async function?  all of the other firebase promise stuff isn't and works
// // just fine
// async function getTutorState() {
//     let jsonData = null;
//     if (userID == null) {
//         console.log("userID is null");
//         return null;
//     }
//     var docRef = db.collection(collectionID).doc(userID);
//     await docRef.get().then(function (doc) {
//         if (doc.exists) {
//             console.log("Document exists");
//             jsonData = doc.data().rqted;
//         } else {
//             // doc.data() will be undefined in this case
//             console.log("No such document!");
//         }
//     }).catch(function (error) {
//         console.log("Error getting document:", error);
//     });
//     //console.log("returned data: "+ jsonData);
//     return jsonData;
// }

function loadData() {
    // gets the users data from the db and then sets some
    // module-specific variables based on what it recieves
    return db.getUserData()
    .then((userData) => {
        console.log("loadData", userData);
        console.log(typeof(userData));
        firstPrediction = userData.firstPrediction;
        initialHypoLocked = userData.initialHypo !== null;
        secondPrediction = userData.secondPrediction;
        finalHypoLocked = userData.finalHypo !== null;
        if (userData.finalHypo && userData.finalHypo.notesHtml) {
            let notes = document.getElementById("notepad_notes");
            notes.innerHTML = userData.finalHypo.notesHtml
        }
        if (userData.rqted && userData.rqted.moduleState) {
            let moduleData = userData.rqted.moduleState;
            let area = moduleData['selectedArea']['index'];
            let topic = moduleData['selectedTopic']['index'];
            let variable = moduleData['selectedVariable']['index'];
            // ontology stuff
            let ontologyTopic = ontology['_ONTOLOGY']['S']['A' + area]['T' + topic];
            iv = ontologyTopic['enumValue' + variable];
            dv = ontologyTopic['DVs'];
            dvabb = ontologyTopic['DVabb'];
            // hypoOntology stuff
            let hypoOntologyTopic = hypoOntology['A' + area]['T' + topic]['V' + variable];
            if (hypoOntologyTopic['IV'] != "") {
                iv = hypoOntologyTopic['IV'];
            }
            if (hypoOntologyTopic['DV'] != "") {
                dv = hypoOntologyTopic['DV'];
            }
            if (hypoOntologyTopic['DVabb'] != "") {
                dvabb = hypoOntologyTopic['DVabb'];
            }
            causes = hypoOntologyTopic['CAUSES'];
            nodes = hypoOntologyTopic['NODES'];
            nodes[-2] = iv;
            nodes[-1] = dvabb;
        }
        // console.log(`
        // firstPrediction: ${firstPrediction}
        // initialHypoLocked: ${initialHypoLocked}
        // secondPrediction: ${secondPrediction}
        // finalHypoLocked: ${finalHypoLocked}
        // iv: ${iv}
        // dv: ${dv}
        // dvabb: ${dvabb}
        // nodes: ${nodes}
        // causes: ${causes}
        // `);
        // console.log(area + "," + topic + "," + variable);
        // console.log(hypoOntologyTopic)

        return userData;
    });
}

/*
 * saves the first/secondPrediction to firebase
 */
function logPrediction(fldName, fldValue) {
    // return db.collection(collectionID).doc(userID).update({
    //     [fldName]: boolPredictionToString(fldValue)
    // })
    return db.saveValue(fldName, fldValue)
    .then(() => {
        return true;
    })
    .catch(function (error) {
        console.error(error);
        return false;
    });
}


/*
 * saves a hypothesis (concept map) to firebase.  based on ones condition, there
 * may be more than one hypothesis, so there is a 'whichHypo' param
 */
function logData2(ivBubble, whichHypo) {
    let log = {};
    let currentPrediction;
    let currentPredictionValue;
    if ("initial" === whichHypo) {
        currentPrediction = "first";
        currentPredictionValue = firstPrediction;
    } else if ("opposite" === whichHypo) {
        currentPrediction = "opposite(first)";
        currentPredictionValue = (firstPrediction === "increase") ? "decrease" : "increase";
    } else {
        currentPrediction = "second";
        currentPredictionValue = secondPrediction;
    }
    log.currentPrediction = currentPrediction;
    log.currentPredictionValue = currentPredictionValue;
    let notes = document.getElementById("notepad_notes");
    let nodes = [];
    let arrowLabels = [];
    let directions = [];
    let connector = ivBubble.outConnector;
    while (connector != null) {
        let arrow = connector.arrow;
        arrowLabels.push(arrow.label.text.replace("\n", " "));
        let nextBubble = arrow.connectorOver.parent;
        nodes.push(nextBubble.text);
        directions.push(nextBubble.getChildByName("dirButton").direction);
        connector = nextBubble.outConnector;
    }
    log.nodes = nodes;
    log.arrowLabels = arrowLabels;
    log.directions = directions;
    log.steps = steps;
    log.notes = notes.innerText;
    // db.collection(collectionID).doc(userID).update({
    //     [`${whichHypo}Hypo`]: JSON.stringify(log)
    // })
    db.saveJSONValue(`${whichHypo}Hypo`, log)
    .then(() => {
        console.log("Successfully logged hypothesis data");
        snackbar.show("Successfully logged hypothesis data.");
        console.log(log);
    })
    .catch((error) => {
        console.error("Error writing document: ", error);
        snackbar.show("Error: Failed to log hypothesis data.");
    });
}

function logData(ivBubble, whichHypo) {
    let log = {};
    let currentPrediction;
    let currentPredictionValue;
    if ("initial" === whichHypo) {
        currentPrediction = "first";
        currentPredictionValue = firstPrediction;
    } else if ("opposite" === whichHypo) {
        currentPrediction = "opposite(first)";
        currentPredictionValue = (firstPrediction === "increase") ? "decrease" : "increase";
    } else {
        currentPrediction = "second";
        currentPredictionValue = secondPrediction;
    }
    let notes = document.getElementById("notepad_notes");
    let notesHtml = notes.innerHTML;
    let notesText = notepadHtmlAsText(notesHtml);
    log.currentPrediction = currentPrediction;
    log.currentPredictionValue = currentPredictionValue;
    log.notesHtml = notesHtml;
    log.notesText = notesText;
    log.steps = steps;

    let concepts = [];
    let arrows = [];
    function logBubble(bub) {
        concepts.push({
            x: bub.x,
            y: bub.y,
            text: bub.text,
            direction: bub.getChildByName("dirButton").direction,
            isFixed: bub.isFixed,
            isDV: bub.isDV
        });
    }
    // let nodes = [];
    // let arrowLabels = [];
    // let directions = [];
    // logBubble(currBubble);
    // let connector = currBubble.outConnector;
    let currBubble = ivBubble;
    while (currBubble) {
        logBubble(currBubble);
        let connector = currBubble.outConnector;
        if (!connector) {
            break;
        }
        let from = currBubble.text;
        let arrow = connector.arrow;
        let label = arrow.label.text;
        // arrowLabels.push(arrow.label.text.replace("\n", " "));
        let nextBubble = arrow.connectorOver.parent;
        let to = nextBubble.text;
        arrows.push({from, to, label});
        currBubble = nextBubble;
        // nodes.push(nextBubble.text);
        // directions.push(nextBubble.getChildByName("dirButton").direction);
        // connector = nextBubble.outConnector;
    }
    log.concepts = concepts;
    log.arrows = arrows;
    // log.nodes = nodes;
    // log.arrowLabels = arrowLabels;
    // log.directions = directions;
    // log.notes = notes.innerText;
    // db.collection(collectionID).doc(userID).update({
    //     [`${whichHypo}Hypo`]: JSON.stringify(log)
    // })
    db.saveJSONValue(`${whichHypo}Hypo`, log)
        .then(() => {
            console.log("Successfully logged hypothesis data");
            snackbar.show("Successfully logged hypothesis data.");
            console.log(log);
        })
        .catch((error) => {
            console.error("Error writing document: ", error);
            snackbar.show("Error: Failed to log hypothesis data.");
        });
}

// ============================================================================
// ====================== App Initializization ================================
// ============================================================================

// init is the first function to be called
function initHypoPage() {
    // starts the preloader
    loadAssets();
}


function loadAssets() {
    // display loading image
    document.getElementById("loading_gif").classList.remove("hidden");
    // preload assets
    queue = new createjs.LoadQueue();
    // assetsLoadingComplete() will be called once all assets have been loaded
    queue.on("complete", assetsLoadingComplete);
    queue.loadManifest([
        { id: "TeacherPointing",         src: "img/hypo-gr/slide_intro/TeacherPointing.jpg" },
        { id: "TeacherPointing2",        src: "img/hypo-gr/slide_intro/TeacherPointing2.jpg" },
        { id: "defGraph",                src: "img/hypo-gr/slide1/defGraph.png" },
        { id: "causeGraph",              src: "img/hypo-gr/slide1/causeGraph.png" },
        { id: "corrGraph",               src: "img/hypo-gr/slide1/corrGraph.png" },
        { id: "densitygraphic",          src: "img/hypo-gr/slide2/densitygraphic.jpg" },
        { id: "coffeegraphic",           src: "img/hypo-gr/slide3/coffeegraphic.jpg" },
        { id: "comic",                   src: "img/hypo-gr/slide3/comic.jpg" },
        { id: "correlation",             src: "img/hypo-gr/slide4/correlation.png" },
        { id: "IceCreamSwimming",        src: "img/hypo-gr/slide4/IceCreamSwimming.png" },
        { id: "graph1",                  src: "img/hypo-gr/slide4/graph1.png" },
        { id: "graph2",                  src: "img/hypo-gr/slide4/graph2.png" },
        { id: "causation_correlation",   src: "img/hypo-gr/slide5/PizzaGradesStudy.png" },
        { id: "Picture_SunTempIcecream", src: "img/hypo-gr/slide5/SunTempIcecream.png" },
        { id: "Crys_increases",          src: "img/hypo-gr/graphSlides/Crys_increases.png" },
        { id: "Crys_decreases",          src: "img/hypo-gr/graphSlides/Crys_decreases.png" },
        { id: "cptMapPlaceholder",       src: "img/hypo-gr/cptMapPlaceholder/cptMapPlaceholder.jpg" },
        { id: "defPagesCptMap",          src: "img/hypo-gr/defPagesCptMap.png" },
        { id: "ivToDvWithArrow",         src: "img/hypo-gr/iv2dvWithArrow.png" },
        { id: "yellowBtn",               src: "img/hypo-gr/buttonyellow.png" },
        { id: "orangeBtn",               src: "img/hypo-gr/buttonorange.png" },
        { id: "lightbulb",               src: "img/hypo-gr/lightbulb.png" },
    ]);
}

function assetsLoadingComplete(event) {
    // hide the loading image
    document.getElementById("loading_gif").classList.add("hidden");
    initStage();
    loadData()
    .then((userData) => {
        // goes to the approrpriate hypo module page based on
        // the users condition as well as returning to whatever
        // page they may have been on if returning
        initHypoTasks(userData);
    });
}

function initStage() {
    let can = document.getElementById("hypo-canvas");

    // stage = new createjs.Stage("hypo-canvas");
    stage = new createjs.Stage(can);

    function makeResponsive(isResp, respDim, isScale, scaleType) {
        var lastW, lastH, lastS = 1;
        window.addEventListener('resize', resizeCanvas);
        resizeCanvas();

        function resizeCanvas() {
            var w = CANVAS_WIDTH,
                h = CANVAS_HEIGHT;
            var iw = window.innerWidth,
                ih = window.innerHeight;
            var pRatio = PIXEL_RATIO;
            // necessary for dom elements to look right
            pRatio *= 2;
            var xRatio = iw / w,
                yRatio = ih / h,
                sRatio = 1;
            if (isResp) {
                if ((respDim == 'width' && lastW == iw) ||
                    (respDim == 'height' && lastH == ih)) {
                    sRatio = lastS;
                } else if (!isScale) {
                    if (iw < w || ih < h)
                        sRatio = Math.min(xRatio, yRatio);
                } else if (scaleType == 1) {
                    sRatio = Math.min(xRatio, yRatio);
                } else if (scaleType == 2) {
                    sRatio = Math.max(xRatio, yRatio);
                }
            }
            can.width = w * pRatio * sRatio;
            can.height = h * pRatio * sRatio;
            can.style.width = w * sRatio + 'px';
            can.style.height = h * sRatio + 'px';
            stage.scaleX = scalingRatio = pRatio * sRatio;
            stage.scaleY = scalingRatio = pRatio * sRatio;
            lastW = iw;
            lastH = ih;
            lastS = sRatio;
            stage.tickOnUpdate = false;
            stage.update();
            stage.tickOnUpdate = true;
        }
    }

    if (createjs.Touch.isSupported()) {
        createjs.Touch.enable(stage);
        window.addEventListener("beforeunload", (e) => {
            createjs.Touch.disable(stage);
        });
    }

    // create canvas with the device resolution.
    // let myCanvas = createHiPPICanvas(CANVAS_WIDTH, CANVAS_HEIGHT, PIXEL_RATIO);
    makeResponsive(true, 'both', true, 1);

    // required to enable mouse hover events
    stage.enableMouseOver(5);
    // Ticker is primarily for mouse hover event
    createjs.Ticker.addEventListener("tick", stage);
}


// ===========================================================================
// =========================== Pages =========================================
// ===========================================================================

/* simple map of page names to functions which implement them */
const pageNamesToFunctions = {
    "raiseYourHand": raiseYourHand,
    "startPage": startPage,
    "definitionPage1": definitionPage1,
    "lessonOverview": lessonOverview,
    "lessonOverview2": lessonOverview2,
    "definitionPage2": definitionPage2,
    "definitionPage3": definitionPage3,
    "definitionPage4": definitionPage4,
    "definitionPage5": definitionPage5,
    "definitionPage6": definitionPage6,
    "causes1": causes1,
    "causes2": causes2,
    "corr1": corr1,
    "corr2": corr2,
    "quizPage": quizPage,
    "instructionPage": instructionPage,
    "backToYourRQ": backToYourRQ,
    "predictionPage1": predictionPage1,
    "graphPage": graphPage,
    "notePadPage": notePadPage,
    "initialConceptMap": initialConceptMap,
    "initialConceptMapPlaceholder": initialConceptMapPlaceholder,
    "biDirInstructionPage1": biDirInstructionPage1,
    "biDirInstructionPage2": biDirInstructionPage2,
    "biDirInstructionPage3": biDirInstructionPage3,
    "oppositeDirectionConceptMap": oppositeDirectionConceptMap,
    "brmPage": brmPage,
    "predictionPage2": predictionPage2,
    "finalConceptMap": finalConceptMap,
    "completePage": completePage,
};


/*
 * simple convenience function, as I'm needed to generate the student's
 * Research Question in multiple places
 */
function getRQ() {
    return "Does " + iv.toLowerCase() + " affect the " + dv.toLowerCase() + "?"
}

// this page is only used in classroom environments
function raiseYourHand() {
    stage.removeAllChildren();

    let image1 = new createjs.Bitmap(queue.getResult("TeacherPointing")).set({
        x: 50, y: 50
    });

    let text1 = new createjs.Text(
        "In your notebook for this experiment", "22px Arial", "#000"
    ).set({
        x: CANVAS_WIDTH / 2, y: 100, textAlign: "center"
    });

    let text2 = new createjs.Text(
        "Make sure you have written your research question ...",
        "22px Arial",
        "#000"
    ).set({
        x: CANVAS_WIDTH / 2, y: 175, textAlign: "center"
    });

    let text3 = new createjs.Text(getRQ(), "bold 22px Arial", "#000").set({
        x: CANVAS_WIDTH / 2, y: 250,
        textAlign: "center", lineHeight: 35, lineWidth: 700
    });

    let text4 = new createjs.Text(
        "on the cover page of your notebook ", "22px Arial", "#000"
    ).set({
        x: CANVAS_WIDTH / 2, y: 350, textAlign: "center"
    });

    let backButton = createBackButton();
    backButton.on("click", e => prevHypoTask());

    let nextButton = createNextButton();
    nextButton.on("click", e => nextHypoTask());

    stage.addChild(image1, text1, text2, text3, text4, backButton, nextButton);
    stage.update();
}

function startPage() {
    stage.removeAllChildren();
    let text = new createjs.Text(
        "Welcome to the ISP Tutor's Hypothesis module.",
        "28px Arial ",
        "#000"
    ).set({
        x: (CANVAS_WIDTH / 2) + 20, y: 80,
        textAlign: "center", lineWidth: 700, lineHeight: 35
    });
    // "\n\n" +
    //     "Before you start working on your hypothesis for your research " +
    //     "question, we will first define some important terms.",

    let image1 = new createjs.Bitmap(queue.getResult("TeacherPointing")).set({
        x: 40, y: 80
    });

    let nextButton = createLargeButton(CANVAS_WIDTH / 2, 350, "Next", BUTTON_COLOR);
    nextButton.on("click", nextHypoTask);

    stage.addChild(text, image1, nextButton);
    stage.update();
}

function definitionPage1() {
    stage.removeAllChildren();
    let text = new createjs.DOMElement("start_page_overlay").set({
        x: 0, y: 10 * 2 / PIXEL_RATIO,
        scaleX: 0.6 * 2 / PIXEL_RATIO, scaleY: 0.6 * 2 / PIXEL_RATIO
    });
    showDOMElement(text);

    let backButton = createBackButton();
    backButton.on("click", e => {
        hideDOMElement(text);
        prevHypoTask();
    });

    let nextButton = createNextButton();
    nextButton.on("click", e => {
        hideDOMElement(text);
        nextHypoTask();
    });

    stage.addChild(text, backButton, nextButton);
    stage.update();
}

function lessonOverview() {
    console.log("in lessonOverview()");
    stage.removeAllChildren();
    let overlay = document.getElementById("lesson_overview_overlay");
    let invisibles = overlay.querySelectorAll(".invisible");
    let showOnTransition = {};
    invisibles.forEach((inv) => {
        let showOn = inv.dataset.showOnTransition;
        // console.log("showOn", showOn, inv);
        if (!showOnTransition[showOn]) {
            showOnTransition[showOn] = [];
        }
        showOnTransition[showOn].push(inv);
    });
    // console.log(showOnTransition);
    let maxTransition = Math.max(...Object.keys(showOnTransition)) + 1;
    if (maxTransition === -Infinity) {
        maxTransition = 1;
    }
    // console.log(maxTransition);
    let currentTransition = 0;
    let html = new createjs.DOMElement("lesson_overview_overlay").set({
        x: 20 * 2 / PIXEL_RATIO, y: 10 * 2 / PIXEL_RATIO,
        scaleX: 0.55 * 2 / PIXEL_RATIO, scaleY: 0.55 * 2  / PIXEL_RATIO
    });

    let prevButton = createBackButton();
    prevButton.on("click", function() {
        hideDOMElement(html);
        prevHypoTask();
    });
    let nextButton = createNextButton();
    nextButton.on("click", function() {
        currentTransition++;
        // console.log(`current: ${currentTransition} max: ${maxTransition}`);
        if (currentTransition === maxTransition) {
            hideDOMElement(html);
            nextHypoTask();
        } else {
            if (showOnTransition[currentTransition]) {
                for (let ele of showOnTransition[currentTransition]) {
                    ele.classList.remove("invisible");
                }
            }
        }
    });
    stage.addChild(html, prevButton, nextButton);
    stage.update();
    showDOMElement(html);
}

function lessonOverview2() {
    stage.removeAllChildren();
    let overlay = document.getElementById("lesson_overview2_overlay");
    let invisibles = overlay.querySelectorAll(".invisible");
    let showOnTransition = {};
    invisibles.forEach((inv) => {
        let showOn = inv.dataset.showOnTransition;
        // console.log("showOn", showOn, inv);
        if (!showOnTransition[showOn]) {
            showOnTransition[showOn] = [];
        }
        showOnTransition[showOn].push(inv);
    });
    // console.log(showOnTransition);
    let maxTransition = Math.max(...Object.keys(showOnTransition)) + 1;
    if (maxTransition === -Infinity) {
        maxTransition = 1;
    }
    // console.log(maxTransition);
    let currentTransition = 0;

    let html = new createjs.DOMElement("lesson_overview2_overlay").set({
        x: 10 * 2 / PIXEL_RATIO, y: 10 * 2 / PIXEL_RATIO,
        scaleX: 0.55 * 2 / PIXEL_RATIO, scaleY: 0.55 * 2 / PIXEL_RATIO
    });

    let prevButton = createBackButton();
    prevButton.on("click", function () {
        hideDOMElement(html);
        prevHypoTask();
    });
    let nextButton = createNextButton();
    nextButton.on("click", function () {
        currentTransition++;
        // console.log(`current: ${currentTransition} max: ${maxTransition}`);
        if (currentTransition === maxTransition) {
            hideDOMElement(html);
            nextHypoTask();
        } else {
            if (showOnTransition[currentTransition]) {
                for (let ele of showOnTransition[currentTransition]) {
                    ele.classList.remove("invisible");
                }
            }
        }
    });
    stage.addChild(html, prevButton, nextButton);
    stage.update();
    showDOMElement(html);
}

function definitionPage2() {
    stage.removeAllChildren();

    let text = new createjs.Text(
        "You can use a concept map to help you explain how water temperature is " +
        "related to the weight of crystal growth.",
        "24px Arial",
        "#000"
    ).set({
        x: 80, y: 50, lineHeight: 35, lineWidth: CANVAS_WIDTH - 160
    });
    // "Many middle school students have difficulty writing a detailed scientific " +
    //     "explanation for their prediction.\n\nFor example, most middle school " +
    //     "students have difficulty explaining how hot/room temperature water " +
    //     "would lead to more crystal growth.",

    let image = new createjs.Bitmap(queue.getResult("ivToDvWithArrow")).set({
        x: 215, y: 485, scaleX: 0.55, scaleY: 0.55
    });

    let text2 = new createjs.Text("???", "bold 24px Arial", "#000").set({
        x: (CANVAS_WIDTH / 2) - 40, y: image.y - 20
    });

    let backButton = createBackButton();
    backButton.on("click", prevHypoTask);

    let nextButton = createNextButton();
    nextButton.on("click", nextHypoTask);

    stage.addChild(text, image, text2, backButton, nextButton);
    stage.update();
}


function definitionPage3() {
    stage.removeAllChildren();

    let text1 = new createjs.Text(
        "To help you write a detailed scientific explanation for your prediction, " +
        "we will ask you to make a concept map (an example is shown below). The " +
        "final concept map should show step-by-step how the independent variable " +
        "(water temperature) affects the dependent variable (amount of " +
        "crystal growth).",
        "24px Arial",
        "#000"
    ).set({
        x: 60, y: 40, lineHeight: 35, lineWidth: CANVAS_WIDTH - 120
    });

    let text2 = new createjs.Text(
        "You will do this by linking concepts that are closely or directly " +
        "related. For example, as shown below, Water temperature is closely " +
        "related to 'Concept 1'. 'Concept 1' is closely related to 'Concept 2', " +
        "and 'Concept 2' is directly related to 'Weight of crystal'.",
        "24px Arial",
        "#000"
    ).set({
        x: 100, y: 175, lineHeight: 35, lineWidth: CANVAS_WIDTH - 170
    });

    let image = new createjs.Bitmap(queue.getResult("defPagesCptMap")).set({
        x: 200, y: 350
    });

    let backButton = createBackButton();
    backButton.on("click", prevHypoTask);

    let nextButton = createNextButton();
    nextButton.on("click", nextHypoTask);

    stage.addChild(text1, text2, image, backButton, nextButton);
    stage.update();
}

function definitionPage4() {
    stage.removeAllChildren();

    let text = new createjs.Text(
        "For each connected pair of concepts (for example, water temperature and " +
        "Concept 1), you will be asked to indicate how the concepts are related.",
        "24px Arial",
        "#000"
    ).set({
        x: 60, y: 60, lineHeight: 35, lineWidth: CANVAS_WIDTH - 120
    });

    let text2 = new createjs.Text(
        "The relationships between concepts (as shown below) could be " +
        "correlations, causes, or definitions.",
        "24px Arial",
        "#000"
    ).set({
        x: 120, y: 150, lineHeight: 35, lineWidth: CANVAS_WIDTH - 200
    });

    let image = new createjs.Bitmap(queue.getResult("defPagesCptMap")).set({
        x: 200, y: 350
    });

    let backButton = createBackButton();
    backButton.on("click", prevHypoTask);

    let nextButton = createNextButton();
    nextButton.on("click", nextHypoTask);

    stage.addChild(text, text2, image, backButton, nextButton);
    stage.update();
}

function definitionPage5() {
    stage.removeAllChildren();
    // let image1 = new createjs.Bitmap(queue.getResult("defGraph")).set({
    //     x: 60, y: 300, scaleX: 0.5, scaleY: 0.5
    // });
    // let image2 = new createjs.Bitmap(queue.getResult("causeGraph")).set({
    //     x: 450, y: 500, scaleX: 0.5, scaleY: 0.5
    // });
    // let image3 = new createjs.Bitmap(queue.getResult("corrGraph")).set({
    //     x: 800, y: 300, scaleX: 0.5, scaleY: 0.5
    // });

    let title = new createjs.Text(
        "Types of Relationships",
        "bold 24px Arial",
        "#000"
    ).set({
        x: CANVAS_WIDTH / 2, y: 100, textAlign: "center"
    });

    let text1 = new createjs.Text(
        "When you make your explanation for your prediction, you will need to " +
        "choose the type of relationship between pairs of concepts. Here are " +
        "the three types of relationships you can choose:",
        "24px Arial",
        "#000"
    ).set({
        x: CANVAS_WIDTH / 2, y: 160,
        textAlign: "center", lineWidth: 1000, lineHeight: 30
    });

    let text2 = new createjs.Text(
        '(1) Definition\n\n(2) Cause\n\n(3) Correlation',
        "24px Arial",
        "#000"
    ).set({
        y: 300, textAlign: "left", lineHeight: 30
    });
    // hack to try and get left aligned text to align with center-aligned
    // text above.  not sure why the width is so large though
    let w = text2.getMeasuredWidth();
    text2.x = (CANVAS_WIDTH / 2) - (w / 6);
    // let text3 = new createjs.Text('', 'italic 14px Arial', "#000").set({
    //     x: CANVAS_WIDTH / 2, y: 370, textAlign: "center"
    // });

    let backButton = createBackButton();
    backButton.on("click", prevHypoTask);

    let nextButton = createNextButton();
    // let images = [image1, image2, image3];
    // let iteration = 0;
    nextButton.on("click", nextHypoTask);
    // nextButton.on("click", e => {
    //     if (iteration == 3) {
    //         nextHypoTask();
    //     } else {
    //         // console.log(images[iteration]);
    //         stage.addChild(images[iteration]);
    //         stage.update();
    //         iteration++;
    //     }
    // });

    stage.addChild(title, text1, text2, backButton, nextButton);
    // text3,
    stage.update();
}

function definitionPage6() {
    stage.removeAllChildren();
    let title = new createjs.Text(
        "Types of Relationships for Hypotheses",
        "bold 24px Arial",
        "#000"
    ).set({
        x: CANVAS_WIDTH / 2, y: 40, textAlign: "center"
    });

    let text1 = new createjs.Text(
        "(1) Definition: The meaning of a concept or another way of saying " +
        "the same thing.",
        "24px Arial",
        "#000"
    ).set({
        x: CANVAS_WIDTH / 2, y: 100, textAlign: "center"
    });

    let text2 = new createjs.Text(
        "Often, an “everyday” term is defined by the behaviors of " +
        "molecules...\n\nFor example, the concept of the “temperature” of " +
        "an object is defined as the average kinetic energy of the " +
        "molecules that make up the object.",
        "18px Arial",
        "#000"
    ).set({
        x: 150, y: 230, lineHeight: 25, lineWidth: 300
    });

    let text3 = new createjs.Text(
        "Or, “Density” is the amount of mass of an object divided by its " +
        "volume (or how much space it takes up).",
        "18px Arial",
        "#000"
    ).set({
        x: 150, y: 500, lineHeight: 25, lineWidth: 300,
    });

    let image1 = new createjs.DOMElement("temperature_gif_overlay");
    image1.x = 115 * 2 / PIXEL_RATIO;
    image1.y = 45 * 2 / PIXEL_RATIO;
    image1.scaleX = .15 * 2 / PIXEL_RATIO;
    image1.scaleY = .15 * 2 / PIXEL_RATIO;

    let image2 = new createjs.Bitmap(queue.getResult("densitygraphic")).set({
        x: 600, y: 440, scaleX: 0.5, scaleY: 0.5
    });

    let backButton = createBackButton();
    backButton.on("click", e => {
        hideDOMElement(image1);
        prevHypoTask();
    });

    let nextButton = createNextButton();
    let iteration = 0;
    nextButton.on("click", e => {
        if (iteration == 0) {
            stage.addChild(text2, image1);
            showDOMElement(image1);
            stage.update();
        } else if (iteration == 1) {
            stage.addChild(text3, image2);
            stage.update();
        } else if (iteration == 2) {
            hideDOMElement(image1);
            nextHypoTask();
        }
        iteration++;
    });

    stage.addChild(title, text1, backButton, nextButton);
    stage.update();
}

function causes1() {
    stage.removeAllChildren();
    let title = new createjs.Text(
        "Types of Relationships for Hypotheses",
        "bold 24px Arial",
        "#000"
    ).set({
        x: CANVAS_WIDTH / 2, y: 40, textAlign: "center"
    });

    let text1 = new createjs.Text(
        "(2) Causes: This is when a change in one variable makes another variable " +
        "change (or directly affects another variable).",
        "24px Arial",
        "#000"
    ).set({
        x: CANVAS_WIDTH / 2, y: 90, textAlign: "center", lineWidth: 1000
    });

    let text2 = new createjs.Text(
        "For example, a change in how distracted people are while driving affects " +
        "how well people drive.",
        "18px Arial",
        "#000"
    ).set({
        x: 150, y: 180, lineHeight: 25, lineWidth: 450
    });

    let text3 = new createjs.Text(
        "Or, changing the amount of caffeine we drink causes a change in how " +
        "how alert we are.",
        "18px Arial",
        "#000"
    ).set({
        x: 650, y: 180, lineHeight: 25, lineWidth: 450
    });

    let image1 = new createjs.Bitmap(queue.getResult("comic")).set({
        x: 150, y: 300, scaleX: 0.8, scaleY: 0.7,
    });

    let image2 = new createjs.Bitmap(queue.getResult("coffeegraphic")).set({
        x: 650, y: 300, scaleX: 0.7, scaleY: 0.7
    });

    let backButton = createBackButton();
    backButton.on("click", prevHypoTask);

    let nextButton = createNextButton();
    let iteration = 0;
    nextButton.on("click", e => {
        if (iteration == 0) {
            stage.addChild(text2, image1);
            stage.update();
        } else if (iteration == 1) {
            stage.addChild(text3, image2);
            stage.update();
        } else if (iteration == 2) {
            nextHypoTask();
        }
        iteration++;
    });

    stage.addChild(title, text1, backButton, nextButton);
    stage.update();
}

function causes2() {
    stage.removeAllChildren();
    let title = new createjs.Text(
        "Types of Relationships for Hypotheses",
        "bold 24px Arial",
        "#000"
    ).set({
        x: CANVAS_WIDTH / 2, y: 40, textAlign: "center"
    });

    let text1 = new createjs.Text(
        "(2) Causes: This is when a change in one variable makes another variable " +
        "change.",
        "24px Arial",
        "#000"
    ).set({
        x: CANVAS_WIDTH / 2, y: 90,
        textAlign: "center", lineWidth: 1000, lineHeight: 20
    });

    let text2 = new createjs.Text(
        "Often we can explain a cause-effect relationship in more detail...",
        "24px Arial",
        "#000"
    ).set({
        x: CANVAS_WIDTH / 2, y: 125,
        textAlign: "center", lineWidth: 1000, lineHeight: 20
    });

    let html1 = new createjs.DOMElement("causes2_driving_overlay").set({
        x: 38 * 2 / PIXEL_RATIO, y: 45 * 2 / PIXEL_RATIO,
        scaleX: 0.2 * 2 / PIXEL_RATIO, scaleY: 0.2 * 2 / PIXEL_RATIO
    });

    let html2 = new createjs.DOMElement("causes2_coffee_overlay").set({
        x: 163 * 2 / PIXEL_RATIO, y: 45 * 2 / PIXEL_RATIO,
        scaleX: 0.2 * 2 / PIXEL_RATIO, scaleY: 0.2 * 2 / PIXEL_RATIO
    });

    let image1 = new createjs.Bitmap(queue.getResult("comic")).set({
        x: 150, y: 300, scaleX: 0.8, scaleY: 0.7,
    });

    let image2 = new createjs.Bitmap(queue.getResult("coffeegraphic")).set({
        x: 650, y: 300, scaleX: 0.7, scaleY: 0.7
    });

    let text5 = new createjs.Text(
        "In the concept map, if you select “cause” for the type of relationship, " +
        "you will be asked to pick another concept that explains the relationship.",
        "bold 18px Arial",
        "#000"
    ).set({
        x: 150, y: 600, lineHeight: 25, lineWidth: CANVAS_WIDTH - 200
    });


    let backButton = createBackButton();
    backButton.on("click", function() {
        hideDOMElement(html1);
        hideDOMElement(html2);
        prevHypoTask();
    });

    let nextButton = createNextButton();
    let iteration = 0;
    nextButton.on("click", e => {
        if (iteration === 0) {
            stage.addChild(text2);
            stage.update();
        } else if (iteration === 1) {
            stage.addChild(html1, image1);
            stage.update();
            showDOMElement(html1);
        } else if (iteration === 2) {
            stage.addChild(html2, image2);
            stage.update();
            showDOMElement(html2);
        } else if (iteration === 3) {
            stage.addChild(text5);
            stage.update();
        } else if (iteration === 4) {
            hideDOMElement(html1);
            hideDOMElement(html2);
            nextHypoTask();
        }

        iteration++;
    });

    stage.addChild(title, text1, backButton, nextButton);
    stage.update();
}

function corr1() {
    stage.removeAllChildren();
    let title = new createjs.Text(
        "Types of Relationships for Hypotheses",
        "bold 24px Arial",
        "#000"
    ).set({
        x: CANVAS_WIDTH / 2, y: 40, textAlign: "center"
    });

    let text1 = new createjs.Text(
        "(3) Correlation: A relationship between two variables where both " +
        "variables increase (or decrease) together, or one increases " +
        "as the other decreases. But, these variables might not directly " +
        "affect each other.",
        "24px Arial",
        "#000"
    ).set({
        x: CANVAS_WIDTH / 2, y: 90,
        textAlign: "center", lineWidth: 1000, lineHeight: 30
    });

    let pizzaText1 = new createjs.Text(
        "For example, let’s say you found that there is a relationship between " +
        "how often students eat pizza and their grades in school.",
        "18px Arial",
        "#000"
    ).set({
        x: 130, y: 200, lineHeight: 25, lineWidth: 460
    });

    let image1 = new createjs.Bitmap(queue.getResult("correlation")).set({
        x: 170, y: 280, scaleX: 0.4, scaleY: 0.4,
    });

    let graph1 = new createjs.Bitmap(queue.getResult("graph1")).set({
        x: 220, y: 400, scaleX: 0.4, scaleY: 0.4
    });

    let pizzaText2 = new createjs.Text(
        "If you don’t know why/how eating pizza could directly affect grades, " +
        "then you would call this relationship a “correlation”.",
        "18px Arial",
        "#000"
    ).set({
        x: 130, y: 600, lineHeight: 25, lineWidth: 460
    });


    let iceCreamText1 = new createjs.Text(
        "Or, you might find a relationship between the amount of ice cream people " +
        "buy and how often people go swimming.",
        "18px Arial",
        "#000"
    ).set({
        x: 630, y: 200, lineHeight: 25, lineWidth: 460
    });

    let image2 = new createjs.Bitmap(queue.getResult("IceCreamSwimming")).set({
        x: 680, y: 280, scaleX: 0.5, scaleY: 0.5
    });

    let graph2 = new createjs.Bitmap(queue.getResult("graph2")).set({
        x: 710, y: 400, scaleX: 0.4, scaleY: 0.4
    });

    let iceCreamText2 = new createjs.Text(
        "If you don't know why/how ice cream sales directly affects how often " +
        "people go swimming, then you'd call this relationship a correlation.",
        "18px Arial",
        "#000"
    ).set({
        x: 630, y: 600, lineHeight: 25, lineWidth: 460
    });



    let backButton = createBackButton();
    backButton.on("click", prevHypoTask);

    let nextButton = createNextButton();
    let iteration = 0;
    nextButton.on("click", e => {
        if (iteration === 0) {
            stage.addChild(pizzaText1, image1, graph1);
            stage.update();
        } else if (iteration === 1) {
            stage.addChild(pizzaText2);
            stage.update();
        } else if (iteration === 2) {
            stage.addChild(iceCreamText1, image2, graph2);
            stage.update();
        } else if (iteration === 3) {
            stage.addChild(iceCreamText2);
            stage.update();
        } else if (iteration === 4) {
            nextHypoTask();
        }
        iteration++;
    });

    stage.addChild(title, text1, backButton, nextButton);
    stage.update();
}

function corr2() {
    stage.removeAllChildren();

    let title = new createjs.Text(
        "Types of Relationships for Hypotheses",
        "bold 24px Arial",
        "#000"
    ).set({
        x: CANVAS_WIDTH / 2, y: 40, textAlign: "center"
    });

    let text1 = new createjs.Text(
        "(3) Correlation: Just because two things are correlated does not mean " +
        "that one caused the other. There may be other reasons for two variables " +
        "to change together. For example, both variables might be caused by a " +
        "third variable.",
        "24px Arial",
        "#000"
    ).set({
        x: CANVAS_WIDTH / 2, y: 90,
        textAlign: "center", lineWidth: 1000, lineHeight: 30
    });

    let text2 = new createjs.Text(
        "For example, a third variable, how often they study, could cause them " +
        "to eat more pizza and also cause them to get better grades!",
        "18px Arial",
        "#000"
    ).set({
        x: 110, y: 230, lineHeight: 25, lineWidth: 460,
    });

    let text3 = new createjs.Text(
        "Or, a third variable, the temperature, could cause people to eat more " +
        "ice cream and also cause people to want to go swimming to cool off.",
        "18px Arial",
        "#000"
    ).set({
        x: 650, y: 230, lineHeight: 25, lineWidth: 460
    });

    let image1 = new createjs.Bitmap(queue.getResult("causation_correlation")).set({
        x: 90, y: 300, scaleX: 0.35, scaleY: 0.35
    });

    let image2 = new createjs.Bitmap(queue.getResult("Picture_SunTempIcecream")).set({
        x: 610, y: 300, scaleX: 0.35, scaleY: 0.35
    });

    let backButton = createBackButton();
    backButton.on("click", prevHypoTask);

    let nextButton = createNextButton();
    let iteration = 0;
    nextButton.on("click", e => {
        if (iteration == 0) {
            stage.addChild(text2, image1);
            stage.update();
        } else if (iteration == 1) {
            stage.addChild(text3, image2);
            stage.update();
        } else if (iteration == 2) {
            nextHypoTask();
        }
        iteration++;
    });

    stage.addChild(title, text1, backButton, nextButton);
    stage.update();
}

function quizPage() {
    // answers for quiz questions
    const QUIZ_ANSWERS = [
        "Correlation", "Definition", "Causes", "Definition"
    ];

    stage.removeAllChildren();
    let correct = false;

    let heading = new createjs.Text(
        "Check your understanding!", "bold 24px Arial", "#000").set({
            x: CANVAS_WIDTH / 2, y: 20, textAlign: "center"
    });

    let text1 = new createjs.Text(
        "For each phrase below, as one concept (underlined) increases, the " +
        "other (underlined) concept may increase or decrease. Select the " +
        "type of relationship that best describes the following pairs of concepts:",
        "24px Arial",
        "#000"
    ).set({
        x: 150, y: 100, lineWidth: 900, lineHeight: 30
    });

    let quiz = new createjs.DOMElement("quiz_overlay").set({
        x: 50 * 2 / PIXEL_RATIO, y: 50 * 2 / PIXEL_RATIO,
        scaleX: 0.2 * 2 / PIXEL_RATIO, scaleY: 0.2 * 2 / PIXEL_RATIO,
    });

    let quizQuestions = new createjs.DOMElement("quiz_questions_overlay").set({
        x: 225 * 2 / PIXEL_RATIO, y: 53 * 2 / PIXEL_RATIO,
        scaleX: 0.2 * 2 / PIXEL_RATIO, scaleY: 0.2 * 2 / PIXEL_RATIO
    });

    let quizDropDowns = document.getElementsByClassName("quiz_questions");
    let backButton = createBackButton();
    let nextButton = createNextButton();

    function hideDOMOverlays() {
        hideDOMElement(quiz);
        hideDOMElement(quizQuestions);
        for (let qdd of quizDropDowns) {
            qdd.removeEventListener("change", onChangeAnswer);
        }
    }

    backButton.on("click", e => {
        hideDOMOverlays();
        prevHypoTask();
    });

    function onChangeAnswer(e) {
        e.target.setCustomValidity("");
        e.target.style.color = "";
    }
    for (let qdd of quizDropDowns) {
        qdd.addEventListener("change", onChangeAnswer);
    }

    nextButton.on("click", e => {
        if (correct) {
            hideDOMOverlays();
            nextHypoTask();
        } else {
            // checking validity info for quiz questions
            for (let i = 0; i < quizDropDowns.length; i++) {
                if (quizDropDowns[i].value != QUIZ_ANSWERS[i]) {
                    quizDropDowns[i].setCustomValidity("Wrong Answer");
                } else {
                    quizDropDowns[i].setCustomValidity("");
                    quizDropDowns[i].style.color = "green";
                }
                // resetting validity
                // quizSelectors[i].onchange = (() => {
                //     quizSelectors[i].setCustomValidity("");
                //     quizSelectors[i].style.color = "";
                // });
            }
            // testing if all answers are correct
            if (quizQuestions.htmlElement.reportValidity()) {
                snackbar.show(
                    "Your answers are all correct. Click Next again to move on."
                );
                correct = true;
            }
        }
    });

    stage.addChild(
        heading, text1,
        quiz, quizQuestions,
        backButton, nextButton
    );

    stage.update();
    showDOMElement(quiz);
    showDOMElement(quizQuestions);
}

function instructionPage() {
    stage.removeAllChildren();
    // let delayStarted = false;
    // let delayAchieved = false;

    let text = new createjs.Text(
        "Concept Map Activity Instructions",
        "bold 22px Arial",
        "#000").set({
        x: CANVAS_WIDTH / 2, y: (CANVAS_HEIGHT / 8) - 70, textAlign: "center"
    });

    let video = new createjs.DOMElement("instruction_video_overlay").set({
        x: 40 * 2 / PIXEL_RATIO, y: 18 * 2 / PIXEL_RATIO,
        scaleX: 0.22 * 2 / PIXEL_RATIO, scaleY: 0.22 * 2 / PIXEL_RATIO
    });

    let advice = new createjs.Text(
        "Please watch the video above for a brief tutorial. We recommend you " +
        "watch the video in full screen.\n\nFrom the Concept Map page, you can " +
        "always click the back button to return to this video. That page also " +
        "contains a \"Show Help\" button which will display a popup summarizing " +
        "these instructions." ,
        "16px Arial",
        "#000"
    ).set({
        x: CANVAS_WIDTH / 2, y: CANVAS_HEIGHT * 0.85,
        textAlign: "center", lineWidth: 800
    });

    let backButton = createBackButton();
    backButton.on("click", function() {
        hideDOMElement(video);
        prevHypoTask();
    });
    // backButton.on("click", e => {
    //     let vid = document.getElementById("instruction_video_overlay");
    //     vid.style.display = "none";
    //     vid.contentWindow.postMessage('{"event":"command","func":"stopVideo","args":""}', '*');
    //     prevHypoTask();
    // });

    let nextButton = createNextButton();
    nextButton.on("click", function() {
        console.log("next button clicked");
        hideDOMElement(video);
        nextHypoTask();
    });
    // nextButton.on("click", e => {
    //     if (!delayStarted) {
    //         snackbar.show("Please watch the tutorial video.");
    //         nextButton.disable();
    //         delayStarted = true;
    //         setTimeout(() => {
    //             delayAchieved = true;
    //             nextButton.enable();
    //         }, 20000);
    //     } else if (!delayAchieved) {
    //         console.log("still delaying");
    //     } else {
    //         let vid = document.getElementById("instruction_video_overlay");
    //         vid.style.display = "none";
    //         vid.contentWindow.postMessage(
    //             '{"event": "command", "func": "stopVideo", "args": ""}', '*'
    //         );
    //         nextHypoTask();
    //     }
    // });

    stage.addChild(text, video, advice, backButton, nextButton);
    stage.update();
    showDOMElement(video);
}


function backToYourRQ() {
    stage.removeAllChildren();
    let image1 = new createjs.Bitmap(queue.getResult("TeacherPointing")).set({
        x: 50, y: 50
    });

    let text1 = new createjs.Text(
        "Now that you’ve learned about the different ways that concepts can be " +
        "related in your concept map, let’s go back to your original research " +
        "question...",
        "22px Arial",
        "#000"
    ).set({
        x: CANVAS_WIDTH / 2, y: 175,
        textAlign: "center", lineHeight: 35, lineWidth: 700
    });

    let text2 = new createjs.Text(getRQ(), "bold 22px Arial", "#000").set({
        x: CANVAS_WIDTH / 2, y: 300,
        textAlign: "center", lineHeight: 35, lineWidth: 700
    });

    let backButton = createBackButton();
    backButton.on("click", e => prevHypoTask());

    let nextButton = createNextButton();
    nextButton.on("click", e => nextHypoTask());

    stage.addChild(image1, text1, text2, backButton, nextButton);
    stage.update();
}

function predictionPage1() {
    stage.removeAllChildren();

    let title = new createjs.Text(
        "Make your prediction:", "bold 22px Arial", "#000"
    ).set({
        x: CANVAS_WIDTH / 2, y: CANVAS_HEIGHT / 8, textAlign: "center"
    });

    let question = new createjs.Text(
        "As " + iv.toLowerCase() + " increases, what will happen to the " +
        dv.toLowerCase() + "?",
        "20px Arial",
        "#000"
    ).set({
        x: CANVAS_WIDTH / 2, textAlign: "center", lineWidth: 800, lineHeight: 30
    });
    question.y = title.y + 40;

    let chosenDVDirection;
    let choice1 = new createjs.Text("Increase", "20px Arial", "#000").set({
        x: CANVAS_WIDTH / 2, textAlign: "center"
    });
    choice1.y = question.y + 150;

    let choice2 = new createjs.Text("Decrease", "20px Arial", "#000").set({
        x: CANVAS_WIDTH / 2, textAlign: "center"
    });
    choice2.y = choice1.y + 30;

    if (firstPredictionLocked) {
        // display message that they cannot change the value and
        // don't setup the click handlers
        snackbar.show(firstPredictionLockedReason + " You cannot change your prediction.");
    } else {
        generateHitAreaCenterAlignment(choice1);
        choice1.on("click", e => {
            choice1.color = "#5588EE";
            choice2.color = "#000";
            chosenDVDirection = true;
        });
        generateHitAreaCenterAlignment(choice2);
        choice2.on("click", e => {
            choice1.color = "#000";
            choice2.color = "#5588EE";
            chosenDVDirection = false;
        });
    }

    if (firstPredictionSaved) {
        // set chosenDVDirection to the value of firstPrediction and
        chosenDVDirection = firstPrediction;
        // set the choices to the appropriate colors based on the saved value
        if (firstPrediction) {
            choice1.color = "#5588EE";
            choice2.color = "#000";
        } else {
            choice1.color = "#000";
            choice2.color = "#5588EE";
        }
    }

    let backButton = createBackButton();
    backButton.on("click", e => prevHypoTask());

    let nextButton = createNextButton();
    nextButton.on("click", e => {
        if (chosenDVDirection === undefined) {
            snackbar.show('Please select either "Increase" or "Decrease".');
        } else {
            firstPrediction = chosenDVDirection;
            logPrediction("firstPrediction", firstPrediction)
            .then(() => {
                firstPredictionSaved = true;
                nextHypoTask();
            })
            .catch(function (error) {
                console.error(error);
            });
        }
    });

    stage.addChild(
        title, question, choice1, choice2, backButton, nextButton
    );
    stage.update();
}

function brmInstructionPage() {
    stage.removeAllChildren();
    let text = new createjs.Text(
        "Background Research", "bold 22px Arial", "#000"
    ).set({
        x: CANVAS_WIDTH / 2, y: 25, textAlign: "center"
    });

    let vid = new createjs.DOMElement("brm_instruction_overlay").set({
        x: 40 * 2 / PIXEL_RATIO, y: 15 * 2 / PIXEL_RATIO,
        scaleX: 0.2 * 2 / PIXEL_RATIO, scaleY: 0.2 * 2 / PIXEL_RATIO
    });
    vid.htmlElement.style.display = "block";

    let backButton = createBackButton();
    backButton.on("click", e => {
        vid.htmlElement.style.display = "none";
        predictionPage1();
    });

    let nextButton = createNextButton();
    nextButton.on("click", e => {
        vid.htmlElement.style.display = "none";
        brmPage();
    });

    stage.addChild(text, vid, backButton, nextButton);
    stage.update();
}

function getImageForPrediction(prediction) {
    let image;
    if ("increase" === prediction) {
        image = new createjs.Bitmap(queue.getResult("Crys_increases")).set({
            scaleX: 0.4, scaleY: 0.4
        })
    } else {
        image = new createjs.Bitmap(queue.getResult("Crys_decreases")).set({
            scaleX: 0.5, scaleY: 0.5
        });
    }
    return image;
}

function graphPage() {
    stage.removeAllChildren();

    let prediction = (secondPrediction === "increase") ? "increase" : "decrease";

    let text1 = new createjs.Text(
        "You predicted that as " + iv.toLowerCase() + " increases, the " +
        dv.toLowerCase() + " will " + prediction + ".",
        "22px Arial",
        "#000"
    ).set({
        x: CANVAS_WIDTH / 2, y: 75,
        textAlign: "center", lineWidth: 700, lineHeight: 35
    });

    let image = getImageForPrediction(prediction);
    image.set({x: 400, y: 150});

    let text2 = new createjs.Text(
        'Your prediction is represented as: ', "22px Arial", "#000"
    ).set({
        x: CANVAS_WIDTH / 2, y: 480,
        textAlign: "center", lineWidth: 700, lineHeight: 35
    });

    let ivBubble = createFixedBubble(
        IV_X, IV_Y, capitalizeFirstLetter(iv), "increase", false
    );
    let dvBubble = createFixedBubble(
        DV_X, DV_Y, capitalizeFirstLetter(dvabb), prediction, true
    );

    let arrow = createUnlabeledArrow(
        ivBubble.x + BUBBLE_WIDTH / 2,
        ivBubble.y,
        dvBubble.x - BUBBLE_WIDTH / 2,
        dvBubble.y
    );

    let backButton = createBackButton();
    backButton.on("click", e => prevHypoTask());

    let iteration = 0;
    let nextButton = createNextButton();
    nextButton.on("click", function(e) {
        if (0 === iteration) {
            stage.addChild(text2, ivBubble, dvBubble, arrow);
        } else if (1 === iteration) {
            nextHypoTask();
        }
        iteration++;
    });

    stage.addChild(text1, image, backButton, nextButton);
    stage.update();
}

function biDirInstructionPage1() {
    stage.removeAllChildren();
    let oppositePrediction = (firstPrediction) ? "decrease" : "increase";

    let image1 = new createjs.Bitmap(queue.getResult("TeacherPointing")).set({
        x: 50, y: 50
    });

    let text1 = new createjs.Text(
        "Now, let's say that another student made a prediction in the opposite " +
        "direction from your prediction...",
        "22px Arial",
        "#000"
    ).set({
        x: CANVAS_WIDTH / 2, y: 150,
        textAlign: "center", lineWidth: 700, lineHeight: 35
    });

    let image2 = getImageForPrediction(oppositePrediction);
    image2.set({x: 400, y: 250});

    let backButton = createBackButton();
    backButton.on("click", e => prevHypoTask());

    let nextButton = createNextButton();
    nextButton.on("click", e => nextHypoTask());

    stage.addChild(image1, text1, image2, backButton, nextButton);
    stage.update();
}

function biDirInstructionPage2() {
    stage.removeAllChildren();
    let oppositePrediction = (firstPrediction) ? "decrease" : "increase";

    let image1 = new createjs.Bitmap(queue.getResult("TeacherPointing")).set({
        x: 50, y: 50
    });

    let text1 = new createjs.Text(
        "They predicted that as " + iv.toLowerCase() + " increases, the " +
        dv.toLowerCase() + " would " + oppositePrediction + ".",
        "22px Arial",
        "#000"
    ).set({
        x: CANVAS_WIDTH / 2, y: 150,
        textAlign: "center", lineWidth: 700, lineHeight: 35
    });

    let image2 = getImageForPrediction(oppositePrediction);
    image2.set({x: 400, y: 250});

    let backButton = createBackButton();
    backButton.on("click", e => prevHypoTask());

    let nextButton = createNextButton();
    nextButton.on("click", e => nextHypoTask());

    stage.addChild(image1, text1, image2, backButton, nextButton);
    stage.update();
}

function biDirInstructionPage3() {
    stage.removeAllChildren();

    let oppositePrediction = (firstPrediction) ? "decrease" : "increase";

    let image1 = new createjs.Bitmap(queue.getResult("TeacherPointing")).set({
        x: 50, y: 50
    });

    let text1 = new createjs.Text(
        "Think about how this prediction might be true for a minute or two.",
        "22px Arial",
        "#000"
    ).set({
        x: CANVAS_WIDTH / 2, y: 150,
        textAlign: "center", lineWidth: 700, lineHeight: 35
    });

    let text2 = new createjs.Text(
        "Then, try to set up a new hypothesis for this new prediction.",
        "22px Arial",
        "#000"
    ).set({
        x: CANVAS_WIDTH / 2, y: 200,
        textAlign: "center", lineWidth: 700, lineHeight: 35
    });

    let image2 = getImageForPrediction(oppositePrediction);
    image2.set({x: 400, y: 250});

    let backButton = createBackButton();
    backButton.on("click", e => prevHypoTask());

    let nextButton = createNextButton();
    nextButton.on("click", e => nextHypoTask());

    stage.addChild(image1, text1, text2, image2, backButton, nextButton);
    stage.update();
}

function brmPage() {
    stage.removeAllChildren();

    let brmBtnClicked = false;
    let text = new createjs.Text(
        'Click the "Go to Background Research website" button to go to the ' +
        'Background Research Module. The Background Research Module is where ' +
        'you will be conducting your research. There is no time limit to this ' +
        'task. When you are finished with your research, **come back to this ' +
        'page (the "ISP Tutor" tab)**. Then click "Next" below to move on to ' +
        'the next page, where you will make your final hypothesis.',
        "24px Arial",
        "#000"
    ).set({
        x: CANVAS_WIDTH / 2, y: 100,
        textAlign: "center", lineWidth: 800, lineHeight: 30
    });

    let brmButton = createExtraLargeButton(CANVAS_WIDTH * .5,
                                           CANVAS_HEIGHT * .5 + 50,
                                           "Go to\nBackground\nResearch\nwebsite",
                                           "#3769C2",
                                           BUTTON_WIDTH * 3,
                                           BUTTON_HEIGHT * 5,
                                           "bold");
    brmButton.on("click", e => {
        // switched from https://go.isptutor.org to window.location.origin
        // so that it will work both from production website and dev environment
        // open("https://go.isptutor.org/brm/home/index.html", "_blank");
        open(window.location.origin + "/brm/home/index.html", "_blank");
        localStorage.setItem("isptutor_brmStartTime", Date.now());
        localStorage.setItem("isptutor_rq", getRQ());
        setTimeout(() => {
            brmBtnClicked = true;
            nextButton.enable();
        }, 20000);
    });

    let backButton = createBackButton();
    backButton.on("click", e => prevHypoTask());

    let nextButton = createNextButton();
    nextButton.on("click", e => {
        if (!brmBtnClicked) {
            snackbar.show("Please click on the 'Go to Background Research website' button");
            nextButton.disable();
        } else {
            nextHypoTask();
        }
    });

    stage.addChild(text, brmButton, backButton, nextButton);
    stage.update();
}

function predictionPage2() {
    stage.removeAllChildren();
    let secondPredictionSet = secondPrediction !== null;
    // console.log(`predictionPage2:
    // secondPrediction: ${secondPrediction}
    // secondPredictionSet: ${secondPredictionSet}
    // finalHypoLocked: ${finalHypoLocked}
    // `);
    let title = new createjs.Text(
        "Make Your General Prediction", "bold 24px Arial", "#000"
    ).set({
        x: CANVAS_WIDTH / 2, y: 20, textAlign: "center"
    });

    let text1 = new createjs.Text(
        "What do you think now that you've finished your research?",
        "bold 22px Arial",
        "#000"
    ).set({
        x: CANVAS_WIDTH / 2, y: CANVAS_HEIGHT / 8, textAlign: "center"
    });

    let question = new createjs.Text(
        "As " + iv.toLowerCase() + " increases, what will happen to the " +
        dv.toLowerCase() + "?",
        "20px Arial",
        "#000"
    ).set({
        x: CANVAS_WIDTH / 2, y: text1.y + 60,
        textAlign: "center", lineWidth: 800, lineHeight: 30
    });

    let chosenDVDirection;
    let choice1 = new createjs.Text("Increase", "20px Arial", "#000").set({
        x: CANVAS_WIDTH / 2, y: question.y + 120, textAlign: "center"
    });

    let choice2 = new createjs.Text("Decrease", "20px Arial", "#000").set({
        x: CANVAS_WIDTH / 2, y: choice1.y + 30, textAlign: "center"
    });

    function setIncreaseColors() {
        choice1.color = "#5588EE";
        choice2.color = "#000";
    }

    function setDecreaseColors() {
        choice1.color = "#000";
        choice2.color = "#5588EE";
    }

    if (finalHypoLocked) {
        // display message and don't add event listeners
        snackbar.show("You have already saved your hypothesis and cannot change your prediction.");
    } else {
        generateHitAreaCenterAlignment(choice1);
        choice1.on("click", e => {
            setIncreaseColors();
            chosenDVDirection = "increase";
        });
        generateHitAreaCenterAlignment(choice2);
        choice2.on("click", e => {
            setDecreaseColors();
            chosenDVDirection = "decrease";
        });
    }
    if (secondPredictionSet) {
        // set chosenDVDirection to the value of secondPrediction and
        chosenDVDirection = secondPrediction;
        // set the choices to the appropriate colors based on the saved value
        if ("increase" === secondPrediction) {
            setIncreaseColors();
        } else {
            setDecreaseColors();
        }
    }
    let backButton = createBackButton();
    backButton.on("click", e => prevHypoTask());

    let nextButton = createNextButton();
    nextButton.on("click", e => {
        if (chosenDVDirection === undefined) {
            snackbar.show('Please select either "Increase" or "Decrease".');
        } else {
            secondPrediction = chosenDVDirection;
            logPrediction("secondPrediction", secondPrediction)
            .then(() => {
                if (!initialHypoLocked) {
                    initialHypoLocked = true;
                    initialHypoLockedReason = "You have already saved your second prediction.";
                }
                nextHypoTask();
            })
            .catch(function(error) {
                console.error(error);
            });
        }
    });

    stage.addChild(
        title, text1, question, choice1, choice2, backButton, nextButton
    );
    stage.update();
}

function fetchPrevSavedHypo(whichHypo) {
    let hypoData = null;
    return db.getUserData()
    .then((data) => {
        let hypoData = data[`${whichHypo}Hypo`];
        return hypoData;
    })
    .catch(function (error) {
        console.log(error);
        return hypoData;
    });
}

function initializeConceptMap(whichHypo) {
    if (!currentHypo || currentHypo !== whichHypo) {
        currentHypo = whichHypo;
        steps = [];
        currentBubbles = [];
        arrowz = [];
    }
}

function initialConceptMap() {
    initializeConceptMap("initial");
    conceptMapPage("initial", firstPrediction);
}

function oppositeDirectionConceptMap() {
    initializeConceptMap("opposite");
    conceptMapPage("opposite",
                   (firstPrediction === "increase") ? "decrease" : increase);
}

function finalConceptMap() {
    initializeConceptMap("final")
    conceptMapPage("final", secondPrediction);
}

function completePage() {
    getEleById('completion-overlay').style.display = "block";
    db.saveValue("currTutorNdx", 2)
    .catch(function(error) {
        console.error(error);
    });
}

function initialConceptMapPlaceholder() {
    stage.removeAllChildren();
    let image1 = new createjs.Bitmap(queue.getResult("cptMapPlaceholder")).set({
        x: 50, y: 20, scaleX: 0.2, scaleY: 0.2
    });

    let backButton = createBackButton();
    backButton.on("click", e => prevHypoTask());

    let nextButton = createNextButton();
    nextButton.on("click", e => nextHypoTask());

    stage.addChild(image1, backButton, nextButton);
}

function capitalize(sentence) {
    const dontCapitalize = ["and", "from", "in", "of", "on", "the"];
    let words = sentence.split(' ');
    let newWords = words.map((word) => {
        if (dontCapitalize.includes(word.toLowerCase())) {
            return word.toLowerCase();
        } else {
            let newWord = word[0].toUpperCase() + word.slice(1);
            return newWord;
        }
    });
    return newWords.join(' ');
}
function joinAndCapitalize(sentences) {
    let newSentences = sentences.map((sentence) => capitalize(sentence));
    return newSentences.join("\n\n");
}

function initConceptsList(list) {
    list.innerHTML = "";
    // let newNodes = [...nodes].sort();
    // let captitalized = newNodes.map((node) => capitalize(node));
    let captitalized = nodes.map((node) => capitalize(node));
    for (let capCpt of captitalized) {
        let li = document.createElement("li");
        li.innerHTML = capCpt;
        list.appendChild(li);
    }
}

function notePadPage() {
    stage.removeAllChildren();
    let directionsContainer = new createjs.Container().set({
        x: 0, y: 0
    });
    let dirLabel = new createjs.Text("Direction:", "bold 22px Arial", "#FFF").set({
        x: 25, y: 10
    });
    let dirText = new createjs.Text(
        "Before you make your concept map, please take a few minutes to write " +
        "a detailed explanation of how you think " + iv.toLowerCase() +
        " affects the " + dv.toLowerCase() + ". You can use some of the " +
        "concepts listed below, which you can also use in your concept map.",
        "22px Arial",
        "#FFF"
    ).set({
        x: 140, y: 10, textAlign: "left", lineHeight: 24, lineWidth: CANVAS_WIDTH - 170
    });
    let dirWidth = CANVAS_WIDTH -20;
    let dirHeight = dirText.getMeasuredHeight() + 20;
    let dirBg = new createjs.Shape();
    dirBg.graphics
         .setStrokeStyle(1)
         .beginStroke("#2858a9")
         .beginFill("#2858a9")
         .drawRect(0, 0, dirWidth, dirHeight);
    directionsContainer.addChild(dirBg, dirLabel, dirText);

    let text1 = new createjs.Text(
        "The important thing is that your hypothesis makes sense to you. You can " +
        "come back to this page later to make improvements to your hypothesis.",
        "22px Arial",
        "#000"
    ).set({
        x: 140, y: 100, textAlign: "left", lineHeight: 24, lineWidth: CANVAS_WIDTH - 170
    });
    let lhsOverlay = new createjs.DOMElement("notepad_page_lhs_overlay").set({
        x: 2 * 2 / PIXEL_RATIO, y: 38 * 2 / PIXEL_RATIO,
        scaleX: 0.2 * 2 / PIXEL_RATIO, scaleY: 0.2 * 2 / PIXEL_RATIO
    });

    let rqBody = document.getElementById("notepad_rq_body");
    rqBody.innerText = getRQ();
    let toggleRq = document.getElementById("toggle_rq_body");

    let predBody = document.getElementById("notepad_pred_body");
    predBody.innerHTML = "As " + iv.toLowerCase() + " <i>(independent variable)</i> " +
        "increases, the " + dv.toLowerCase() + " <i>(dependent variable)</i> will " +
        secondPrediction + ".";
    let togglePred = document.getElementById("toggle_pred_body");

    let cptsList = document.getElementById("concepts_list");
    initConceptsList(cptsList);
    let toggleCpts = document.getElementById("toggle_concepts_body");

    let notepad = new createjs.DOMElement("notepad_overlay").set({
        x: 110 * (2 / PIXEL_RATIO),
        y: 43 * (2 / PIXEL_RATIO),
        scaleX: .20 * (2 / PIXEL_RATIO),
        scaleY: .20 * (2 / PIXEL_RATIO),
        name: "notepad"
    });
    let notes = document.getElementById("notepad_notes");

    let backButton = createBackButton();
    let nextButton = createNextButton();

    // returns click handler closure
    function toggle(btn) {
        const toggleIcon = btn.querySelector(".toggler");
        const target = document.getElementById(btn.dataset.target);
        // console.log(btn, toggleIcon, target);
        function toggler(e) {
            target.classList.toggle("invisible");
            btn.classList.toggle("collapsed");
            toggleIcon.classList.toggle("collapsed")
        }
        return toggler;
    }
    const rqToggler = toggle(toggleRq);
    toggleRq.addEventListener("click", rqToggler);

    const predToggler = toggle(togglePred);
    togglePred.addEventListener("click", predToggler);

    const cptsToggler = toggle(toggleCpts);
    toggleCpts.addEventListener("click", cptsToggler);

    function hideDOMOverlays() {
        toggleRq.removeEventListener("click", rqToggler);
        togglePred.removeEventListener("click", predToggler);
        toggleCpts.removeEventListener("click", cptsToggler);
        hideDOMElement(lhsOverlay);
        hideDOMElement(notepad);
    }

    function checkForMinWords() {
        let retVal = true;
        let html = notes.innerHTML;
        let words = getNotepadWords(html);
        if (words.length < 10) {
            retVal = false;
        }
        return retVal;
    }

    backButton.on("click", function () {
        hideDOMOverlays();
        prevHypoTask();
    });

    nextButton.on("click", function() {
        if (checkForMinWords()) {
            hideDOMOverlays();
            nextHypoTask();
        } else {
            snackbar.show("Please use at least 10 words in your hypothesis");
        }
    });

    stage.addChild(
        directionsContainer,
        text1,
        lhsOverlay,
        notepad,
        backButton, nextButton
    );
    showDOMElement(lhsOverlay);
    showDOMElement(notepad);
    stage.update();
    setTimeout(function() {
        notes.focus();
    }, 0);
}


function redrawHypo() {
    for (let bubble of currentBubbles) {
        stage.addChild(bubble);
    }
    for (let arrow of arrowz) {
        stage.addChild(arrow);
    }
}


function hideDOMElement(ele) {
    ele.htmlElement.style.display = "none";
}

function showDOMElement(ele) {
    ele.htmlElement.style.display = "block";
}


function getMenuOptionByValue(menuID, value) {
    let sel = document.getElementById(menuID);
    return sel.querySelector(`option[value="${value}"]`);
}

function showMenuOptionWithValue(menuID, value) {
    let opt = getMenuOptionByValue(menuID, value);
    if (opt) {
        opt.classList.remove("hidden");
    }
}

function hideMenuOptionWithValue(menuID, value) {
    let opt = getMenuOptionByValue(menuID, value);
    if (opt) {
        opt.classList.add("hidden");
    }
}

function resetSelectDefaultOption(menuID) {
    let opt = getMenuOptionByValue(menuID, "");
    if (opt) {
        opt.setAttribute("selected", true);
    }
}

function initializeConceptsMenu(menu) {
    menu.innerHTML = ""
    let defaultOpt = document.createElement("option");
    defaultOpt.value = "";
    defaultOpt.innerText = " Select a Concept to Add ";
    defaultOpt.setAttribute("selected", true);
    defaultOpt.setAttribute("disabled", true);
    defaultOpt.setAttribute("hidden", true);
    menu.appendChild(defaultOpt);
    // for (let node of [...nodes].sort()) {
    for (let node of nodes) {
        let opt = document.createElement("option");
        opt.value = node;
        opt.innerText = ` ${node} `;
        menu.appendChild(opt);
    }
    // updateConceptsMenu
}

function hideAllMenuOptions(menu) {
    for (let option of menu.querySelectorAll("option")) {
        if ("" === option.value) {
            continue;
        }
        option.classList.add("hidden");
    }
}

function updateConceptsMenu(menu) {
    let currCpts = currentBubbles.map((bub) => bub.text);
    for (let option of menu.querySelectorAll("option")) {
        if ("" === option.value) {
            continue;
        }
        if (currCpts.includes(option.value)) {
            option.classList.add("hidden");
        } else {
            option.classList.remove("hidden");
        }
    }
}

function rehydrateHypothesis(hypoData, prediction) {
    // clear and repopulate currentBubbles and arrowz from what is
    // in the db
    currentBubbles = [];
    arrowz = [];
    ivBubble = createFixedBubble(
        IV_X, IV_Y, capitalizeFirstLetter(iv), "increase", false
    );
    // ivBubble.disable();
    dvBubble = createFixedBubble(
        DV_X, DV_Y, capitalizeFirstLetter(dvabb), prediction, true
    );
    // dvBubble.disable();
    arrow = createUnlabeledArrow(ivBubble.x + BUBBLE_WIDTH / 2,
        ivBubble.y,
        dvBubble.x - BUBBLE_WIDTH / 2,
        dvBubble.y);
    currentBubbles.push(ivBubble);
    currentBubbles.push(dvBubble);
    arrowz.push(arrow);
    // stage.addChild(ivBubble, dvBubble, arrow);
    let nonFixedBubs = hypoData.concepts.filter(
        (bub) => bub.isFixed === false
    );
    console.log("nonFixed bubs", nonFixedBubs);
    nonFixedBubs.forEach((bub) => {
        let nfb = createDeletableBubble(
            bub.x, bub.y, bub.text, bub.direction
        );
        currentBubbles.push(nfb);
        // stage.add(nfb);
        // nfb.disable();
    });
    hypoData.arrows.forEach((arr) => {
        let fromBubs = currentBubbles.filter((bub) => bub.text === arr.from);
        let toBubs = currentBubbles.filter((bub) => bub.text === arr.to);
        if (fromBubs.length !== 1 || toBubs.length !== 1) {
            console.log("fromBubs, toBubs", fromBubs, toBubs);
        } else {
            let oConn = fromBubs[0].outConnector;
            let iConn = toBubs[0].inConnector;
            if (!oConn || !iConn) {
                console.log("oConn, iConn", oConn, iConn)
            } else {

                let [startX, startY] = getOutConnectorCoords(oConn);
                let [endX, endY] = getInConnectorCoords(iConn);
                let arrow = createArrow(
                    startX, startY, endX, endY, arr.label
                );
                iConn.arrow = arrow;
                oConn.arrow = arrow;
                // stage.add(arrow);
                arrowz.push(arrow);
            }
        }
    });
    console.log(currentBubbles);
    console.log(arrowz);
}

function conceptMapPage(whichHypo, prediction)
{
    stage.removeAllChildren();
    let hypoSaved = false;
    let ivBubble, dvBubble, arrow, showHelp;
    // set a white background to the stage so it isn't transparent when
    // we take an image of it
    let bg = new createjs.Shape();
    bg.graphics
      .setStrokeStyle(1)
      .beginStroke("#FFF")
      .beginFill("#FFF")
      .drawRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
    // add this to the stage immediately, so it literally is in the background
    stage.addChild(bg);

    // gray background which we place on top of everything (other than
    // DOM Elements) when displaying a modal.  I had to set mouseEnabled
    // to true, and setup a noop click handler so that it actually prevents
    // stage elements from still being interactive
    let modalBg = new createjs.Shape();
    modalBg.graphics
        .setStrokeStyle(1)
        .beginStroke("#000")
        .beginFill("#000")
        .drawRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
    modalBg.alpha = 0.02;
    modalBg.mouseEnabled = true;

    let lightBulb = new createjs.Bitmap(queue.getResult("lightbulb")).set({
        x: 10, y: 10, scaleX: 0.5, scaleY: 0.5
    });

    let remindersTxt = new createjs.Text(
        "NOTE: ONLY include the concepts which you think are MOST closely related " +
        "to each other in your concept map.\n" +
        "You may only need to add one or two concepts to explain the " +
        "relationship between the independent and dependent variables.",
        "16px Arial",
        "#000"
    ).set({
        x: 80, y: 10, textAlign: "left", lineHeight: 25
    });

    let showHelpButton = createTextWidthButton(
        CANVAS_WIDTH - 140, 35, " Show Help ", BUTTON_COLOR
    );

    const conceptsMenuId = "concepts_menu";
    let conceptsMenu = document.getElementById(conceptsMenuId);
    let conceptsDropDown = new createjs.DOMElement("concepts_menu_overlay").set({
        x: 100 * 2 / PIXEL_RATIO,
        y: 20 * 2 / PIXEL_RATIO,
        scaleX: 0.2 * 2 / PIXEL_RATIO,
        scaleY: 0.2 * 2 / PIXEL_RATIO
    });

    let help = new createjs.DOMElement("combined_cpt_map_help").set({
        x: 70 * 2 / PIXEL_RATIO, y: 30 * 2 / PIXEL_RATIO,
        scaleX: 0.2 * 2 / PIXEL_RATIO, scaleY: 0.2 * 2 / PIXEL_RATIO
    });
    let modalProps = {
        x: 90 * 2 / PIXEL_RATIO, y: 60 * 2 / PIXEL_RATIO,
        scaleX: 0.2 * 2 / PIXEL_RATIO, scaleY: 0.2 * 2 / PIXEL_RATIO
    };
    let saveWarning = new createjs.DOMElement("save_concept_map_warning").set(modalProps);
    let notepadPaste = new createjs.DOMElement("notepad_paste").set(modalProps);
    let drawCptMap = new createjs.DOMElement("draw_cpt_map").set(modalProps);
    let goHome = new createjs.DOMElement("completion_overlay").set(modalProps);

    let dismissHelp = document.getElementById("dismiss_cpt_map_help");
    let helpContents = document.getElementById("cpt_map_help_contents")
    let dismissNotepadPaste = document.getElementById("dismiss_notepad_paste");
    let dismissDrawCptMap = document.getElementById("dismiss_draw_cpt_map");
    let cancelSaveBtn = document.getElementById("cpt_map_cancel_save");
    let saveBtn = document.getElementById("cpt_map_save");
    let backButton = createBackButton();
    let nextButton = createNextButton();


    // event handlers and other functions
    function noop(e) {
        return;
    }

    function disableElements() {
        currentBubbles.forEach((bub) => bub.disable());
        arrowz.forEach((arr) => arr.disable());
        conceptsMenu.setAttribute("disabled", true);
        // verifyButton.disable();
        nextButton.disable();
        backButton.disable();
        showHelpButton.disable();
        stage.update();
    }

    function enableElements() {
        currentBubbles.forEach((bub) => bub.enable());
        arrowz.forEach((arr) => arr.enable());
        conceptsMenu.removeAttribute("disabled");
        // verifyButton.enable();
        nextButton.enable();
        backButton.enable();
        showHelpButton.enable();
        stage.update();
    }

    function showModal(modal) {
        disableElements();
        stage.addChild(modalBg);
        stage.update();
        showDOMElement(modal);
    }

    function hideModal(modal) {
        hideDOMElement(modal);
        enableElements();
        stage.removeChild(modalBg);
        stage.update();
    }

    function displayHelp(e) {
        // delays the disabling of ui elements by 1/2 second to
        // avoid race condition where 'show help' button reverts
        // back to alpha 1 (when the "hover" state ends) which
        // occurs *after* we disable the button (which had already set it's
        // alpha to 0.5)
        setTimeout(function() {
            showModal(help);
            // slide scroll bar to top of scrolling div
            helpContents.scrollTop = 0;
        }, 500);
    }

    function hideHelp() {
        hideModal(help);
    }

    function showSaveWarning() {
        showModal(saveWarning);
    }

    function showPasteNotes() {
        // grabs the html from the notePadPage's notebook, munges it a bit
        // so that it's text, and display it in a div in the notpadPaste modal
        let npn = document.getElementById("notepad_notes");
        let cht = document.getElementById("current_hypo_text");
        let hypoText = notepadHtmlAsText(npn.innerHTML);
        cht.innerText = wrapText(hypoText, 40);
        showModal(notepadPaste);
    }

    function hidePasteNotes() {
        hideModal(notepadPaste);
        showModal(drawCptMap);
    }

    function hideDrawCptMap() {
        // called when user clicks 'Download' button
        // hides the modal and then creates an image (as a blob) of the
        // canvas, and downloads it as a file "concept_map.png"
        hideModal(drawCptMap);
        let link = document.createElement("a");
        link.style.display = "none";
        link.download = "concept_map.png";
        let cvs = stage.canvas;
        cvs.toBlob(function (blob) {
            link.href = URL.createObjectURL(blob);
            link.click();
            setTimeout(function() {
                leavePage();
            }, 500);
        });
    }

    function hideSaveWarning() {
        hideModal(saveWarning);
    }

    function selectConceptHandler(e) {
        let value = e.target.value;
        let bubble = createDeletableBubble(
            CANVAS_WIDTH / 2 + ((currentBubbles.length - 2) * 15),
            CANVAS_HEIGHT / 2 + ((currentBubbles.length - 2) * 15),
            value, "none");
        bubble.idx = nodes.indexOf(value);
        steps.push({
            action: "NODE_CREATE",
            object: nodes[bubble.idx],
            index: bubble.idx,
            info: "N/A",
            timestamp: (new Date()).toLocaleDateString()
        });
        bubble.closeButton.on("click", e => {
            for (let child of bubble.children) {
                if ((child.name === "inConnector") ||
                    (child.name === "outConnector")) {
                    removeArrowAndLabel(child.arrow);
                }
            }
            stage.removeChild(bubble);
            steps.push({
                action: "NODE_DELETE",
                object: nodes[bubble.idx],
                index: bubble.idx,
                info: "N/A",
                timestamp: (new Date()).toLocaleString()
            });
            let tmp = currentBubbles.find((ele) => ele === bubble);
            if (tmp) {
                currentBubbles = currentBubbles.filter((ele) => ele !== tmp);
                updateConceptsMenu(conceptsMenu)
            }
        });
        currentBubbles.push(bubble);
        updateConceptsMenu(conceptsMenu);
        conceptsMenu.value = "";
        stage.addChild(bubble);
    }

    function saveHandler() {
        hideSaveWarning();
        logData(ivBubble, whichHypo);
        hypoSaved = true;
        if ("initial" === whichHypo) {
            firstPredictionLocked = true;
            firstPredictionLockedReason = "You have already saved your hypothesis."
        } else if ("final" === whichHypo) {
            secondPredictionLocked = true;
            secondPredictionLockedReason = "You have already saved your hypothesis."
        }
        showPasteNotes();
    }

    function dealWithDOMElements() {
        conceptsMenu.removeEventListener("change", selectConceptHandler);
        saveBtn.removeEventListener("click", saveHandler);
        cancelSaveBtn.removeEventListener("click", hideSaveWarning);
        dismissHelp.removeEventListener("click", hideHelp);
        hideDOMElement(help);
        hideDOMElement(conceptsDropDown);
        hideDOMElement(saveWarning);
    }

    function backButtonHandler(e) {
        dealWithDOMElements();
        prevHypoTask();
    }

    function leavePage() {
        disableElements();
        dealWithDOMElements();
        // add background for 'home' modal
        stage.addChild(modalBg);
        showDOMElement(goHome);
        // don't got to complete page
        // nextHypoTask();

    }
    function nextButtonHandler(e) {
        if (!hypoSaved) {
            if (verifyConceptMap(ivBubble)) {
                showSaveWarning();
            }
        } else {
            leavePage();
        }
    }
    // event handler registration
    dismissHelp.addEventListener("click", hideHelp);
    dismissNotepadPaste.addEventListener("click", hidePasteNotes);
    dismissDrawCptMap.addEventListener("click", hideDrawCptMap);
    cancelSaveBtn.addEventListener('click', hideSaveWarning);
    saveBtn.addEventListener("click", saveHandler);
    showHelpButton.addEventListener("click", displayHelp);
    backButton.on("click", backButtonHandler);
    nextButton.on("click", nextButtonHandler);
    conceptsMenu.addEventListener("change", selectConceptHandler);

    initializeConceptsMenu(conceptsMenu);
    showDOMElement(conceptsDropDown);
    stage.addChild(
        lightBulb,
        remindersTxt,
        showHelpButton,
        conceptsDropDown,
        backButton, nextButton,
        help, saveWarning, notepadPaste, drawCptMap
    );

    stage.on("stagemouseup", removePanel);
    stage.update();
    fetchPrevSavedHypo(whichHypo)
        .then((hypoData) => {
            if (null !== hypoData) {
                hypoSaved = true;
                snackbar.show("Your hypothesis has already been saved. You can not make any changes.");
                rehydrateHypothesis(hypoData, prediction);
                redrawHypo();
                disableElements();
                backButton.enable();
                nextButton.enable();
            } else if (currentBubbles.length === 0) {
                console.log()
                ivBubble = createFixedBubble(
                    IV_X, IV_Y, capitalizeFirstLetter(iv), "increase", false
                );
                dvBubble = createFixedBubble(
                    DV_X, DV_Y, capitalizeFirstLetter(dvabb), prediction, true
                );
                arrow = createUnlabeledArrow(ivBubble.x + BUBBLE_WIDTH / 2,
                    ivBubble.y,
                    dvBubble.x - BUBBLE_WIDTH / 2,
                    dvBubble.y);
                currentBubbles.push(ivBubble);
                currentBubbles.push(dvBubble);
                arrowz.push(arrow);
                stage.addChild(ivBubble, dvBubble, arrow);
            } else {
                redrawHypo();
                ivBubble = currentBubbles.filter(
                    (bub) => bub.text.toLowerCase() === iv.toLowerCase()
                )[0];
                dvBubble = currentBubbles.filter(
                    (bub) => bub.text.toLowerCase() === dvabb.toLowerCase()
                )[0];
                // in case user has gone back to the prediction page and changed it
                let dvDirButton = dvBubble.dirButton;
                let dvDirection = dvDirButton.direction;
                if (dvDirection !== prediction) {
                    drawDirButton(
                        dvDirButton, dvDirButton.x, dvDirButton.y, prediction, dvDirButton.color
                    );
                    dvDirButton.mouseEnabled = false;
                }
                updateConceptsMenu(conceptsMenu);
            }    })
        .catch(function (error) {
            console.error(error);
        });
}


// random utility function to capitalize first letter and make rest lower case
function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
}

// ============================================================================
// ============================= Handle Overs =================================
// ============================================================================

function handleMouseOver(event) {
    if (event.type == "mouseover") {
        event.target.alpha = .5;
        somethingHighlighted = true;
    } else {
        event.target.alpha = 1;
        somethingHighlighted = false;
    }
}

function handlePanelOver(event) {
    if (event.type === "mouseover") {
        event.target.alpha = .5;
    } else {
        event.target.alpha = 1;
    }

}

function handleConnectorOver(event) {
    if (event.type === "mouseover") {
        event.target.alpha = .5;
        // connectorOver = event.target;
        // console.info("connOver:");
        // console.info(connectorOver);
    } else {
        event.target.alpha = 1;
        // connectorOver = null;
    }
}

function getInConnectorAtPoint(x, y) {
    let retVal = null;
    let objs = stage.getObjectsUnderPoint(x, y).filter((obj) => obj.name === "inConnector");
    if (objs.length === 1) {
        retVal = objs[0];
    }
    return retVal;
}
// =============================================================================
// ============================= Handle Clicks =================================
// =============================================================================

function handleClick(event) {
    alert(event.target.text);
}

function handleArrowClick(event) {
    // console.log(event.target);
    panel = createDeletePanel(event.stageX / scalingRatio,
                              event.stageY / scalingRatio,
                              event.target.parent);
    stage.addChild(panel)
    stage.update();
}

function handleDirectionClick(event) {
    console.log(event.target);
    panel = createDirectionPanel(event.stageX / scalingRatio,
                                 event.stageY / scalingRatio,
                                 event.target);
    stage.addChild(panel);
    stage.update();

}

function handleExplanationClick(event) {
    panel = createExplanationPanel(event.stageX / scalingRatio,
                                   event.stageY / scalingRatio,
                                   event.target.parent.label);
    stage.addChild(panel);
    stage.update();
}

function handleCauseClick(x, y, target) {
    panel = createCausePanel(x, y, target);
    stage.addChild(panel);
    stage.update();
}

function getNotepadWords(notePadHtml) {
    let text = notepadHtmlAsText(notePadHtml);
    let words = text.split(/\s+/).filter((word) => word !== "");
    return words;
}

function notepadHtmlAsText(notePadHtml) {
    let text = notePadHtml.toString();
    text = text.replace(/&nbsp;/g, "");
    text = text.replace(/<div>/g, "");
    text = text.replace(/<\/div>/g, " ");
    text = text.replace(/<br>/g, "\n");
    return text;
}

function wrapText(text, maxWidth) {
    return text.replace(
        new RegExp(`(?![^\\n]{1,${maxWidth}}$)([^\\n]{1,${maxWidth}})\\s`,
                  'g'),
        '$1\n'
    );
}

function verifyConceptMap(ivBubble) {
    let isGood = true;
    // check that their written hypothesis has at least 10 words
    let notepad = document.getElementById("notepad_notes");
    let notes = notepad.innerHTML;
    let words = getNotepadWords(notes);
    if (words.length < 10) {
        snackbar.show(
            "Please go back to the previous page and make sure you have a " +
            "minimum of 10 words in your written hypothesis"
        );
        return false;
    }
    // checking at least one intermediate bubble
    if (currentBubbles.length < 3) {
        snackbar.show("Please add at least one intermediate bubble.");
        return false;
    }
    // checking everything is labeled
    for (let i = 0; i < stage.numChildren; i++) {
        let child = stage.getChildAt(i);
        // checking that a bubble has a direction if it is connected
        if (child.name === "bubble") {
            let dirButton = child.getChildByName("dirButton");
            let connected = false;
            for (let bubbleChild of child.children) {
                if ((bubbleChild.name === "inConnector" ||
                     bubbleChild.name === "outConnector") &&
                    bubbleChild.arrow != null) {
                    connected = true;
                    break;
                }
            }
            if (dirButton.children.length === 1 && connected) {
                drawDirButton(
                    dirButton, dirButton.x, dirButton.y, dirButton.direction, "red"
                );
                isGood = false;
            }
        }
        // checking that arrows are properly labeled
        else if (child.name === "arrow") {
            child.label.color = "#000";
            if (child.label.text === "Add label") {
                child.label.color = "red";
                isGood = false;
            }
        }
    }

    if (!isGood) {
        snackbar.show("Please make sure that everything is labeled properly.");
        return isGood;
    }
    // checking connectivity
    let connector = ivBubble.outConnector;
    while (connector != null) {
        if (connector.arrow == null) {
            snackbar.show("Please make sure that all of the bubbles are connected.");
            isGood = false;
            return isGood;
        }
        let nextBubble = connector.arrow.connectorOver.parent;
        connector = nextBubble.outConnector;
    }
    if (ivBubble.outConnector.arrow.connectorOver.parent.outConnector === null) {
        snackbar.show("Please add at least one intermediate bubble.");
        isGood = false;
        return isGood;
    }
    return isGood;
}

function removePanel(event) {
    //console.log(event.stageX);
    stage.removeChild(panel);
    stage.update();
}


// =============================================================================
// ================================== Hit Area =================================
// =============================================================================

function generateHitArea(text) {
    let hit = new createjs.Shape();
    let bounds = text.getBounds();
    hit.graphics.beginFill("#000").drawRect(0, 0, bounds.width, bounds.height);
    text.hitArea = hit;
    text.cursor = "pointer";
    text.on("mouseover", handleMouseOver);
    text.on("mouseout", handleMouseOver);
}

function generateHitAreaCenterAlignment(text) {
    let hit = new createjs.Shape();
    let bounds = text.getBounds();
    hit.graphics.beginFill("#000").drawRect(0, 0, bounds.width, bounds.height);
    hit.x = -1 * bounds.width / 2;
    hit.y = 0;
    text.hitArea = hit;
    text.cursor = "pointer";
    text.on("mouseover", handleMouseOver);
    text.on("mouseout", handleMouseOver);
}


// =============================================================================
// ============================== Connectors ===================================
// =============================================================================

function getOutConnectorCoords(conn) {
    let x, y;
    if (conn.parent.isFixed) {
        x = conn.parent.x;
        y = conn.parent.y - (BUBBLE_HEIGHT / 2)
    } else {
        x = conn.parent.x + (BUBBLE_WIDTH / 2);
        y = conn.parent.y;
    }
    return [x, y];
}
function getInConnectorCoords(conn) {
    let x, y;
    if (conn.parent.isFixed) {
        x = conn.parent.x;
        y = conn.parent.y - (BUBBLE_HEIGHT / 2);
    } else {
        x = conn.parent.x - (BUBBLE_WIDTH / 2);
        y = conn.parent.y;
    }
    return [x, y];
}

function createInConnector(x, y) {
    let connector = new createjs.Shape();
    connector
        .graphics
        .setStrokeStyle(2)
        .beginStroke("#000")
        .beginFill("#FFFFFF")
        .drawCircle(0, 0, CONNECTOR_RADIUS);
    connector.x = x;
    connector.y = y;
    connector.cursor = "pointer";
    connector.name = "inConnector";
    connector.arrow = null;

    connector.on("mouseover", handleConnectorOver);
    connector.on("mouseout", handleConnectorOver);
    connector.on("mousedown", e => {
        snackbar.show(
            "Make sure that you are dragging from a black circle to a white circle."
        );
    });

    return connector;
}


function createOutConnector(x, y) {
    let connector = new createjs.Shape();
    connector.graphics.beginFill("#000").drawCircle(0, 0, CONNECTOR_RADIUS);
    connector.x = x;
    connector.y = y;
    connector.cursor = "pointer";
    connector.name = "outConnector";
    connector.arrow = null;
    connector.on("mousedown", function (e) {
        // Create a new arrow on stage press
        console.log(`e.stage(x,y):(${e.stageX},${e.stageY}) stage.mouse(x,y): (${stage.mouseX},${stage.mouseY})`);
        // currentArrow = createArrow(stage.mouseX / scalingRatio,
        //                            stage.mouseY / scalingRatio,
        //                            stage.mouseX / scalingRatio,
        //                            stage.mouseY / scalingRatio,
        //                            "Add label");
        currentArrow = createArrow(e.stageX / scalingRatio,
                                   e.stageY / scalingRatio,
                                   e.stageX / scalingRatio,
                                   e.stageY / scalingRatio,
                                   "Add label");
        stage.addChild(currentArrow);
        // Update the current arrow on move
        let moveListener = stage.on("stagemousemove", function (e) {
            // drawArrow(currentArrow,
            //           currentArrow.x,
            //           currentArrow.y,
            //           stage.mouseX / scalingRatio,
            //           stage.mouseY / scalingRatio,
            //           "Add label");
            drawArrow(currentArrow,
                currentArrow.x,
                currentArrow.y,
                e.stageX / scalingRatio,
                e.stageY / scalingRatio,
                "Add label");
            stage.update();
        });
        // Stop the drag
        let upListener = stage.on("stagemouseup", function (e) {
            let cx = e.stageX / scalingRatio;
            let cy = e.stageY / scalingRatio;
            let connectorOver = getInConnectorAtPoint(cx, cy);
            stage.off("stagemousemove", moveListener);
            stage.off("stagemouseup", upListener);
            if (connectorOver === null ||
                connectorOver.name != "inConnector" ||
                connectorOver.parent === connector.parent) {
                removeArrowAndLabel(currentArrow);
                console.log("failed:");
                console.log(connectorOver);
            } else {
                // attach the new arrow
                let line = currentArrow.line;
                line.on("click", handleArrowClick);
                line.on("mouseover", handleMouseOver);
                line.on("mouseout", handleMouseOver);
                line.cursor = "pointer";
                removeArrowAndLabel(connector.arrow);
                removeArrowAndLabel(connectorOver.arrow);
                currentArrow.connector = connector;
                currentArrow.connectorOver = connectorOver;
                connector.arrow = currentArrow;
                connectorOver.arrow = currentArrow;
                steps.push({
                    action: "ARROW_CREATE",
                    object: nodes[connector.parent.idx] + "::" + nodes[connectorOver.parent.idx],
                    index: connector.parent.idx + "::" + connectorOver.parent.idx,
                    info: "N/A",
                    timestamp: (new Date()).toLocaleString()
                });
                arrowz.push(currentArrow);
            }
            currentArrow = null;
        });
    });
    connector.on("mouseover", handleConnectorOver);
    connector.on("mouseout", handleConnectorOver);
    return connector;
}


// =============================================================================
// ============================== Bubbles ======================================
// =============================================================================

function createDeletableBubble(x, y, text, direction) {
    let background = new createjs.Shape();
    background
        .graphics
        .setStrokeStyle(1)
        .beginStroke("#000")
        .beginFill(BUBBLE_COLOR)
        .drawRoundRect(0, 0, BUBBLE_WIDTH, BUBBLE_HEIGHT, BUBBLE_RADIUS);

    let label = new createjs.Text(text, "16px Arial", "#FFFFFF").set({
        x: BUBBLE_WIDTH / 2, lineWidth: BUBBLE_WIDTH - 10,
        textAlign: "center", textBaseline: "top",
    });
    label.y = (BUBBLE_HEIGHT / 2 - label.getMeasuredHeight() / 2) -7;

    let closeBtnSize = 25;
    let closeButton = createCloseButton(BUBBLE_WIDTH -5, 0, closeBtnSize);

    let dirButton = createDirButton(BUBBLE_WIDTH / 2,
                                    BUBBLE_HEIGHT * .78,
                                    direction,
                                    "#FFFFFF",
                                    false);

    let leftConnector = createInConnector(0, BUBBLE_HEIGHT / 2);
    let rightConnector = createOutConnector(BUBBLE_WIDTH, BUBBLE_HEIGHT / 2);

    let bubble = new createjs.Container();
    bubble.x = x;
    bubble.y = y;
    bubble.name = "bubble";
    bubble.text = text;
    bubble.isFixed = false;
    bubble.isDV = false;
    // this sets the registration point
    bubble.regX = BUBBLE_WIDTH / 2;
    bubble.regY = BUBBLE_HEIGHT / 2;
    bubble.inConnector = leftConnector;
    bubble.outConnector = rightConnector;
    bubble.closeButton = closeButton;
    bubble.addChild(
        background, label, dirButton, leftConnector, rightConnector, closeButton
    );
    // bubble.addChild(
    //     leftConnector, rightConnector, background, label, dirButton, closeButton
    // );
    // so bubble can be dragged
    bubble.on("pressmove", function (event) {
        let mouseX = event.stageX / scalingRatio;
        let mouseY = event.stageY / scalingRatio;
        // if mouse is touching the very edge of the side, don't drag the bubble
        if (Math.abs(mouseX - event.currentTarget.x) > BUBBLE_WIDTH / 2 - CONNECTOR_RADIUS)
            return;
        if (Math.abs(mouseY - event.currentTarget.y) > BUBBLE_HEIGHT / 2 - CONNECTOR_RADIUS)
            return;
        // if there is an arrow being dragged around
        if (currentArrow != null)
            return;
        // check if something highlighted
        if (somethingHighlighted)
            return;
        // currentTarget will be the container that the event listener was added to:
        event.currentTarget.x = mouseX;
        event.currentTarget.y = mouseY;
        // change the arrows
        let leftArrow = leftConnector.arrow;
        let rightArrow = rightConnector.arrow;
        if (leftArrow != null) {
            drawArrow(leftArrow,
                      leftArrow.x,
                      leftArrow.y,
                      mouseX - BUBBLE_WIDTH / 2,
                      mouseY,
                      leftArrow.label.text)
        }
        if (rightArrow != null) {
            drawArrow(rightArrow,
                      mouseX + BUBBLE_WIDTH / 2,
                      mouseY,
                      rightArrow.endX,
                      rightArrow.endY,
                      rightArrow.label.text);
        }
        // make sure to redraw the stage to show the change:
        stage.update();
    });
    bubble.disable = () => {
        bubble.alpha = 0.5;
        bubble.mouseEnabled = false;
    };
    bubble.enable = () => {
        bubble.alpha = 1.0;
        bubble.mouseEnabled = true;
    }

    return bubble;
}

function createBubble(x, y, text, color, direction) {
    let background = new createjs.Shape();
    background
        .graphics
        .setStrokeStyle(1)
        .beginStroke("#000")
        .beginFill(color)
        .drawRoundRect(0, 0, BUBBLE_WIDTH, BUBBLE_HEIGHT, BUBBLE_RADIUS);

    let label = new createjs.Text(text, "16px Arial", "#FFFFFF").set({
        x: BUBBLE_WIDTH / 2, lineWidth: BUBBLE_WIDTH - 10,
        textAlign: "center", textBaseline: "top"
    });
    label.y = BUBBLE_HEIGHT / 2 - label.getMeasuredHeight() / 2;

    let dirButton = createDirButton(BUBBLE_WIDTH / 2,
                                    BUBBLE_HEIGHT * .78,
                                    direction,
                                    "#FFFFFF",
                                    false);

    let leftConnector = createInConnector(0, BUBBLE_HEIGHT / 2);
    let rightConnector = createOutConnector(BUBBLE_WIDTH, BUBBLE_HEIGHT / 2);

    let bubble = new createjs.Container();
    bubble.x = x;
    bubble.y = y;
    bubble.name = "bubble";
    bubble.text = text;
    bubble.isFixed = false;
    bubble.isDV = false;
    // this sets the registration point
    bubble.regX = BUBBLE_WIDTH / 2;
    bubble.regY = BUBBLE_HEIGHT / 2;
    bubble.inConnector = leftConnector;
    bubble.outConnector = rightConnector;
    bubble.addChild(background, label, dirButton, leftConnector, rightConnector);
    // so bubble can be dragged
    bubble.on("pressmove", function (event) {
        let mouseX = event.stageX / scalingRatio;
        let mouseY = event.stageY / scalingRatio;
        // if mouse is touching the very edge of the side, don't drag the bubble
        if (Math.abs(mouseX - event.currentTarget.x) > BUBBLE_WIDTH / 2 - CONNECTOR_RADIUS)
            return;
        if (Math.abs(mouseY - event.currentTarget.y) > BUBBLE_HEIGHT / 2 - CONNECTOR_RADIUS)
            return;
        // if there is an arrow being dragged around
        if (currentArrow != null)
            return;
        // check if something highlighted
        if (somethingHighlighted)
            return;
        // currentTarget will be the container that the event listener was added to:
        event.currentTarget.x = mouseX;
        event.currentTarget.y = mouseY;
        // change the arrows
        let leftArrow = leftConnector.arrow;
        let rightArrow = rightConnector.arrow;
        if (leftArrow != null) {
            drawArrow(leftArrow,
                      leftArrow.x,
                      leftArrow.y,
                      mouseX - BUBBLE_WIDTH / 2,
                      mouseY,
                      leftArrow.label.text)
        }
        if (rightArrow != null) {
            drawArrow(rightArrow,
                      mouseX + BUBBLE_WIDTH / 2,
                      mouseY,
                      rightArrow.endX,
                      rightArrow.endY,
                      rightArrow.label.text);
        }

        // make sure to redraw the stage to show the change:
        stage.update();
    });

    return bubble;
}

function createFixedBubble(x, y, text, direction, isDV) {
    let background = new createjs.Shape();
    background
        .graphics
        .setStrokeStyle(1)
        .beginStroke("#000")
        .beginFill(FIXED_BUBBLE_COLOR)
        .drawRoundRect(0, 0, BUBBLE_WIDTH, BUBBLE_HEIGHT, BUBBLE_RADIUS);

    let label = new createjs.Text(text, "16px Arial", "#FFFFFF").set({
        x: BUBBLE_WIDTH / 2, lineWidth: BUBBLE_WIDTH - 10,
        textAlign:"center", textBaseline: "top"
    });
    label.y = BUBBLE_HEIGHT / 2 - label.getMeasuredHeight() / 2;

    let topConnector;
    let dirButton;
    let bubble = new createjs.Container();
    if (isDV) {
        topConnector = createInConnector(BUBBLE_WIDTH / 2, 0);
        dirButton = createDirButton(BUBBLE_WIDTH / 2,
                                    BUBBLE_HEIGHT * .8,
                                    direction,
                                    "#FFFFFF",
                                    false);
        bubble.inConnector = topConnector;
        bubble.outConnector = null;
        bubble.idx = -1;
    } else {
        topConnector = createOutConnector(BUBBLE_WIDTH / 2, 0);
        dirButton = createDirButton(BUBBLE_WIDTH / 2,
                                    BUBBLE_HEIGHT * .8,
                                    direction,
                                    "#FFFFFF",
                                    true);
        bubble.inConnector = null;
        bubble.outConnector = topConnector;
        bubble.idx = -2;
    }

    bubble.x = x;
    bubble.y = y;
    bubble.name = "bubble"
    bubble.dirButton = dirButton;
    // bubble.name = "fixed bubble";
    bubble.text = text;
    bubble.isFixed = true;
    bubble.isDV = isDV;
    // this sets the registration point
    bubble.regX = BUBBLE_WIDTH / 2;
    bubble.regY = BUBBLE_HEIGHT / 2;
    bubble.topConnector = topConnector;
    bubble.addChild(background, label, dirButton, topConnector);
    // bubble.addChild(topConnector, background, label, dirButton);
    bubble.disable = () => {
        bubble.alpha = 0.5;
        bubble.mouseEnabled = false;
    };
    bubble.enable = () => {
        bubble.alpha = 1.0;
        bubble.mouseEnabled = true;
    }

    return bubble;
}

// for creating the arrow button (the direction button on bottom of bubble)
function createDirButton(x, y, direction, color, isFixed) {
    let dirButton = new createjs.Container();
    color = ("none" === direction) ? "yellow" : color;
    drawDirButton(dirButton, x, y, direction, color);
    dirButton.x = x;
    dirButton.y = y;
    dirButton.color = color;
    dirButton.name = "dirButton";
    dirButton.mouseChildren = false;
    dirButton.direction = direction;
    if (!isFixed) {
        dirButton.cursor = "pointer";
        dirButton.on("mouseover", handleMouseOver);
        dirButton.on("mouseout", handleMouseOver);
        dirButton.on("click", handleDirectionClick);
    }
    return dirButton;
}

// for updating the arrow button
function drawDirButton(dirButton, x, y, direction, color) {
    dirButton.removeAllChildren();
    dirButton.direction = direction;
    let rectWidth = 3;
    let rectHeight = 10;
    let triSize = 5;

    if (direction === "increase") {
        let rect = new createjs.Shape();
        rect.graphics.beginFill(color).drawRect(0, 0, rectWidth, rectHeight);
        rect.x = -1 * rectWidth / 2;
        rect.y = triSize / 2;
        let tri = new createjs.Shape();
        tri.graphics.beginFill(color);
        tri.graphics.drawPolyStar(0, 0, triSize, 3);
        tri.rotation = 270;
        dirButton.addChild(rect, tri);
    } else if (direction === "decrease") {
        let rect = new createjs.Shape();
        rect.graphics.beginFill(color).drawRect(0, 0, rectWidth, rectHeight);
        rect.x = -1 * rectWidth / 2;
        rect.y = -1 * triSize / 2;
        let tri = new createjs.Shape();
        tri.graphics.beginFill(color);
        tri.graphics.drawPolyStar(0, 0, triSize, 3);
        tri.y = rectHeight;
        tri.rotation = 90;
        dirButton.addChild(rect, tri);
    } else if (direction === "none") {
        let text = new createjs.Text("Set Direction", "bold 12px Arial", color);
        generateHitAreaCenterAlignment(text);
        text.textAlign = "center";
        dirButton.addChild(text);
    } else {
        console.error("direction may only be increase, decrease, or none");
    }
}

// unused
function createEvenlySpacedBubbles(startX, endX, y, nodes) {
    let increment = (endX - startX) / (nodes.length - 1);
    for (let i = 0; i < nodes.length; i++) {
        let bubble = createBubble(startX + i * increment,
                                  y,
                                  nodes[i],
                                  "#4286f4",
                                  "none");
        stage.addChild(bubble);
    }
    stage.update();
}

function createEvenlySpacedBubbles2(startX, endX, y, nodes, directions) {
    let increment = (endX - startX) / (nodes.length - 1);
    let bubbles = [];
    for (let i = 0; i < nodes.length; i++) {
        let bubble = createBubble(startX + i * increment,
                                  y,
                                  nodes[i],
                                  "#4286f4",
                                  directions[i]);
        stage.addChild(bubble);
        bubbles.push(bubble);
    }
    stage.update();
    return bubbles;
}


// =============================================================================
// ================================ Buttons ====================================
// =============================================================================

function createButton(x, y, text, color) {
    let background = new createjs.Shape();
    background
        .graphics
        .beginFill(color)
        .drawRoundRect(0, 0, BUTTON_WIDTH, BUTTON_HEIGHT, BUTTON_RADIUS);

    let label = new createjs.Text(text, "bold 16px Arial", "#FFFFFF").set({
        x: BUTTON_WIDTH / 2, y: BUTTON_HEIGHT / 2,
        textAlign: "center", textBaseline: "middle",
    });

    let button = new createjs.Container();
    button.x = x - BUTTON_WIDTH / 2;
    button.y = y - BUTTON_HEIGHT / 2;
    button.name = `${label.text} button`;
    button.addChild(background, label);
    button.cursor = "pointer";
    button.mouseChildren = false;
    button.on("mouseover", handleMouseOver);
    button.on("mouseout", handleMouseOver);

    return button;
}

function createTextWidthButton(x, y, text, color=BUTTON_COLOR) {
    let label = new createjs.Text(text, "bold 16px Arial", "#FFFFFF").set({
        y: BUTTON_HEIGHT / 2, textAlign: "center", textBaseline: "middle"
    });
    let buttonWidth = Math.max(BUTTON_WIDTH, label.getMeasuredWidth() + 10);
    label.x = buttonWidth / 2;
    let bg = new createjs.Shape();
    bg.graphics
        .beginFill(color)
        .drawRoundRect(0, 0, buttonWidth, BUTTON_HEIGHT, BUTTON_RADIUS);
    let button = new createjs.Container();
    button.x = x - (buttonWidth / 2);
    button.y = y - (BUTTON_HEIGHT / 2);
    button.name = 'button';
    button.addChild(bg, label);
    button.cursor = 'pointer';
    button.mouseChildren = false;
    button.on('mouseover', handleMouseOver);
    button.on('mouseout', handleMouseOver);
    button.disable = () => {
        button.alpha = 0.5;
        button.mouseEnabled = false;
    };
    button.enable = () => {
        button.alpha = 1.0;
        button.mouseEnabled = true;
    }
    return button;
}

// perhaps a bad name. a button with an arrow image, not to be confused
// with actual arrows
function createArrowButton(x, name, direction) {
    let scaling = 0.5;
    let normal = new createjs.Bitmap(queue.getResult("orangeBtn")).set({
        scaleX: scaling, scaleY: scaling
    });
    let imgHeight = normal.image.height * scaling;
    let hover = new createjs.Bitmap(queue.getResult("yellowBtn")).set({
        scaleX: scaling, scaleY: scaling
    });
    if ("right" === direction) {
        normal.rotation = 180;
        normal.y += imgHeight;
        hover.rotation = 180;
        hover.y += imgHeight;
    }
    let button = new createjs.Container().set({
        x: x,
        y: CANVAS_HEIGHT - imgHeight - 10,
        name: name
    });
    button.addChild(normal);
    button.cursor = 'pointer';
    button.mouseChildren = false;
    button.mouseEnabled = true;

    button.on('mouseover', e => {
        button.removeAllChildren();
        button.addChild(hover);
    });
    button.on('mouseout', e => {
        button.removeAllChildren();
        button.addChild(normal);
    });
    button.disable = () => {
        button.alpha = 0.5;
        button.mouseEnabled = false;
    };
    button.enable = () => {
        button.alpha = 1.0;
        button.mouseEnabled = true;
    }
    return button;
}

function createBackButton() {
    return createArrowButton((CANVAS_WIDTH * 0.1) - BUTTON_WIDTH,
                             "back button",
                             "left");
}


function createNextButton() {
    return createArrowButton((CANVAS_WIDTH * 0.9) + BUTTON_WIDTH,
                             'next button',
                             "right");
}

function createExtraLargeButton(x, y, text, color, width, height, fontStyle) {
    let background = new createjs.Shape();
    let buttonWidth = width;
    let buttonHeight = height;
    background
        .graphics
        .beginFill(color)
        .drawRoundRect(0, 0, buttonWidth, buttonHeight, BUTTON_RADIUS);
    if ("" !== fontStyle) {
        fontStyle += " ";
    }
    let label = new createjs.Text(text, fontStyle + "32px Arial", "#FFFFFF").set({
        x: buttonWidth / 2, y: buttonHeight / 2 - 25,
        textAlign: "center", textBaseline: "bottom"
    });

    let button = new createjs.Container();
    button.x = x - buttonWidth / 2;
    button.y = y - buttonHeight / 2;
    button.addChild(background, label);
    button.cursor = "pointer";
    button.mouseChildren = false;
    button.on("mouseover", handleMouseOver);
    button.on("mouseout", handleMouseOver);

    return button;
}

function createLargeButton(x, y, text, color) {
    let background = new createjs.Shape();
    let largeButtonWidth = 300;
    let largeButtonHeight = 100;
    background
        .graphics
        .beginFill(color)
        .drawRoundRect(0, 0, largeButtonWidth, largeButtonHeight, BUTTON_RADIUS);

    let label = new createjs.Text(text, "bold 32px Arial", "#FFFFFF").set({
        x: largeButtonWidth / 2, y: largeButtonHeight / 2,
        textAlign: "center", textBaseline: "middle"
    });

    let button = new createjs.Container();
    button.x = x - largeButtonWidth / 2;
    button.y = y - largeButtonHeight / 2;
    button.addChild(background, label);
    button.cursor = "pointer";
    button.mouseChildren = false;
    button.on("mouseover", handleMouseOver);
    button.on("mouseout", handleMouseOver);

    return button;
}

function createPlusButton(x, y, buttonSize) {
    //let buttonSize = 25;
    let background = new createjs.Shape();
    background
        .graphics
        .beginFill("#4286f4")
        .drawRect(0, 0, buttonSize, buttonSize);

    // create plus
    let line1 = new createjs.Shape();
    line1
        .graphics
        .setStrokeStyle(2)
        .beginStroke("#FFFFFF")
        .moveTo(buttonSize / 2, buttonSize / 4)
        .lineTo(buttonSize / 2, buttonSize * .75);
    let line2 = new createjs.Shape();
    line2
        .graphics
        .setStrokeStyle(2)
        .beginStroke("#FFFFFF")
        .moveTo(buttonSize / 4, buttonSize / 2)
        .lineTo(buttonSize * .75, buttonSize / 2);

    let button = new createjs.Container();
    button.x = x;
    button.y = y;
    button.addChild(background, line1, line2);
    button.cursor = "pointer";
    button.mouseChildren = false;
    button.on("mouseover", handleMouseOver);
    button.on("mouseout", handleMouseOver);

    return button;
}

function createXButton(x, y, buttonSize) {
    let background = new createjs.Shape();
    background.graphics.beginFill("#4286f4").drawRect(0, 0, buttonSize, buttonSize);

    // create x
    let margin = (buttonSize - .5 * buttonSize / 1.414) / 2 - (buttonSize / 50)
    let line1 = new createjs.Shape();
    line1
        .graphics
        .setStrokeStyle(2)
        .beginStroke("#FFFFFF")
        .moveTo(margin, margin)
        .lineTo(buttonSize - margin, buttonSize - margin);
    let line2 = new createjs.Shape();
    line2
        .graphics
        .setStrokeStyle(2)
        .beginStroke("#FFFFFF")
        .moveTo(margin, buttonSize - margin)
        .lineTo(buttonSize - margin, margin);

    let button = new createjs.Container();
    button.x = x;
    button.y = y;
    button.addChild(background, line1, line2);
    button.cursor = "pointer";
    button.mouseChildren = false;
    button.on("mouseover", handleMouseOver);
    button.on("mouseout", handleMouseOver);

    return button;
}

// a round version of createXButton with a black background
function createCloseButton(x, y, buttonSize) {
    let background = new createjs.Shape();
    background.graphics.beginFill("#000").drawCircle(0, 0, 10);

    let label = new createjs.Text("x", "12px Arial", "#FFF").set({
        x: 0, y: 0, textAlign: "center", textBaseline: "middle"
    });

    let button = new createjs.Container();
    button.x = x;
    button.y = y;
    button.addChild(background, label);
    button.cursor = "pointer";
    button.mouseChildren = false;
    button.on("mouseover", handleMouseOver);
    button.on("mouseout", handleMouseOver);

    return button;
}

// =============================================================================
// ================================= Panels ====================================
// =============================================================================

function createOption(x, y, text, width) {
    let optionBox = new createjs.Shape();
    optionBox
        .graphics
        .beginStroke("#000")
        .beginFill(OPTION_COLOR)
        .drawRect(0, 0, width, OPTION_HEIGHT);

    let optionLabel = new createjs.Text(text, "16px Arial", "#000");
    optionLabel.x = width / 2 - optionLabel.getMeasuredWidth() / 2;
    optionLabel.y = OPTION_HEIGHT / 2 - optionLabel.getMeasuredHeight() / 2;

    let option = new createjs.Container();
    option.x = x;
    option.y = y;
    option.addChild(optionBox, optionLabel);
    option.mouseChildren = false;
    option.cursor = "pointer";

    option.on("mouseover", handlePanelOver);
    option.on("mouseout", handlePanelOver);

    return option;
}

function createDirectionPanel(x, y, target) {
    let panel = new createjs.Container();
    panel.x = x;
    panel.y = y;

    let option1 = createOption(0, 0, "Increases", OPTION_MIN_WIDTH);
    let option2 = createOption(0, OPTION_HEIGHT, "Decreases", OPTION_MIN_WIDTH);
    option1.on("click", e => {
        drawDirButton(target, x, y, "increase", "#FFFFFF");
        steps.push({
            action: "NODE_CHANGE_DIRECTION",
            object: nodes[target.parent.idx],
            index: target.parent.idx,
            info: "increase",
            timestamp: (new Date()).toLocaleString()
        });
    });
    option2.on("click", e => {
        drawDirButton(target, x, y, "decrease", "#FFFFFF")
        steps.push({
            action: "NODE_CHANGE_DIRECTION",
            object: nodes[target.parent.idx],
            index: target.parent.idx,
            info: "decrease",
            timestamp: (new Date()).toLocaleString()
        });
    });

    panel.addChild(option1, option2);

    return panel;
}

function changeExplanation(target, text) {
    let arrow = target.arrow;
    drawArrow(arrow, arrow.x, arrow.y, arrow.endX, arrow.endY, text);
    steps.push({
        action: "ARROW_CHANGE_LABEL",
        object: nodes[arrow.connector.parent.idx] + "::" + nodes[arrow.connectorOver.parent.idx],
        index: arrow.connector.parent.idx + "::" + arrow.connectorOver.parent.idx,
        info: text.replace("\n", " "),
        timestamp: (new Date()).toLocaleString()
    });
    return;
}

function createExplanationPanel(x, y, target) {
    let panel = new createjs.Container();
    panel.x = x;
    panel.y = y;
    let option1 = createOption(0, 0, "Definition", OPTION_MIN_WIDTH);
    let option2 = createOption(0, OPTION_HEIGHT, "Cause", OPTION_MIN_WIDTH);
    let option3 = createOption(0, 2 * OPTION_HEIGHT, "Correlation", OPTION_MIN_WIDTH);
    option1.on("click", e => changeExplanation(target, "Definition"));
    option2.on("click", e => handleCauseClick(x, y, target));
    option3.on("click", e => changeExplanation(target, "Correlation"));
    panel.addChild(option1, option2, option3);
    return panel;
}

function createDeletePanel(x, y, target) {
    let panel = new createjs.Container();
    panel.x = x;
    panel.y = y;
    let option1 = createOption(0, 0, "Delete", OPTION_MIN_WIDTH);
    option1.on("click", e => {
        target.connector.arrow = null;
        target.connectorOver.arrow = null;
        removeArrowAndLabel(target);
        steps.push({
            action: "ARROW_DELETE",
            object: nodes[target.connector.parent.idx] + "::" + nodes[target.connectorOver.parent.idx],
            index: target.connector.parent.idx + "::" + target.connectorOver.parent.idx,
            info: "N/A",
            timestamp: (new Date()).toLocaleString()
        });
    });
    panel.addChild(option1);
    return panel;
}

function createCausePanel(x, y, target) {
    let panel = new createjs.Container();
    panel.x = x;
    panel.y = y;
    // find max length of cause text
    let optionWidth = OPTION_MIN_WIDTH;
    for (let i = 0; i < causes.length; i++) {
        let text = new createjs.Text(causes[i], "16px Arial", "#000");
        let textWidth = text.getMeasuredWidth() + 10;
        if (textWidth > optionWidth) {
            optionWidth = textWidth;
        }
    }
    for (let i = 0; i < causes.length; i++) {
        let option = createOption(0, OPTION_HEIGHT * i, causes[i], optionWidth);
        option.on("click", e => changeExplanation(target, "Cause:\n" + causes[i]));
        panel.addChild(option);
    }
    return panel;
}

function createConceptsPanel(x, y, allConcepts, conceptBubbles, clickHdlr) {
    let panel = new createjs.Container().set({
        x: x, y: y + OPTION_HEIGHT
    });
    let usedNodes = conceptBubbles.map((bub) => bub.text);
    let options = [];
    allConcepts.forEach((value) => {
        if (!usedNodes.includes(value)) {
            options.push(value);
        }
    });
    let longestOption = options.reduce(function (a, b) {
        return a.length > b.length ? a : b;
    });
    let tmp = new createjs.Text(longestOption, "16px Arial", "#000");
    let optionWidth = Math.max(OPTION_MIN_WIDTH, tmp.getMeasuredWidth() + 10);
    options.forEach((opt, i) => {
        let option = createOption(0, OPTION_HEIGHT * i, opt, optionWidth);
        option.on("click", e => clickHdlr(opt));
        panel.addChild(option);
    });
    return panel;
}


// =============================================================================
// ============================= Arrows and Labels =============================
// =============================================================================

// only used for the unlabeled arrow between iv and dv
function createUnlabeledArrow(startX, startY, endX, endY) {
    let arrow = new createjs.Shape();
    arrow.x = startX;
    arrow.y = startY;
    let w = endX - startX;
    let h = endY - startY;
    let lineLength = Math.sqrt(w * w + h * h);
    // draw straight line
    arrow
        .graphics
        .setStrokeStyle(3)
        .beginStroke("#000")
        .moveTo(0, 0)
        .lineTo(lineLength, 0);
    // draw triangle
    let triangleSize = 5;
    arrow
        .graphics
        .beginFill("#000")
        .drawPolyStar(lineLength - triangleSize, 0, triangleSize, 3);
    // rotate
    arrow.rotation = Math.atan2(h, w) * 180 / Math.PI;
    arrow.disable = () => {
        arrow.alpha = 0.5;
        arrow.mouseEnabled = false;
    };
    arrow.enable = () => {
        arrow.alpha = 1.0;
        arrow.mouseEnabled = true;
    }
    return arrow;
}

// this is to create a new arrow
// first create the arrow, then update it using drawArrow
function createArrow(startX, startY, endX, endY, arrowLabel) {
    let arrow = new createjs.Container();
    arrow.name = "arrow";
    arrow.x = startX;
    arrow.y = startY;
    // just storing some end point information
    arrow.endX = endX;
    arrow.endY = endY;
    // Determine the length between the start and end point using pythagoras
    let w = endX - startX;
    let h = endY - startY;
    let length = Math.sqrt(w * w + h * h);
    // draw arrow in straight line
    let line = new createjs.Shape();
    line
        .graphics
        .clear()
        .setStrokeStyle(3)
        .beginStroke("#000")
        .moveTo(0, 0)
        .lineTo(length, 0);
    // Draw the arrow head at the end.
    if (arrowLabel.substring(0, 5) === "Cause") {
        let arrowSize = 5;
        line.graphics.beginFill("#000");
        line.graphics.drawPolyStar(length - arrowSize, 0, arrowSize, 3);
    }
    // Rotate the arrow
    line.rotation = Math.atan2(h, w) * 180 / Math.PI;
    arrow.line = line;
    arrow.addChild(line);
    // Create arrow label
    let label = new createjs.Text(arrowLabel, "12px Arial", "#000");
    label.textAlign = "center";
    label.arrow = arrow;
    arrow.label = label;
    // Create arrow label box
    let labelPadding = 5;
    let bounds = arrow.label.getBounds();
    let labelBox = new createjs.Container();
    labelBox.on("click", handleExplanationClick);
    labelBox.on("mouseover", handleMouseOver);
    labelBox.on("mouseout", handleMouseOver);
    labelBox.cursor = "pointer";
    let midX = (endX - startX) / 2;
    let midY = (endY - startY) / 2;
    labelBox.x = midX;
    labelBox.y = midY;
    let labelBg = new createjs.Shape();
    labelBg
        .graphics
        .beginStroke("#000")
        .beginFill("#FFFFE0")
        .drawRect(0,
                  0,
                  bounds.width + 2 * labelPadding,
                  bounds.height + 2 * labelPadding);
    labelBg.x = -1 * bounds.width / 2 - labelPadding;
    labelBg.y = -labelPadding;
    labelBox.mouseChildren = false;
    labelBox.name = "labelBox";
    labelBox.addChild(labelBg, label);
    arrow.addChild(labelBox);
    arrow.disable = () => {
        arrow.alpha = 0.5;
        arrow.mouseEnabled = false;
    };
    arrow.enable = () => {
        arrow.alpha = 1.0;
        arrow.mouseEnabled = true;
    }

    return arrow;
}

// for redrawing arrows that already exist on stage
function drawArrow(arrow, startX, startY, endX, endY, arrowLabel) {
    arrow.x = startX;
    arrow.y = startY;
    // just storing some end point information
    arrow.endX = endX;
    arrow.endY = endY;
    // Determine the length between the start and end point using pythagoras
    let w = endX - startX;
    let h = endY - startY;
    let length = Math.sqrt(w * w + h * h);
    // draw arrow in straight line
    let line = arrow.line;
    line
        .graphics.clear()
        .setStrokeStyle(3)
        .beginStroke("#000")
        .moveTo(0, 0)
        .lineTo(length, 0);
    // Draw the arrow head at the end.
    if (arrowLabel.substring(0, 5) === "Cause") {
        let arrowSize = 5;
        line.graphics.beginFill("#000");
        line.graphics.drawPolyStar(length - arrowSize, 0, arrowSize, 3);
    }
    // Rotate the arrow
    line.rotation = Math.atan2(h, w) * 180 / Math.PI;
    // Create arrow label
    let labelBox = arrow.getChildByName("labelBox");
    let midX = (endX - startX) / 2;
    let midY = (endY - startY) / 2;
    labelBox.x = midX;
    let labelBoxOffset = 5;
    labelBox.y = midY - labelBoxOffset;
    // change the arrow label box if the arrow label has been updated
    if (arrow.label.text != arrowLabel) {
        labelBox.removeAllChildren();
        let label = new createjs.Text(arrowLabel, "12px Arial", "#000");
        label.arrow = arrow;
        label.textAlign = "center";
        label.lineWidth = 100;
        arrow.label = label;
        let labelPadding = 5;
        let bounds = arrow.label.getBounds();
        let labelBg = new createjs.Shape();
        labelBg
            .graphics
            .beginStroke("#000")
            .beginFill("#FFFFE0")
            .drawRect(0,
                      0,
                      bounds.width + 2 * labelPadding,
                      bounds.height + 2 * labelPadding);
        labelBg.x = -1 * bounds.width / 2 - labelPadding;
        labelBg.y = -labelPadding;
        labelBox.mouseChildren = false;
        labelBox.addChild(labelBg, label);
    }
    arrow.addChild(labelBox);
}

// remove an arrow with its label
function removeArrowAndLabel(arrow) {
    if (arrow != null && arrow != undefined) {
        arrowz = arrowz.filter((item) => item !== arrow);
        stage.removeChild(arrow);
        //stage.removeChild(arrow.label);
    }
}

// convert from a listener which logs user out on main tab close
// to a function we can call instead
function logout() {
    localStorage.clear();
}



let studentHypoTasks;
let studentCondition;
let currHypoTaskIdx;

function invalidTask() {
    showSnackbar("invalid task");
}

function updateCurrTaskIndex(idx) {
    currHypoTaskIdx = idx;
    return db.saveValue("currHypoTaskIdx", idx)
}

export function prevHypoTask(e) {
    let prevTaskIdx = currHypoTaskIdx - 1;
    if (prevTaskIdx < 0) {
        console.error('invalid taskIdx: ', prevTaskIdx);
        invalidTask();
    } else {
        updateCurrTaskIndex(prevTaskIdx)
            .then(() => {
                currHypoTask();
            })
            .catch(function (error) {
                console.error(error);
            });
    }
}

export function nextHypoTask(e) {
    let nextTaskIdx = currHypoTaskIdx + 1;
    if (nextTaskIdx >= studentHypoTasks.length) {
        console.error('invalid taskIdx: ', nextTaskIdx);
        invalidTask();
    } else {
        updateCurrTaskIndex(nextTaskIdx)
            .then(() => {
                currHypoTask();
            })
            .catch(function (error) {
                console.error(error);
            });
    }
}

export function currHypoTask() {
    let task;
    console.log('currHypoTask():', currHypoTaskIdx);
    if ((null === currHypoTaskIdx) || (undefined === currHypoTaskIdx) ||
        (currHypoTaskIdx < 0) || (currHypoTaskIdx === studentHypoTasks.length)) {
        console.error('currHypoTaskIdx is invalid: ', currHypoTaskIdx);
        task = invalidTask;
    } else {
        task = studentHypoTasks[currHypoTaskIdx];
    }
    console.log(task.name);
    task();
}


export function initHypoTasks(data) {
    // console.log("initHypoTasks()", data);
    currHypoTaskIdx = data.currHypoTaskIdx || 0;
    // studentCondition = data.condition;
    updateCurrTaskIndex(currHypoTaskIdx)
        .then(() => {
            let _pageNames = computeHypoTasks();
            console.log('pageNames', _pageNames);
            studentHypoTasks = _pageNames.map(
                x => pageNamesToFunctions[x]
            );
            console.log(studentHypoTasks);
            // conditionHypoTasks[studentCondition].map(
            //     x => pageNamesToFunctions[x]
            // );
            let taskNames = studentHypoTasks.map(x => x.name);
            console.log("taskNames", taskNames);
            currHypoTask();
        });
}


db = getDBConnection("localstorage");
db.setCredentials("BOGUS_CLASSCODE", "BOGUS_USER");
initHypoPage();