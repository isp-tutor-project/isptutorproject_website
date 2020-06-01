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
    
    eleventyConfig.addCollection("hypoWEScenesWithData", function (collection) {
        let scenes = collection.getFilteredByTag("hypoWEScenes");
        let sceneData = collection.getAll()[0].data.hypoWE.scenes;
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