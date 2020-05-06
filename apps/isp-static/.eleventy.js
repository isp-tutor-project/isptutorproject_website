// const fs = require("fs");
// const path = require("path");

// const { 
//     prettify, 
//     uuid,
//     verticallyCenter,
//     jsonify,
//     mergeScenesWithData
// } = require("@isptutorproject/eleventy-config");

const APPS = {
    "../di-instr/dist/*.*": "di-instr",
    "../di-prepost/dist/*.*": "di-prepost",
    "../homepage/dist/*.*": ".",
    "../hypo/dist/*.*": "hypo"
};

module.exports = function(eleventyConfig) {
    // eleventyConfig.addTransform("prettier", prettify);
    // eleventyConfig.addNunjucksFilter("jsonify", jsonify);
    // eleventyConfig.addNunjucksFilter("uuid", uuid);
    // eleventyConfig.addPairedShortcode("vertcenter", verticallyCenter);

    for (let [appSrc, appDest] of Object.entries(APPS)) {
        eleventyConfig.addWatchTarget(appSrc);
        eleventyConfig.addPassthroughCopy({[appSrc]: appDest});
    }
    
    eleventyConfig.addPassthroughCopy({"img": "img"});
    // eleventyConfig.addPassthroughCopy({"src/styles/*.*": "."});

    return {
        dir: {
            input: "templates",
            output: "../../wwwroot",
        },
        templateFormats: ["njk"]
    }
}