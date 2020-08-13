const path = require("path");

const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const merge = require("webpack-merge");
const dev    = require("@isptutorproject/webpack-config/webpack.dev");
const prod   = require("@isptutorproject/webpack-config/webpack.prod");
const common = require("@isptutorproject/webpack-config/webpack.common");

let cfg = {
    entry: {
        dipretest: "./src/pretest.js",
        diposttest: "./src/posttest.js",
        dicrystal: "./src/crystal.js"
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name].bundle.js'
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: "[name].bundle.css"
        }),
    ]
};

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
