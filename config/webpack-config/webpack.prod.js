const webpack = require("webpack");

module.exports = {
    mode: 'production',
    devtool: 'source-map',
    plugins: [
        new webpack.EnvironmentPlugin({
            NODE_ENV: "production",
            DEBUG: false
        }),
    ]
};