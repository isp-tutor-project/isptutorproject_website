const fs = require("fs");
const path = require("path");

const { 
    prettify, 
    uuid,
    verticallyCenter,
    jsonify,
    mergeScenesWithData
} = require("@isptutorproject/eleventy-config");

const APPS = {
    "homepage": "."
};

// "di-instruction": "di-instruction",
// "di-prepost": "di-prepost",
// "hypo-defs": "hypo/defs"

module.exports = function(eleventyConfig) {
    eleventyConfig.addTransform("prettier", prettify);
    eleventyConfig.addNunjucksFilter("jsonify", jsonify);
    eleventyConfig.addNunjucksFilter("uuid", uuid);
    eleventyConfig.addPairedShortcode("vertcenter", verticallyCenter);

    eleventyConfig.addWatchTarget('../di-instruction/dist/*.*');
    eleventyConfig.addPassthroughCopy({"../di-instruction/dist": "di-instruction"});
    eleventyConfig.addWatchTarget('../di-prepost/dist/*.*');
    eleventyConfig.addPassthroughCopy({ "../di-prepost/dist": "di-prepost" });
    eleventyConfig.addWatchTarget('../hypo/dist/*.*');
    eleventyConfig.addPassthroughCopy({ "../hypo/dist": "hypo" });

    for (let [app, appPath] of Object.entries(APPS)) {
        eleventyConfig.addWatchTarget(`../${app}/dist/*.*`);
        eleventyConfig.addPassthroughCopy({[`../${app}/dist/*.*`]: appPath});
    }
    
    eleventyConfig.addPassthroughCopy({"img": "img"});
    // eleventyConfig.addPassthroughCopy({"src/styles/*.*": "."});

    // eleventyConfig.addCollection("diInstrScenesWithData", function (collection) {
    //     let scenes = collection.getFilteredByTag("diInstrScenes");
    //     let sceneData = collection.getAll()[0].data.diInstr.scenes;
    //     return mergeScenesWithData(scenes, sceneData);
    // });

    // eleventyConfig.addCollection("diPreTestScenesWithData", function (collection) {
    //     let scenes = collection.getFilteredByTag("diPreTestScenes");
    //     let sceneData = collection.getAll()[0].data.diPreTest.scenes;
    //     return mergeScenesWithData(scenes, sceneData);
    // });

    // eleventyConfig.addCollection("hypoDefScenesWithData", function (collection) {
    //     let scenes = collection.getFilteredByTag("hypoDefScenes");
    //     let sceneData = collection.getAll()[0].data.hypoDefs.scenes;
    //     return mergeScenesWithData(scenes, sceneData);
    // });

    return {
        dir: {
            input: "templates",
            includes: "_includes",
            output: "../../wwwroot",
        },
        templateFormats: ["njk"]
    }
}