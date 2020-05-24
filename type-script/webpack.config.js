const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
module.exports = {
    mode: 'production',
    entry:{
        main: './src/js/index.ts',
    },
    output: {
       filename: '[name].js',
       path: path.resolve(__dirname, 'dist')
    },
    module:{
        rules: [
            {
                test: /\.ts$/,
                use: {
                    loader: 'ts-loader',
                },
                exclude: /node_modules/,
            }
        ]
    },
    plugins: [
        new CleanWebpackPlugin({}),
        new HtmlWebpackPlugin({
            template: './src/index.html',
            filename: 'index.html'
        })
    ],
}