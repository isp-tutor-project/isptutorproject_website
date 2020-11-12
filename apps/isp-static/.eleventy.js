// this config simply copies all of the individually built apps into wwwroot

const APPS = {
    "../di-instr/dist": "apps/di-instr",
    "../di-prepost/dist": "apps/di-prepost",
    "../homepage/dist": ".",
    "../hypo-we/dist": "apps/hypo-we",
    "../histogram/dist": "apps/histogram",
    "../rq-intro/dist": "apps/rq-intro",
    "../exp-design/dist": "apps/exp-design",
    "../../common/isp-api/dist": "libs",
    "../../edforge": "edforge"
};

// "../hypo-gr/dist": "apps/hypo-gr",

module.exports = function(eleventyConfig) {

    for (let [appSrc, appDest] of Object.entries(APPS)) {
        eleventyConfig.addWatchTarget(`${appSrc}/**`);
        eleventyConfig.addPassthroughCopy({[appSrc]: appDest});
    }

    // eleventyConfig.addPassthroughCopy("img");

    return {
        dir: {
            input: "templates",
            output: "../../wwwroot",
        },
        templateFormats: ["njk"]
    }
}