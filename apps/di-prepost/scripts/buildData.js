const {
    addCustomEnterActionsIfMissing,
    addCustomExitActionsIfMissing,
    addSceneTypeIfMissing,
    DataBuilder
} = require("@isptutorproject/isp-data");


const VALID_EDGE_NAMES = ["prev", "next"];

class DiPreTestDataBuilder extends DataBuilder {

    mungeData(data) {
        let newData = { scenes: {} };
        let questions = data.questions;
        let errorsFound = false;
        for (let [sceneId, sceneData] of Object.entries(data.scenes)) {
            sceneData['id'] = sceneId;
            for (let [edgeName, edgeSceneId] of Object.entries(sceneData.edges)) {
                if (!VALID_EDGE_NAMES.includes(edgeName)) {
                    console.error(`ERROR: ${sceneId} has an invalid edge: ${edgeName}`);
                    errorsFound = true;
                }
                if (!data.scenes.hasOwnProperty(edgeSceneId)) {
                    console.error(`ERROR: ${sceneId}.edges.${edgeName} points to an invalid scene: ${edgeSceneId}`);
                    errorsFound = true;
                }
            }
            sceneData = addSceneTypeIfMissing(sceneData);

            if ("memoryResults" === sceneData.sceneType) {
                sceneData.questions = questions.memory;
            } else if ("rocketsResults" === sceneData.sceneType) {
                sceneData.questions = questions.rockets;
            }
            if (sceneData.hasOwnProperty("correctQ1Answer")) {
                sceneData.questions.q1.correctAnswer = sceneData.correctQ1Answer;
                delete sceneData.correctA1Answer;
            }

            sceneData = addCustomEnterActionsIfMissing(sceneData);
            sceneData = addCustomExitActionsIfMissing(sceneData);
            newData.scenes[sceneId] = sceneData;
        }
        if (errorsFound) {
            newData = null;
        }
        return newData;
    }
}

class DiPostTestDataBuilder extends DataBuilder {

    mungeData(data) {
        let newData = { scenes: {} };
        let questions = data.questions;
        let errorsFound = false;
        for (let [sceneId, sceneData] of Object.entries(data.scenes)) {
            sceneData['id'] = sceneId;
            for (let [edgeName, edgeSceneId] of Object.entries(sceneData.edges)) {
                if (!VALID_EDGE_NAMES.includes(edgeName)) {
                    console.error(`ERROR: ${sceneId} has an invalid edge: ${edgeName}`);
                    errorsFound = true;
                }
                if (!data.scenes.hasOwnProperty(edgeSceneId)) {
                    console.error(`ERROR: ${sceneId}.edges.${edgeName} points to an invalid scene: ${edgeSceneId}`);
                    errorsFound = true;
                }
            }
            sceneData = addSceneTypeIfMissing(sceneData);

            if ("carResults" === sceneData.sceneType) {
                sceneData.questions = questions.car;
            } else if ("libraryResults" === sceneData.sceneType) {
                sceneData.questions = questions.library;
            }
            if (sceneData.hasOwnProperty("correctQ1Answer")) {
                sceneData.questions.q1.correctAnswer = sceneData.correctQ1Answer;
                delete sceneData.correctA1Answer;
            }

            sceneData = addCustomEnterActionsIfMissing(sceneData);
            sceneData = addCustomExitActionsIfMissing(sceneData);
            newData.scenes[sceneId] = sceneData;
        }
        if (errorsFound) {
            newData = null;
        }
        return newData;
    }
}


let builder = new DiPreTestDataBuilder("diPreTest");
builder.buildData();

let builder2 = new DiPostTestDataBuilder("diPostTest");
builder2.buildData();
