const webpack = require("webpack");

module.exports = {
    mode: 'development',
    devtool: 'inline-source-map',
    plugins: [
        new webpack.EnvironmentPlugin({
            NODE_ENV: "development",
            DEBUG: true
        }),
    ]
};