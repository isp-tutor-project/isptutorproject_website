#!/usr/bin/env node

const dgu = require("./dataGenerationUtils");

// const diPre = require("./genDIPreTestData");
// const diInstr = require("./genDiInstrData");
// const hypoDefs = require("./genHypoDefsData");



const VALID_TRANSITION_NAMES = ["prev", "next"];

function diPrePostMunger(data) {
    let newData = { scenes: {} };
    let questions = data.questions;
    let errorsFound = false;
    for (let [sceneId, sceneData] of Object.entries(data.scenes)) {
        sceneData['id'] = sceneId;
        for (let [transName, transSceneId] of Object.entries(sceneData.transitions)) {
            if (!VALID_TRANSITION_NAMES.includes(transName)) {
                console.error(`ERROR: ${sceneId} has an invalid transition: ${transName}`);
                errorsFound = true;
            }
            if (!data.scenes.hasOwnProperty(transSceneId)) {
                console.error(`ERROR: ${sceneId}.transitions.${transName} points to an invalid scene: ${transSceneId}`);
                errorsFound = true;
            }
        }
        sceneData = dgu.addSceneTypeIfMissing(sceneData);

        if ("memoryResults" === sceneData.sceneType) {
            sceneData.questions = questions.memory;
        } else if ("rocketsResults" === sceneData.sceneType) {
            sceneData.questions = questions.rockets;
        }
        if (sceneData.hasOwnProperty("correctQ1Answer")) {
            sceneData.questions.q1.correctAnswer = sceneData.correctQ1Answer;
            delete sceneData.correctA1Answer;
        }

        sceneData = dgu.addCustomEnterActionsIfMissing(sceneData);
        sceneData = dgu.addCustomExitActionsIfMissing(sceneData);
        newData.scenes[sceneId] = sceneData;
    }
    if (errorsFound) {
        newData = null;
    }
    return newData;
}


function stdMungeData(data) {
    let newData = { scenes: {} };
    let errorsFound = false;
    for (let [sceneId, sceneData] of Object.entries(data.scenes)) {
        sceneData["id"] = sceneId;
        sceneData = dgu.addSceneTypeIfMissing(sceneData);
        sceneData = dgu.addCustomEnterActionsIfMissing(sceneData);
        sceneData = dgu.addCustomExitActionsIfMissing(sceneData);
        newData.scenes[sceneId] = sceneData;
    }
    if (errorsFound) {
        newData = null;
    }
    return newData;
}


// dgu.genData("diPreTest", diPrePostMunger);


// dgu.genData("diInstr", stdMungeData);


dgu.genData("hypoDefs", stdMungeData);
