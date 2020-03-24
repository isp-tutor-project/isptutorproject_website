#!/usr/bin/env node

const path = require("path");
const fs = require("fs");
const copyFiles = require("copyfiles");

// files relative to this script
const headSnippetFile = path.join(__dirname, "headSnippet.html");
const bodySnippetFile = path.join(__dirname, "bodySnippet.html");
const headSnippet = fs.readFileSync(headSnippetFile,
    { encoding: "utf8" });
const bodySnippet = fs.readFileSync(bodySnippetFile,
    { encoding: "utf8" });


// files relative to project we're building
const projectDir = path.basename(process.cwd());
const publicDir  = path.join(".", "public");
const srcDir     = path.join(".", "src");
const buildDir   = path.join(".", "dist");
const inputHtmlFile  = path.join(publicDir,  "index.html");
const outputHtmlFile = path.join(buildDir,   "index.html");



function mungeIndexHtml() {
    let html = fs.readFileSync(inputHtmlFile, { encoding: 'utf8' });
    html = html.replace("</head>", `${headSnippet}</head>`);
    html = html.replace("</body>", `${bodySnippet}</body>`);
    fs.writeFileSync(outputHtmlFile, html);
}

// NOTE: this is asyncronous
copyFiles([ 
        `${publicDir}/*`, 
        `${publicDir}/**/*`,
        `${publicDir}/**/**/*`,
        buildDir
    ], { 
        up: 1, 
        verbose: true 
    },
    (err) => {
        if (err) {
            throw(err);
        }
        // call placed here, so it occurs syncronously after file copies
        // (if successful)
        mungeIndexHtml();
    }
);

