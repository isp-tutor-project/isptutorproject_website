
const {
    prettify,
    uuid,
    jsonify,
    mergeScenesWithData
} = require("@isptutorproject/eleventy-config");

module.exports = function(eleventyConfig) {
    eleventyConfig.addTransform("prettier", prettify);
    eleventyConfig.addNunjucksFilter("jsonify", jsonify);
    eleventyConfig.addNunjucksFilter("uuid", uuid);

    eleventyConfig.addPassthroughCopy("templates/img");

    eleventyConfig.addCollection("diPretestScenesWithData", function (collection) {
        let scenes = collection.getFilteredByTag("diPreTestScenes");
        let sceneData = collection.getAll()[0].data.diPreTest.scenes;
        return mergeScenesWithData(scenes, sceneData);
    });

    eleventyConfig.addCollection("diPosttestScenesWithData", function (collection) {
        let scenes = collection.getFilteredByTag("diPostTestScenes");
        let sceneData = collection.getAll()[0].data.diPostTest.scenes;
        return mergeScenesWithData(scenes, sceneData);
    });

    return {
        dir: {
            input: "templates",
            output: "dist"
        },
        templateFormats: ["njk"]
    }
}