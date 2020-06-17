const fs = require("fs");
const path = require("path");

const { 
    prettify, 
    uuid,
    jsonify,
    mergeScenesWithData
} = require("@isptutorproject/eleventy-config");
// verticallyCenter,
// eleventyConfig.addPairedShortcode("vertcenter", verticallyCenter);


module.exports = function(eleventyConfig) {
    eleventyConfig.addTransform("prettier", prettify);
    eleventyConfig.addNunjucksFilter("jsonify", jsonify);
    eleventyConfig.addNunjucksFilter("uuid", uuid);
   
    eleventyConfig.addPassthroughCopy("templates/img");
    eleventyConfig.addPassthroughCopy("templates/media")
    // eleventyConfig.addCollection("hypoGRScenesWithData", function (collection) {
    //     let scenes = collection.getFilteredByTag("hypoGRScenes");
    //     let sceneData = collection.getAll()[0].data.hypoGR.scenes;
    //     return mergeScenesWithData(scenes, sceneData);
    // });
    
    return {
        dir: {
            input: "templates",
            output: "dist",
        },
        templateFormats: ["njk"]
    }
}