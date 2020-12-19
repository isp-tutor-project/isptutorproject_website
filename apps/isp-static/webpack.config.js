const path = require("path");

const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const merge = require("webpack-merge");
const dev    = require('@isptutorproject/webpack-config/webpack.dev');
const prod   = require('@isptutorproject/webpack-config/webpack.prod');
const common = require("@isptutorproject/webpack-config/webpack.common");

let cfg = {
    entry: {
        "di-instr": './src/di-instr/index.js',
        dipretest: "./src/di-prepost/pretest.js",
        diposttest: "./src/di-prepost/posttest.js",
        dicrystal: "./src/di-prepost/crystal.js",
        rqintro: "./src/rq-intro/index.js",
        "sf-pretest":  "./src/sf-assessment/pretest.js",
        "sf-posttest": "./src/sf-assessment/posttest.js",
        // exp-design dev stuff
        algae:      "./src/exp-design/algae.js",
        balloon:    "./src/exp-design/balloon.js",
        crystals:   "./src/exp-design/crystals.js",
        greenhouse: "./src/exp-design/greenhouse.js",
        icemelting: "./src/exp-design/icemelting.js",
        ramps:      "./src/exp-design/ramps.js",
        sinking:    "./src/exp-design/sinking.js",
        soda:       "./src/exp-design/soda.js"

    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: "[name].bundle.js"
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: "[name].bundle.css"
        }),
    ]
}

let build;

if (process.env.NODE_ENV === "production") {
    console.log("using production");
    build = prod;
} else {
    console.log("using development");
    build = dev;
}

let merged = merge(cfg, common, build);

module.exports = merged;
