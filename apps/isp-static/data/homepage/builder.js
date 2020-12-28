// const fs = require("fs");
// const path = require("path");

const { DataBuilder } = require("../data-builder");

class HomePageDataBuilder extends DataBuilder {
    // constructor(filePrefix) {
    //     const pwd = process.cwd();
    //     let dirname = path.dirname(filePrefix);
    //     let basename = path.basename(filePrefix);
    //     this.inFile = path.join(pwd, "data", dirname, `${basename}Data.js`);
    //     let tmp = path.join("dist", "data", `${basename}.json`);
    //     this.outFile = path.join(pwd, tmp);
    //     // console.log("infile", this.inFile);
    //     // console.log("outfile", this.outFile);
    //     console.log(`generating: ${tmp}`);
    // }

    mungeData(data) {
        // currently a no-op
        return data;
    }
    // buildData() {
    //     let data;
    //     try {
    //         data = require(this.inFile);
    //     } catch (err) {
    //         console.error(err);
    //         process.exit(1);
    //     }
    //     fs.writeFileSync(this.outFile, JSON.stringify(data, null, 4));
    // }
}

module.exports = {
    HomePageDataBuilder
};