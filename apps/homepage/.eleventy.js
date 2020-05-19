
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
    
    return {
        dir: {
            input: "templates",
            output: "dist",
        },
        templateFormats: ["njk"]
    }
}