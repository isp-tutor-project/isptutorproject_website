// this config simply copies all of the individually built apps into wwwroot
const fs = require("fs");
const path = require("path");

const {
    prettify,
    uuid,
    jsonify,
    mergeScenesWithData
} = require("@isptutorproject/eleventy-config");
// verticallyCenter,

const APPS = {
    "../di-instr/dist": "bundles/",
    "../di-prepost/dist": "bundles/",
    "../homepage/dist": "bundles/",
    "../hypo-we/dist": "bundles/hypo-we",
    "../histogram/dist": "bundles/histogram",
    "../rq-intro/dist": "bundles/",
    "../exp-design/dist": "bundles/",
    "../sf-assessment/dist": "bundles/",
    "../../common/isp-api/dist": "libs",
    "../../edforge": "edforge"
};

// "../hypo-gr/dist": "apps/hypo-gr",

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

function getNthLetter(n) {
    return "abcdefghijklmnopqrstuvwxyz"[n];
}

module.exports = function(eleventyConfig) {
    // eleventyConfig.addTransform("prettier", prettify);
    eleventyConfig.addNunjucksFilter("jsonify", jsonify);
    eleventyConfig.addNunjucksFilter("uuid", uuid);
    eleventyConfig.addNunjucksFilter("sortBySceneName", sortBySceneName);
    eleventyConfig.addNunjucksFilter("getNthLetter", getNthLetter);

    for (let [appSrc, appDest] of Object.entries(APPS)) {
        eleventyConfig.addWatchTarget(`${appSrc}/**`);
        eleventyConfig.addPassthroughCopy({[appSrc]: appDest});
    }

    eleventyConfig.addPassthroughCopy({"templates/img": "img"});

    eleventyConfig.addCollection("diInstrScenesWithData", function (collection) {
        let scenes = collection.getFilteredByTag("diInstrScenes");
        let sceneData = collection.getAll()[0].data.diInstr.scenes;
        return mergeScenesWithData(scenes, sceneData);
    });

    eleventyConfig.addCollection("diPretestScenesWithData", function (collection) {
        let scenes = collection.getFilteredByTag("diPreTestScenes");
        let sceneData = collection.getAll()[0].data.diPreTest.scenes;
        return mergeScenesWithData(scenes, sceneData);
    });

    eleventyConfig.addCollection("diPosttestScenesWithData", function (collection) {
        let scenes = collection.getFilteredByTag("diPostTestScenes");
        let sceneData = collection.getAll()[0].data.diPostTest.scenes;
        return mergeScenesWithData(scenes, sceneData);
    });

    eleventyConfig.addCollection("diCrystaltestScenesWithData", function (collection) {
        let scenes = collection.getFilteredByTag("diCrystalTestScenes");
        let sceneData = collection.getAll()[0].data.diCrystalTest.scenes;
        return mergeScenesWithData(scenes, sceneData);
    });

    return {
        dir: {
            input: "templates",
            output: "../../wwwroot",
        },
        templateFormats: ["njk"]
    }