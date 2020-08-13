const path = require('path');

module.exports = [
    'source-map'
].map(devtool => ({
    mode: 'development',
    entry: './src/index.js',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'isp-api.js',
        library: "ISP_API",
        libraryTarget: "var"
    },
    devtool
}));