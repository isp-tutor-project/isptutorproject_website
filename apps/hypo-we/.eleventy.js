const fs = require("fs");
const path = require("path");

// const {
//     prettify,
// // } = require("@isptutorproject/eleventy-config");
// const {
//     configureCaptivatePassThrus,
//     mungeIndexHtml,
//     mungeGoodbyeHtml
// } =
const {captivate} = require("@isptutorproject/build-captivate-app");
// console.log(captivate);
// uuid,
//     jsonify,
//     mergeScenesWithData
// verticallyCenter,
// eleventyConfig.addPairedShortcode("vertcenter", verticallyCenter);


module.exports = function(eleventyConfig) {
    // eleventyConfig.addTransform("prettier", prettify);
    // eleventyConfig.addNunjucksFilter("jsonify", jsonify);
    // eleventyConfig.addNunjucksFilter("uuid", uuid);
    // captivate.configure({
    //     noIframe: true
    // });
    captivate.setupPassthroughsCopys(eleventyConfig);
    // eleventyConfig.addPassthroughCopy("public");
    eleventyConfig.addTransform("mungeIndexHtml", captivate.mungeIndexHtml);

    // eleventyConfig.addCollection("hypoWEScenesWithData", function (collection) {
    //     let scenes = collection.getFilteredByTag("hypoWEScenes");
    //     let sceneData = collection.getAll()[0].data.hypoWE.scenes;
    //     return mergeScenesWithData(scenes, sceneData);
    // });

    return {
        dir: {
            input: "templates",
            output: "dist",
        },
        templateFormats: ["njk", "html"]
    }
}