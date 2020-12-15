
const {
    prettify,
    uuid,
    jsonify,
    mergeScenesWithData
} = require("@isptutorproject/eleventy-config");

// function getNthLetter(n) {
//     return "abcdefghijklmnopqrstuvwxyz"[n];
// }

module.exports = function(eleventyConfig) {
    eleventyConfig.addTransform("prettier", prettify);
    eleventyConfig.addNunjucksFilter("jsonify", jsonify);
    // eleventyConfig.addNunjucksFilter("uuid", uuid);
    // eleventyConfig.addNunjucksFilter("getNthLetter", getNthLetter);

    eleventyConfig.addPassthroughCopy("templates/img");

    eleventyConfig.addCollection("rqIntroScenesWithData", function (collection) {
        let scenes = collection.getFilteredByTag("rqIntroScenes");
        let sceneData = collection.getAll()[0].data.rqIntro.scenes;
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