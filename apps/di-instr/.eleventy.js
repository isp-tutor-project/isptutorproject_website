const fs = require("fs");
const path = require("path");

const {
    prettify,
    uuid,
    jsonify,
    mergeScenesWithData
} = require("@isptutorproject/eleventy-config");
// verticallyCenter,


const sceneNameRE = /^(?<prefix>[a-zA-Z]+)(?<num>[0-9]+)?(?<suffix>[a-zA-Z]+)?$/;

function sceneNameCmp(a, b) {
    // sorts scene names based on <textprefix><numbers><textsuffix> pattern
    // console.log(a.fileSlug);
    // console.log(b.fileSlug);
    let matA = sceneNameRE.exec(a.fileSlug);
    let matB = sceneNameRE.exec(b.fileSlug);
    matA.groups.num = matA.groups.num || "0";
    matA.groups.suffix = matA.groups.suffix || "";
    matB.groups.num = matB.groups.num || "0";
    matB.groups.suffix = matB.groups.suffix || "";
    let prefixCmp = matA.groups.prefix.localeCompare(matB.groups.prefix);
    if (0 !== prefixCmp) {
        return prefixCmp;
    }
    let aN = parseInt(matA.groups.num);
    let bN = parseInt(matB.groups.num);
    if (aN !== bN) {
        return aN > bN ? 1 : -1;
    }
    return matA.groups.suffix.localeCompare(matB.groups.suffix);
}

function sortBySceneName(values) {
    let vals = [...values];
    return vals.sort(sceneNameCmp);
}

module.exports = function(eleventyConfig) {
    eleventyConfig.addTransform("prettier", prettify);
    eleventyConfig.addNunjucksFilter("jsonify", jsonify);
    eleventyConfig.addNunjucksFilter("uuid", uuid);
    eleventyConfig.addNunjucksFilter("sortBySceneName", sortBySceneName);
    // eleventyConfig.addPairedShortcode("vertcenter", verticallyCenter);

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