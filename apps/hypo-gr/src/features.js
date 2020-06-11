/*global db, collectionID, userID, showSnackbar, pageNamesToFunctions */

/*
    raiseYourHand
4.1 startPage
4.2 defPage1
4.3 defPage2
5.1 defPage3
5.2 defPage4
5.3 defPage5
6.1 defPage6
    defPage7
    defPage8
6.2 cptMapinstructPage
    backToYourRQ
6.3 predictPage1
7.1 graphPage1
8.1 graphPage2
9.1 initCptMapPage | initcptMapPlaceholder
10.1 biDirInstructPage1
10.2 biDirInstructPage2
11.1 biDirIntructPage3
11.2 oppDirCptMapPage
12.1 brmInstructionPage(Video - remove)
12.2 brmPage
12.3 brmP
13.1 predictPage2
13.2 finalConceptMapPage
14.1 completePage(home page displaying they have completed ? ? ? )

cond1              | cond2                      | cond3
-------------------+----------------------------+-----------------------
raiseYourHand      |raiseYourHand               |raiseYourHand
startPage          |startPage                   |startPage
definitionPage1    |definitionPage1             |definitionPage1
definitionPage2    |definitionPage2             |definitionPage2
definitionPage3    |definitionPage3             |definitionPage3
definitionPage4    |definitionPage4             |definitionPage4
definitionPage5    |definitionPage5             |definitionPage5
definitionPage6    |definitionPage6             |definitionPage6
definitionPage7    |definitionPage7             |definitionPage7
definitionPage8    |definitionPage8             |definitionPage8
definitionPage9    |definitionPage9             |definitionPage9
definitionPage10   |definitionPage10            |definitionPage10
instructionPage    |instructionPage             |instructionPage
backToYourRQ       |backToYourRQ                |backToYourRQ
predictionPage1    |predictionPage1             |predictionPage1
graphPage1         |graphPage1                  |graphPage1
graphPage2         |graphPage2                  |graphPage2
===================+== (above) SAME FOR ALL ====+===================
initialConceptMap  |initialConceptMap           | cptMapPlaceHolder
                   |biDirInstructionPage1       |
                   |biDirInstructionPage2       |
                   |biDirInstructionPage3       |
                   |oppositeDirectionConceptMap |
brmPage            |brmPage                     |brmPage
predictionPage2    |predictionPage2             |predictionPage2
finalConceptMap    |finalConceptMap             |finalConceptMap
completePage       |completePage                |completePage

*/


// const FEATURES = [
//     "FTR_IN_CLASSROOM"
//     "FTR_DEFS_ONLY",
//     "FTR_NO_DEFS",
//     "FTR_INITIAL_HYP",
//     "FTR_NO_CPT_MAP",
//     "FTR_BI_DIR",
//     "FTR_FINAL_HYP",
// ];

const features = (localStorage.getItem("activityFeatures") || "")
    .split(":")
    .filter(x => x !== "");
console.log("features", features);

const definitionPages = [
    "definitionPage1",
    "lessonOverview",
    "lessonOverview2",
    "definitionPage2",
    "definitionPage3",
    "definitionPage4",
    "definitionPage5",
    "definitionPage6",
    "causes1",
    "causes2",
    "corr1",
    "corr2",
    "quizPage",
];

const hypoPages = [
    "graphPage",
    "notePadPage"
];

const conditionHypoPages = [
    "instructionPage",
    "conceptMapPage"
];

const biDirectionalPages = [
    "biDirInstructionPage1",
    "biDirInstructionPage2",
    "biDirInstructionPage3",
    "oppositeDirectionConceptMap"
]

