const {
    addCustomEnterActionsIfMissing,
    addCustomExitActionsIfMissing,
    addSceneTypeIfMissing,
    DataBuilder
} = require("@isptutorproject/isp-data");


const VALID_EDGE_NAMES = ["prev", "next"];

class RQIntroDataBuilder extends DataBuilder {

    mungeData(data) {
        let newData = { scenes: {} };
        let errorsFound = false;
        for (let [sceneId, sceneData] of Object.entries(data.scenes)) {
            sceneData['id'] = sceneId;
            for (let [edgeName, edgeSceneId] of Object.entries(sceneData.edges)) {
                if (!VALID_EDGE_NAMES.includes(edgeName)) {
                    console.error(`ERROR: ${scendId} has an invalid edge ${edgeName}`);
                    errorsFound = true;
                }
                if (!data.scenes.hasOwnProperty(edgeSceneId)) {
                    console.error(`ERROR: ${sceneId}.edges.${edgeName} points to an invalid scene: ${edgeSceneId}`);
                }
            }
            sceneData = addSceneTypeIfMissing(sceneData);
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

let builder = new RQIntroDataBuilder("rqIntro");
builder.buildData();