// this config simply copies all of the individually built apps into wwwroot

const APPS = {
    "../di-instr/dist": "di-instr",
    "../di-prepost/dist": "di-prepost",
    "../homepage/dist": ".",
    "../hypo-gr/dist": "hypo-gr"
};

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