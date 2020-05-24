const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const {
    CleanWebpackPlugin
} = require('clean-webpack-plugin');

const webpack = require('webpack');
const merge = require('webpack-merge');
const devConfig = require('./webpack.dev');
const prodConfig = require('./webpack.prod');

const baseConfig = {
    entry: {
        main: './src/js/index.js',
    },
    output: {
        filename: '[name].js',
        chunkFilename: '[name].chunk.js',
        path: path.resolve(__dirname, '../dist')
    },
    module: {
        rules: [{
                test: /\.js$/,
                exclude: /node_modules/,
                use: [{
                        loader: 'babel-loader',
                        options: {
                            presets: [
                                ['@babel/preset-env', {
                                    targets: {
                                        chrome: "67",
                                    },
                                    useBuiltIns: 'usage',
                                }],
                                '@babel/preset-react',
                            ],
                        }
                    }
                ],
            },
            {
                test: /\.(jpeg|jpg|png|gif|svg)$/,
                use: {
                    loader: 'url-loader',
                    options: {
                        name: '[name]_[hash].[ext]',
                        outputPath: 'images/',
                        limit: 2048,
                    }
                },
            },
            {
                test: /\.(eot|woff|ttf|svg)$/,
                use: {
                    loader: 'file-loader'
                },
            }
        ]
    },
    plugins: [
        new CleanWebpackPlugin(),
        new HtmlWebpackPlugin({
            template: './src/page/index.html', //指定要打包的html路径和文件名
            filename: './index.html' //指定输出路径和文件名
        }),
        new webpack.ProvidePlugin({
            $: 'jquery', // 当发现模块中有$关键字的时候，会自动的引入jquery模块
        }),
    ],
    optimization: {
        usedExports: true,
        splitChunks: {
            chunks: 'all',
        }
    }
}

module.exports = (env) => {
    if (env && env.production) {
        return merge(baseConfig, prodConfig);
    } else {
        return merge(baseConfig, devConfig);
    }
}