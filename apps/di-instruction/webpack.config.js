const path = require("path");

const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const merge = require("webpack-merge");
const dev    = require('../../config/webpack.dev');
const prod   = require('../../config/webpack.prod');
const common = require("../../config/webpack.common");

let cfg = {
    entry: {
        "di-instruction": './src/index.js',
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: "[name].bundle.js"
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: "di-instruction.bundle.css"
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
