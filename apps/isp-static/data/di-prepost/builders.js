const {
    addCustomEnterActionsIfMissing,
    addCustomExitActionsIfMissing,
    addSceneTypeIfMissing,
    DataBuilder
} = require("../data-builder");


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

class DiCrystalDataBuilder extends DataBuilder {

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

            if ("crystalResults" === sceneData.sceneType) {
                sceneData.questions = questions.crystal;
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

module.exports = {
    DiPreTestDataBuilder,
    DiPostTestDataBuilder,
    DiCrystalDataBuilder
};
