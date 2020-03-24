
// const path = require("path");

// const dgu = require("./dataGenerationUtils");

// const inFile = path.resolve(__dirname, "hypoDefsData");
// const outFile = path.resolve(__dirname, "hypoDefs.json");

// function mungeData(data) {
//     let newData = { scenes: {} };
//     let errorsFound = false;
//     for (let [sceneId, sceneData] of Object.entries(data.scenes)) {
//         sceneData["id"] = sceneId;
//         sceneData = dgu.addSceneTypeIfMissing(sceneData);
//         sceneData = dgu.addCustomEnterActionsIfMissing(sceneData);
//         sceneData = dgu.addCustomExitActionsIfMissing(sceneData);
//         newData.scenes[sceneId] = sceneData;
//     }
//     if (errorsFound) {
//         newData = null;
//     }
//     return newData;
// }

// // dgu.genData(inFile, outFile, mungeData);

// module.exports = {
//     inFile,
//     outFile,
//     mungeData
// };