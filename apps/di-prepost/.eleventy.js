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
        <div class="dev centered-wrapper">
            <div class="dev centered" style="top:${pctFromTop}%;">
                ${content}
            </div>
        </div>
    `;
}

module.exports = function(eleventyConfig) {
    eleventyConfig.addTransform("prettier", prettify);

    eleventyConfig.addWatchTarget("./dist/");
    eleventyConfig.addWatchTarget("./src/js/");
    eleventyConfig.addWatchTarget("./src/css/");

    eleventyConfig.addPassthroughCopy({ "dist": "." });
    eleventyConfig.addPassthroughCopy({ "src/img": "img" });

    
    eleventyConfig.addNunjucksFilter("jsonify", function (obj, indent = null) {
        return JSON.stringify(obj, null, indent);
    });

    eleventyConfig.addNunjucksFilter("uuid", uuid);

    eleventyConfig.addPairedShortcode("vertcenter", verticallyCenter);

    eleventyConfig.addCollection("diPretestScenes", function (collection) {
        let scenes = collection.getFilteredByTag("pretestScenes");
        let sceneData = collection.getAll()[0].data.pretest.scenes;

        let munged = scenes.map((item) => {
            let id = item.data.page.fileSlug;
            // console.log(id);
            let frontMatter = item.template.frontMatter.data;
            // console.log("\tfrontMatter", frontMatter);
            // console.log("\tsceneData", sceneData[id]);
            item.data.page.data = Object.assign({}, frontMatter, sceneData[id]);
            return item;
        });
        return munged;
    });

    return {
        dir: {
            input: "src/templates",
            includes: "_includes",
            data: "_data"
        },
        templateFormats: ["njk"]
    }
}