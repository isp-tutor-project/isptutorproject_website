const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
    module: {
        rules: [
            {
                test: /\.css$/, 
                use: [
                    MiniCssExtractPlugin.loader,
                    'css-loader'
                ]
            },
            {
                test: /\.(png|jpg)$/,
                use: ['file-loader']
            }
        ]
    }
};

// {
//     test: /\.js$/,
//     include: [__dirname, path.resolve("../../common")],
//     exclude: /node-modules/,
//     use: ['babel-loader']
// },
