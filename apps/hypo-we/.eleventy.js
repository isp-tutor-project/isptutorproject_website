
const {
    prettify,
    captivate
} = require("@isptutorproject/eleventy-config")
//     uuid,
//     jsonify,



module.exports = function(eleventyConfig) {
    eleventyConfig.addTransform("prettier", prettify);
    // eleventyConfig.addNunjucksFilter("jsonify", jsonify);
    // eleventyConfig.addNunjucksFilter("uuid", uuid);
    captivate.setupPassthroughsCopys(eleventyConfig);
    eleventyConfig.addPassthroughCopy("templates/img");
    eleventyConfig.addTransform("mungeIndexHtml", captivate.mungeIndexHtml);

    return {
        dir: {
            input: "templates",
            output: "dist",
        },
        // html needed for captivate project html file munging transforms
        templateFormats: ["njk", "html"]
    }
}