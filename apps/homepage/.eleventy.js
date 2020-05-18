// const fs = require("fs");
// const path = require("path");

const { 
    prettify, 
    uuid,
    jsonify,
    mergeScenesWithData
} = require("@isptutorproject/eleventy-config");
// verticallyCenter,

// const APPS = {
//     "di-instruction": "di-instruction",
// };


module.exports = function(eleventyConfig) {
    eleventyConfig.addTransform("prettier", prettify);
    eleventyConfig.addNunjucksFilter("jsonify", jsonify);
    eleventyConfig.addNunjucksFilter("uuid", uuid);
    // eleventyConfig.addPairedShortcode("vertcenter", verticallyCenter);

    return {
        dir: {
            input: "templates",
            output: "dist",
        },
        templateFormats: ["njk"]
    }
}