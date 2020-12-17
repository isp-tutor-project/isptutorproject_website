
const {
    prettify,
    uuid,
    jsonify,
    mergeScenesWithData
} = require("@isptutorproject/eleventy-config");

function getNthLetter(n) {
    return "abcdefghijklmnopqrstuvwxyz"[n];
}

module.exports = function(eleventyConfig) {
    eleventyConfig.addTransform("prettier", prettify);
    eleventyConfig.addNunjucksFilter("jsonify", jsonify);
    eleventyConfig.addNunjucksFilter("uuid", uuid);
    eleventyConfig.addNunjucksFilter("getNthLetter", getNthLetter);

    eleventyConfig.addPassthroughCopy("templates/img");

    eleventyConfig.addCollection("sfPreTestScenesWithData", function (collection) {
        let scenes = collection.getFilteredByTag("sfPreTestScenes");
        let sceneData = collection.getAll()[0].data.sfPreTest.scenes;
        return mergeScenesWithData(scenes, sceneData);
    });

    eleventyConfig.addCollection("sfPostTestScenesWithData", function (collection) {
        let scenes = collection.getFilteredByTag("sfPostTestScenes");
        let sceneData = collection.getAll()[0].data.sfPostTest.scenes;
        return mergeScenesWithData(scenes, sceneData);
    });

    return {
        dir: {
            input: "templates",
            output: "dist"
        },
        templateFormats: ["njk"]
    };
}
