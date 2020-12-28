// const fs = require("fs");
// const path = require("path");

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


class DataBuilder {

    constructor(origData) {
        // constructor(filePrefix) {
        // this.inFile = path.resolve(__dirname, `${filePrefix}Data`);
        // // this.outFile = path.resolve(__dirname, `${filePrefix}.json`);
        // const pwd = process.cwd();
        // let dirname = path.dirname(filePrefix);
        // let basename = path.basename(filePrefix);
        // this.inFile  = path.join(pwd, "data", dirname, `${basename}Data.js`);
        // let tmp = path.join("dist", "data", `${basename}.json`);
        // this.outFile = path.join(pwd, tmp);
        // // console.log("__dirname", __dirname);
        // // console.log("infile", this.inFile);
        // // console.log("outfile", this.outFile);
        // console.log(`generating: ${tmp}`);
        this.origData = origData;
    }

    buildData() {
        // blow away old generated content if it exists
        // console.log(`infile: ${inFile}\noutfile: ${outFile}`);
        // let origData;
        // removeOldFile(this.outFile);
        // try {
        //     // console.log(`loading ${this.inFile}`);
        //     origData = require(this.inFile);
        //     // console.log(`data loaded`);
        // } catch (err) {
        //     console.error(err);
        //     process.exit(1);
        // }
        const mungedData = this.mungeData(this.origData);
        return mungedData;
        // if (mungedData) {
        //     // console.log(`writing to outfile ${outFile}`);
        //     fs.writeFileSync(this.outFile, JSON.stringify(mungedData, null, 4));
        // }
    }


    mungeData(data)  {
        let newData = { scenes: {} };
        let errorsFound = false;
        for (let [sceneId, sceneData] of Object.entries(data.scenes)) {
            sceneData["id"] = sceneId;
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

};


// function removeOldFile(outFile) {
//     if (fs.existsSync(outFile)) {
//         // console.log("blowing away old outfile");
//         try {
//             fs.unlinkSync(outFile);
//         } catch (err) {
//             console.error(err);
//         }
//     }
// }


// function genData(filePrefix, munger) {
//     console.log(`generating ${filePrefix} data..`);
//     const inFile = path.resolve(__dirname, `${filePrefix}Data`);
//     const distDir = path.join(__dirname, '..', 'dist');
//     const outFile = path.join(distDir, `${filePrefix}.json`);
//     if (!fs.existsSync(distDir)) {
//         fs.mkdirSync(distDir);
//     }
//     // blow away old generated content if it exists
//     // console.log(`infile: ${inFile}\noutfile: ${outFile}`);
//     removeOldFile(outFile);
//     let origData;
//     try {
//         // console.log(`loading ${inFile}`);
//         origData = require(inFile);
//         // console.log(`data loaded`);
//     } catch(err) {
//         console.error(err);
//         process.exit(1);
//     }
//     const mungedData = munger(origData);
//     if (mungedData) {
//         // console.log(`writing to outfile ${outFile}`);
//         fs.writeFileSync(outFile, JSON.stringify(mungedData, null, 4));
//     }
// }

module.exports = {
    DataBuilder,
    addSceneTypeIfMissing,
    addCustomEnterActionsIfMissing,
    addCustomExitActionsIfMissing
};
// genData,
