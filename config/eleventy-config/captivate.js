const path = require("path");

const INDEX_HTML_HEAD_SNIPPET = `
<script src="https://www.gstatic.com/firebasejs/6.2.1/firebase-app.js"></script>
<script src="https://www.gstatic.com/firebasejs/6.2.1/firebase-firestore.js"></script>
`;
const INDEX_HTML_BODY_SNIPPET = `
<script src="../iframe.bundle.js"></script>
`;

const DEFAULT_PASS_THRUS = [
    "ar", "assets", "callees", "dr", "vr", "project.txt"
];

const DEFAULT_ELEVENTY_OUTPUT_PATH = "dist";
const DEFAULT_PUBLIC_DEST_PATH = "public"

let PASS_THRUS = DEFAULT_PASS_THRUS;

let eleventyOutputPath;
let destDir;
let destPath;
let configured = false;
let indexHtmlPath;
let goodbyeHtmlPath;

function computeHtmlFilePaths() {
    indexHtmlPath = path.join(eleventyOutputPath, destDir, "index.html");
    goodbyeHtmlPath = path.join(eleventyOutputPath, destDir, "goodbye.html");
}

function configure(options={}) {
    console.log(JSON.stringify(options));
    eleventyOutputPath = options.eleventyOutputPath || DEFAULT_ELEVENTY_OUTPUT_PATH;
    // publicPath = options.publicDestPath || DEFAULT_PUBLIC_DEST_PATH;
    // if (options.noIframe) {
    //     destDir = "";
    //     destPath = ".";
    // }  else {
    // }
    destDir = DEFAULT_PUBLIC_DEST_PATH;
    destPath = DEFAULT_PUBLIC_DEST_PATH;
    computeHtmlFilePaths();
    configured = true;
    dispSettings();
    // process.exit(0);
}

function useDefaults() {
    eleventyOutputPath = DEFAULT_ELEVENTY_OUTPUT_PATH;
    destDir = DEFAULT_PUBLIC_DEST_PATH;
    destPath = DEFAULT_PUBLIC_DEST_PATH;
    computeHtmlFilePaths();
    configured = true;
    dispSettings();
    // process.exit(0);
}

function dispSettings() {
    console.log(`
    configured: ${configured}
    eleventyOutputPath: ${eleventyOutputPath}
    destDir: ${destDir}
    destPath: ${destPath}
    indexHtmlPath: ${indexHtmlPath}
    goodbyeHtmlPath: ${goodbyeHtmlPath}
    `);
}


function setOutputDir(dirName) {
    outputDir = dirname;
}
function noIframe() {
    destDir = "";
}

function setCustomPassthroughs(customPassThroughs) {
    PASS_THRUS = customPassThroughs;
}

function setupPassthroughsCopys(eleventyConfig, addGoodbye=true) {
    if (!configured) {
        useDefaults();
    }
    for (let item of PASS_THRUS) {
        let src = `public/${item}`;
        let dest = `${destPath}/${item}`;
        let passThru = {[src]: dest};
        console.log(`adding PassThru: {"${src}": "${dest}"}`);
        eleventyConfig.addPassthroughCopy(passThru);
    }
    if (addGoodbye) {
        let src = "public/goodbye.html";
        let dest = `${destPath}/goodbye.html`;
        let passThru = { [src]: dest };
        console.log(`adding PassThru: {"${src}": "${dest}"}`);
        eleventyConfig.addPassthroughCopy(passThru);
    }
}

function mungeIndexHtml(content, outputPath) {
    if (!configured) {
        useDefaults();
    }
    if (indexHtmlPath === outputPath) {
        console.log(`tranforming content of ${outputPath}`);
        content = content.replace("</head>", `${INDEX_HTML_HEAD_SNIPPET}\n</head>`);
        content = content.replace("</body>", `${INDEX_HTML_BODY_SNIPPET}\n</body>`);
    }
    return content;
}

function mungeGoodbyeHtml(content, outputPath) {
    if (!configured) {
        useDefaults();
    }
    if (goodbyeHtmlPath === outputPath) {
        console.log("I would be munging goodbye.html here");
    }
    return content;
}


const captivate = {
    DEFAULT_PASS_THRUS,
    configure,
    // setOutputDir,
    // noIframe,
    setCustomPassthroughs,
    setupPassthroughsCopys,
    mungeIndexHtml,
    mungeGoodbyeHtml
};

module.exports = {
    captivate
};

// let iframeMode = false;
// let args = process.argv;
// if (3 === args.length && "iframe" === args[2]) {
//     iframeMode = true;
// }

// const fs = require("fs");
// const copyFiles = require("copyfiles");

// files relative to this script
// const headSnippetFile = path.join(__dirname, "headSnippet.html");
// const bodySnippetFile = path.join(__dirname, "bodySnippet.html");
// const headSnippet = fs.readFileSync(headSnippetFile,
//     { encoding: "utf8" });
// const bodySnippet = fs.readFileSync(bodySnippetFile,
//     { encoding: "utf8" });


// files relative to project we're building
// const projectDir = path.basename(process.cwd());
// const publicDir  = path.join(".", "public");
// const srcDir     = path.join(".", "src");
// let buildDir;
// buildDir   = path.join(".", "dist");
// if (iframeMode) {
//     buildDir = path.join(".", "dist", "public")
// }
// const inputHtmlFile  = path.join(publicDir,  "index.html");
// let outputHtmlFile;
// if (iframeMode) {
//     outputHtmlFile = path.join(buildDir, "public", "index.html");
// } else {
    // outputHtmlFile = path.join(buildDir, "index.html");
// }

// function old_mungeIndexHtml() {
//     let html = fs.readFileSync(inputHtmlFile, { encoding: 'utf8' });
//     html = html.replace("</head>", `${headSnippet}</head>`);
//     html = html.replace("</body>", `${bodySnippet}</body>`);
//     fs.writeFileSync(outputHtmlFile, html);
// }

// // NOTE: this is asyncronous
// function wrap_copyfiles() {
//     copyFiles([
//             `${publicDir}/*`,
//             `${publicDir}/**/*`,
//             `${publicDir}/**/**/*`,
//             buildDir
//         ], {
//             up: 1,
//             verbose: true
//         },
//         (err) => {
//             if (err) {
//                 throw(err);
//             }
//             // call placed here, so it occurs syncronously after file copies
//             // (if successful)
//             mungeIndexHtml();
//         }
//     );
// }
