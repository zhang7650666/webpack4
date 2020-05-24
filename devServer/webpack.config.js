const path = require('path');
const fs = require('fs')
const HtmlWebpackPlugin = require('html-webpack-plugin');
const {
    CleanWebpackPlugin
} = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin'); // css 代码分割模块
const OptimizaCssAssetsWebpackPlugin = require('optimize-css-assets-webpack-plugin'); // css 代码合并压缩插件
const webpack = require('webpack');
const AddAssetHtmlWebpackPlugin = require('add-asset-html-webpack-plugin');

function makePlugins(configs) {
    const plugins = [
        new CleanWebpackPlugin(),
        new MiniCssExtractPlugin({
            filename: '[name].css',
            chunkFilename: '[name].chunk.css'
        }),
        new webpack.HotModuleReplacementPlugin(),
        new webpack.ProvidePlugin({
            $: 'jquery',
        }),
        new MiniCssExtractPlugin({
            filename: '[name].css',
            chunkFilename: '[name].chunk.css'
        }),
    ]

    Object.keys(configs.entry).forEach((filename) => {
        plugins.push(
            new HtmlWebpackPlugin({
                template: './src/index.html',
                filename: `${filename}.html`,
                chunks: ['runtime', 'vendors~main', filename], // 需要加载的js 文件
            }),
        )
    })
    const files = fs.readdirSync(path.resolve(__dirname, './dll'));
    files.forEach((file) => {
        if (/.*\.dll.js/.test(file)) {
            plugins.push(
                new AddAssetHtmlWebpackPlugin({
                    filepath: path.resolve(__dirname, './dll/', file)
                })
            )
        }
        if (/.*\.mainfest.json/.test(file)) {
            plugins.push(
                new webpack.DllReferencePlugin({
                    manifest: path.resolve(__dirname, './dll/', file), // 把生成的映射文件引入进来，这样就不会加载相应的模块了
                })
            )
        }
    })
    return plugins;
}
    const configs = {
        mode: 'development',
        devtool: 'cheap-module-eval-source-map',
        entry: {
            main: './src/js/index.js',
            list: './src/js/list.js'
        },
        output: {
            filename: '[name].js',
            path: path.resolve(__dirname, 'dist')
        },
        resolve: {
            extensions: ['.js', '.jsx'], // 如果文件没有后缀名的话，会先查找当前目录下后缀名为.js 的文件，如果找不到再找已.jsx结尾的文件
            // mainFiles: ['index', 'child'], // 如果我们引入的路径为 './child/'文件夹，他会自动查找child文件夹下的index.js ，如果想让它在找不到index.js的情况下，再找child.js的话
            // alias: {
            //     hadwin: path.resolve(__dirname, '../src/js'),
            // }

        },
        module: {
            rules: [{
                    test: /\.jsx?$/,
                    exclude: /node_modules/,
                    use: [
                        'babel-loader',
                        'eslint-loader'
                    ]
                },
                {
                    test: /\.(css|less|scss|sass)$/,
                    use: [
                        MiniCssExtractPlugin.loader,
                        {
                            loader: 'css-loader',
                            options: {
                                importLoaders: 2,
                            }
                        },
                        'sass-loader',
                        'postcss-loader'
                    ]
                },
                {
                    test: /\.(jpeg|png|jpg|svg|gif)$/,
                    use: {
                        loader: 'url-loader',
                        options: {
                            filename: '[name].[hash].[ext]',
                            outputPath: '/static/img',
                            limit: 2048,
                        }
                    }
                },
                {
                    test: /\.(eot|woff|ttf|svg)$/,
                    use: {
                        loader: 'file-loader'
                    },
                }
            ]
        },
        // plugins: plugins,
        // [
        //     new CleanWebpackPlugin(),
        //     new HtmlWebpackPlugin({
        //         template: './src/index.html',
        //         filename: 'index.html'
        //     }),
        //     new MiniCssExtractPlugin({
        //         filename: '[name].css',
        //         chunkFilename: '[name].chunk.css'
        //     }),
        //     new webpack.HotModuleReplacementPlugin(),
        //     new webpack.ProvidePlugin({
        //         $: 'jquery',
        //     }),
        //     new MiniCssExtractPlugin({
        //         filename: '[name].css',
        //         chunkFilename: '[name].chunk.css'
        //     }),
        //     new AddAssetHtmlWebpackPlugin({
        //         filepath: path.resolve(__dirname, './dll/vendors.dll.js')
        //     }),
        //     new AddAssetHtmlWebpackPlugin({
        //         filepath: path.resolve(__dirname, './dll/react.dll.js')
        //     }),
        //     new webpack.DllReferencePlugin({
        //         manifest: './dll/vendors.mainfest.json', // 把生成的映射文件引入进来，这样就不会加载相应的模块了
        //     }),
        //     new webpack.DllReferencePlugin({
        //         manifest: './dll/react.mainfest.json', // 把生成的映射文件引入进来，这样就不会加载相应的模块了
        //     })

        // ],
        devServer: {
            contentBase: './dist',
            // open: true, // 是否自动打开网页
            port: '8081', // 配置端口号
            hot: true,
            // hotOnly: true, // 即便是html的值没有生效，也不让浏览器重新刷新 (修改样式不重新刷新页面)
            historyApiFallback: true, // 在开发react的项目的时候，例如我们要访问/list这样的一个路径回报404，是因为devserver 找的时候会认为/list是一个静态资源的页面,所以会报错
            proxy: { // 配置代理
                '/api/*': {
                    target: 'http://btest.shengpay.com/sdppro',
                    pathRewrite: {
                        '^/api': '/api',
                        'productSide': 'notice'
                    },
                    changeOrigin: true,
                    // secure: true, 
                }
            }
        },
        optimization: {
            runtimeChunk: {
                name: 'runtime'
            },
            usedExports: true,
            minimizer: [
                new OptimizaCssAssetsWebpackPlugin({})
            ],
            usedExports: true,
            splitChunks: {
                chunks: 'all',
            }

        }
    }

    configs.plugins = makePlugins(configs)
    module.exports = configs;