export function computeHypoTasks() {
    let pages = ["startPage"];
    if (features.includes("FTR_IN_CLASS")) {
        pages.unshift("raiseYourHand")
    }
    if (!features.includes("FTR_NO_DEFS")) {
        // add def pages as long as we didn't specify NO_DEFS
        for (let defPage of definitionPages) {
            pages.push(defPage);
        }
        pages.push("backToYourRQ");
    }
    if (features.includes("FTR_DEFS_ONLY")) {
        // send them back to home page if DEFS_ONLY
        pages.push("completePage")
        return;
    }
    
    // add the subset of hypoPages which are always present
    if (features.includes("FTR_INITIAL_HYP")) {
        pages.push("predictionPage1");
    } else {
        pages.push("predictionPage2");
    }
    for (let page of hypoPages) {
        pages.push(page);
    }
    // only add the instructional video for initial hyp
    if (features.includes("FTR_INITIAL_HYP")) {
        pages.push("instructionPage");
    }
    // if NO_CPT_MAP insert conceptMapPlaceholder rather than conceptMapPage
    if (features.includes("FTR_NO_CPT_MAP")) {
        pages.push("conceptMapPlaceholder");
    } else {
        if (features.includes("FTR_INITIAL_HYP")) {
            pages.push("initialConceptMap")
        } else {
            pages.push("finalConceptMap")
        }
        
    }
    // if bi-directional, add those pages
    if (features.includes("FTR_BI_DIR")) {
        for (let bdp of biDirectionalPages) {
            pages.push(bdp);
        }
    }
    // add link to home page
    pages.push("completePage");
    return pages;
}


// export const conditionHypoTasks = {
//     "demo": [
//         "startPage",
//         "definitionPage1",
//         "lessonOverview",
//         "lessonOverview2",
//         "definitionPage2",
//         "definitionPage3",
//         "definitionPage4",
//         "definitionPage5",
//         "definitionPage6",
//         "causes1",
//         "causes2",
//         "corr1",
//         "corr2",
//         "quizPage",
//         "backToYourRQ",
//         "predictionPage2",
//         "graphPage",
//         "notePadPage",
//         "instructionPage",
//         "finalConceptMap",
//         "completePage"
//     ],
//     "cond1": [
//         "raiseYourHand",
//         "startPage",
//         "definitionPage1",
//         "definitionPage2",
//         "definitionPage3",
//         "definitionPage4",
//         "definitionPage5",
//         "definitionPage6",
//         "definitionPage7",
//         "definitionPage8",
//         "definitionPage9",
//         "definitionPage10",
//         "instructionPage",
//         "backToYourRQ",
//         "predictionPage1",
//         "graphPage1",
//         "graphPage2",
//         "initialConceptMap",
//         "brmPage",
//         "predictionPage2",
//         "finalConceptMap",
//         "completePage"
//     ],
//     "cond2": [
//         "raiseYourHand",
//         "startPage",
//         "definitionPage1",
//         "definitionPage2",
//         "definitionPage3",
//         "definitionPage4",
//         "definitionPage5",
//         "definitionPage6",
//         "definitionPage7",
//         "definitionPage8",
//         "definitionPage9",
//         "definitionPage10",
//         "instructionPage",
//         "backToYourRQ",
//         "predictionPage1",
//         "graphPage1",
//         "graphPage2",
//         "initialConceptMap",
//         "biDirInstructionPage1",
//         "biDirInstructionPage2",
//         "biDirInstructionPage3",
//         "oppositeDirectionConceptMap",
//         "brmPage",
//         "predictionPage2",
//         "finalConceptMap",
//         "completePage"
//     ],
//     "cond3": [
//         "raiseYourHand",
//         "startPage",
//         "definitionPage1",
//         "definitionPage2",
//         "definitionPage3",
//         "definitionPage4",
//         "definitionPage5",
//         "definitionPage6",
//         "definitionPage7",
//         "definitionPage8",
//         "definitionPage9",
//         "definitionPage10",
//         "instructionPage",
//         "backToYourRQ",
//         "predictionPage1",
//         "graphPage1",
//         "graphPage2",
//         "initialConceptMapPlaceholder",
//         "brmPage",
//         "predictionPage2",
//         "finalConceptMap",
//         "completePage"
//     ]
// }
