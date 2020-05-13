// this config simply copies all of the individually built apps into wwwroot

const APPS = {
    "../di-instr/dist": "di-instr",
    "../di-prepost/dist": "di-prepost",
    "../homepage/dist": ".",
    "../hypo/dist": "hypo"
};
// {
//     "di-instr": {
//         watchFiles: "../di-instr/dist/",
//         src: "../di-instr/dist/",
//         dest: "di-instr"
//     },
//     // "di-prepost": {
//     //     watchFiles: "../di-prepost/dist/*.*",
//     //     src: "../../di-prepost/",
//     //     dest: "di-prepost"
//     // },
//     // "homepage": {
//     //     watchFiles: "../homepage/dist/*.*",
//     //     src: "../../homepage/dist/",
//     //     dest: "."
//     // },
//     // "hypo": {
//     //     watchFiles: "../hypo/dist/*.*",
//     //     src: "../../hypo/dist/",
//     //     dest: "hypo"
//     // }
// };


module.exports = function(eleventyConfig) {
 
    for (let [appSrc, appDest] of Object.entries(APPS)) {
        eleventyConfig.addWatchTarget(`${appSrc}/**`);
        eleventyConfig.addPassthroughCopy({[appSrc]: appDest});
    }
    // for (let app of Object.entries(APPS)) {
    //     console.log(process.cwd());
    //     console.log(app);
    //     eleventyConfig.addWatchTarget(app.watchFiles);
    //     eleventyConfig.addPassthroughCopy({[app.src]: app.dest});
    // }
    
    eleventyConfig.addPassthroughCopy("img");
    
    return {
        dir: {
            input: "templates",
            output: "../../wwwroot",
        },
        templateFormats: ["njk"]
    }
}