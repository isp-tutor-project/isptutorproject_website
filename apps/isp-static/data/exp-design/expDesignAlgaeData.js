const { ExpDesignDataBuilder } = require("./builder");
const { expDesignSharedScenes } = require("./expDesignSharedData")
const expDesignAlgaeData = {
    scenes: Object.assign(expDesignSharedScenes, {
        "intro-think-about-procedure": {
            edges: {
                prev: "intro-select-var3-values"
            }
        }
    })
}
let bldr = new ExpDesignDataBuilder(expDesignAlgaeData);
module.exports = bldr.buildData();
