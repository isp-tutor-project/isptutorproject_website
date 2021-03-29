const {
    addCustomEnterActionsIfMissing,
    addCustomExitActionsIfMissing,
    addSceneTypeIfMissing,
    DataBuilder
} = require("../data-builder");


const VALID_EDGE_NAMES = ["prev", "next"];

class ScienceFairAssessmentDataBuilder extends DataBuilder {
    mungeData(data) {
        let newData = { scenes: {} };
        let errorsFound = false;
        for (let [sceneId, sceneData] of Object.entries(data.scenes)) {
            sceneData['id'] = sceneId;
            if (!!sceneData.sceneType && "ynNavigationScene" === sceneData.sceneType) {
                const prevSceneId = sceneData.edges.prev
                const nextSceneIds = sceneData.edges.next
                if (!data.scenes.hasOwnProperty(prevSceneId)) {
                    console.error(`ERROR: ${sceneId} has invalid prev scene ${prevSceneId}`)
                    errorsFound = true
                }
                if (!data.scenes.hasOwnProperty(nextSceneIds.y)) {
                    console.error(`ERROR: ${sceneId} has invalid next.y scene ${nextSceneIds.y}`)
                    errorsFound = true
                }
                if (!data.scenes.hasOwnProperty(nextSceneIds.n)) {
                    console.error(`ERROR: ${sceneId} has invalid next.n scene ${nextSceneIds.n}`)
                    errorsFound = true
                }
            } else {
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
    ScienceFairAssessmentDataBuilder
};