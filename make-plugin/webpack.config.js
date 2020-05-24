const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyrightWebpackPlugin = require('./plugins/copyright-webpack-plugin')
const webpack = require('webpack');

module.exports = {
    mode: 'development',
    devtool: 'cheap-module-eval-source-map',
    entry: {
        main: './src/js/index.js'
    },
    output: {
        filename: '[name].js',
        path: path.resolve(__dirname, 'dist')
    },
    module: {
        rules: [
            {
                test: /\.js/,
                exclude: /node_modules/,
                use: [
                    {
                        loader: 'babel-loader'
                    }
                ]
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './src/index.html',
            filename: path.resolve(__dirname, 'dist', 'index.html'),
        }),
        new webpack.HotModuleReplacementPlugin(),
        new CopyrightWebpackPlugin({
            name: 'Hadwin'
        }),
    ],
    devServer: {
        contentBase: 'dist',
        // open: true,
        port: '8082', 
        hot: true,
    },
    // resolveLoader: { // 在加载loader的时候，首先从node_modules查找，如果找不到，然后在从loaders去找
    //     modules: ['node_modules'],
    // }
}