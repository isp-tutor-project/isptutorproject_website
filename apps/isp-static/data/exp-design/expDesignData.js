const { ExpDesignDataBuilder } = require("./builder");

const expDesignData = {
    scenes: {
        intro: {
            edges: []
        }
    }
};

let bldr = new ExpDesignDataBuilder(expDesignData);
module.exports = bldr.buildData();
