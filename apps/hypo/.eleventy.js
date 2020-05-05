const fs = require("fs");
const path = require("path");

const { 
    prettify, 
    uuid,
    verticallyCenter,
    jsonify,
    mergeScenesWithData
} = require("@isptutorproject/eleventy-config");


module.exports = function(eleventyConfig) {
    eleventyConfig.addTransform("prettier", prettify);
    eleventyConfig.addNunjucksFilter("jsonify", jsonify);
    eleventyConfig.addNunjucksFilter("uuid", uuid);
    eleventyConfig.addPairedShortcode("vertcenter", verticallyCenter);

    
    eleventyConfig.addCollection("hypoScenesWithData", function (collection) {
        let scenes = collection.getFilteredByTag("hypoScenes");
        let sceneData = collection.getAll()[0].data.hypo.scenes;
        return mergeScenesWithData(scenes, sceneData);
    });
    
    return {
        dir: {
            input: "templates",
            includes: "_includes",
            output: "dist",
        },
        templateFormats: ["njk"]
    }
}