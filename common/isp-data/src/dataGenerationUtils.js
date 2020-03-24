const fs = require("fs");
const path = require("path");
function addSceneTypeIfMissing(sd) {
    if (! sd.hasOwnProperty("sceneType")) {
        sd["sceneType"] = "standard";
    }
    return sd;
}

function addCustomEnterActionsIfMissing(sd) {
    if (! sd.hasOwnProperty("customEnterActions")) {
        sd["customEnterActions"] = [];
    }
    return sd;
}

function addCustomExitActionsIfMissing(sd) {
    if (! sd.hasOwnProperty("customExitActions")) {
        sd["customExitActions"] = [];
    }
    return sd;
}

function genData(filePrefix, munger) {
    console.log(`generating ${filePrefix} data..`);
    const inFile = path.resolve(__dirname, `${filePrefix}Data`);
    const distDir = path.join(__dirname, '..', 'dist');
    const outFile = path.join(distDir, `${filePrefix}.json`);
    if (!fs.existsSync(distDir)) {
        fs.mkdirSync(distDir);
    }
    // blow away old generated content if it exists
    // console.log(`infile: ${inFile}\noutfile: ${outFile}`);
    if (fs.existsSync(outFile)) {
        // console.log("blowing away old outfile");
        try {
            fs.unlinkSync(outFile);
        } catch (err) {
            console.error(err);
        }
    }
    let origData;
    try {
        // console.log(`loading ${inFile}`);
        origData = require(inFile);
        // console.log(`data loaded`);
    } catch(err) {
        console.error(err);
        process.exit(1);
    }
    const mungedData = munger(origData);
    if (mungedData) {
        // console.log(`writing to outfile ${outFile}`);
        fs.writeFileSync(outFile, JSON.stringify(mungedData, null, 4));
    }
}

const dgu = {
    genData,
    addSceneTypeIfMissing,
    addCustomEnterActionsIfMissing,
    addCustomExitActionsIfMissing
};
module.exports = dgu; 