const fs = require("fs");
const path = require("path");



class HomePageDataBuilder {
    constructor(filePrefix) {
        const pwd = process.cwd();
        let dirname = path.dirname(filePrefix);
        let basename = path.basename(filePrefix);
        this.inFile = path.join(pwd, "data", dirname, `${basename}Data.js`);
        let tmp = path.join("dist", "data", `${basename}.json`);
        this.outFile = path.join(pwd, tmp);
        // console.log("infile", this.inFile);
        // console.log("outfile", this.outFile);
        console.log(`generating: ${tmp}`);
    }

    buildData() {
        let data;
        try {
            data = require(this.inFile);
        } catch (err) {
            console.error(err);
            process.exit(1);
        }
        fs.writeFileSync(this.outFile, JSON.stringify(data, null, 4));
    }
}

module.exports = {
    HomePageDataBuilder
};