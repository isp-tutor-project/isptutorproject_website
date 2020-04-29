const fs = require("fs");
const path = require("path");

const prettier = require("prettier");
const uuidV1 = require("uuid/v1");

// both indents html output and catches some html syntax errors
function prettify(content, outputPath) {
    if (outputPath && outputPath.endsWith(".html")) {
        return prettier.format(content, { parser: "html" })
    }
    return content;
}

function uuid(prefix) {
    return `${prefix}-${uuidV1()}`
}

function verticallyCenter(content, pctFromTop = 30) {
    return `
        <div class="centered-wrapper">
            <div class="centered" style="top:${pctFromTop}%;">
                ${content}
            </div>
        </div>
    `;
}

function jsonify(obj, indent = null) {
    return JSON.stringify(obj, null, indent);
}

const APPS = {
    "homepage": ".",
    "di-instruction": "di-instruction",
    "di-prepost": "di-prepost",
    "hypo-defs": "hypo/defs"
};


function mergeScenesWithData(scenes, sceneData) {
    let newScenes = scenes.map((item) => {
        let id = item.data.page.fileSlug;
        let frontMatter = item.template.frontMatter.data;
        item.data.page.data = Object.assign({}, frontMatter, sceneData[id]);
        return item;
    });
    return newScenes;
}

module.exports = function(eleventyConfig) {
    eleventyConfig.addTransform("prettier", prettify);

    eleventyConfig.addNunjucksFilter("jsonify", jsonify);
    eleventyConfig.addNunjucksFilter("uuid", uuid);

    eleventyConfig.addPairedShortcode("vertcenter", verticallyCenter);
    for (let [app, appPath] of Object.entries(APPS)) {
        eleventyConfig.addWatchTarget(`../${app}/dist/*.*`);
        eleventyConfig.addPassthroughCopy({[`../${app}/dist/*.*`]: appPath});
    }
    
    eleventyConfig.addPassthroughCopy({"img": "img"});
    // eleventyConfig.addPassthroughCopy({"src/styles/*.*": "."});


    eleventyConfig.addCollection("diInstrScenesWithData", function (collection) {
        let scenes = collection.getFilteredByTag("diInstrScenes");
        let sceneData = collection.getAll()[0].data.diInstr.scenes;
        return mergeScenesWithData(scenes, sceneData);
    });

    eleventyConfig.addCollection("diPreTestScenesWithData", function (collection) {
        let scenes = collection.getFilteredByTag("diPreTestScenes");
        let sceneData = collection.getAll()[0].data.diPreTest.scenes;
        return mergeScenesWithData(scenes, sceneData);
    });

    eleventyConfig.addCollection("hypoDefScenesWithData", function (collection) {
        let scenes = collection.getFilteredByTag("hypoDefScenes");
        let sceneData = collection.getAll()[0].data.hypoDefs.scenes;
        return mergeScenesWithData(scenes, sceneData);
    });

    return {
        dir: {
            input: "templates",
            output: "../../wwwroot",
        },
        templateFormats: ["njk"]
    }
}