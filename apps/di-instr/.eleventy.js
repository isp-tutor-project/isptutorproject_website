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

    eleventyConfig.addPassthroughCopy("templates/img");
    
    eleventyConfig.addCollection("diInstrScenesWithData", function (collection) {
        let scenes = collection.getFilteredByTag("diInstrScenes");
        let sceneData = collection.getAll()[0].data.diInstr.scenes;
        return mergeScenesWithData(scenes, sceneData);
    });
    
    return {
        dir: {
            input: "templates",
            output: "dist",
        },
        templateFormats: ["njk"]
    }
}