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

function mergeScenesWithData(scenes, sceneData) {
    let newScenes = scenes.map((item) => {
        let id = item.data.page.fileSlug;
        let frontMatter = item.template.frontMatter.data;
        item.data.page.data = Object.assign({}, frontMatter, sceneData[id]);
        return item;
    });
    return newScenes;
}

module.exports = {
    prettify,
    uuid,
    verticallyCenter,
    jsonify,
    mergeScenesWithData
};