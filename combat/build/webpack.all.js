const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
// html-webpack-plugin插件的作用，在打包结束之后，会自动生成一个HTML文件，并把生成的js文件自动引入到HTML中
const {
    CleanWebpackPlugin
} = require('clean-webpack-plugin')
// clean-webpack-plugin  在打包之前先删除要输出的文件，然后在创建

const MiniCssExtractPlugin = require('mini-css-extract-plugin'); // css 代码分割模块
const OptimizaCssAssetsWebpackPlugin = require('optimize-css-assets-webpack-plugin'); // css 代码合并压缩插件

const webpack = require('webpack');

module.exports = {
    mode: 'development',
    devtool: 'cheap-module-eval-source-map', // 关闭sourceMap功能， 生产环境会自动加上，（把’none'改成‘source-map‘就可以了)
    entry: {
        main: './src/js/index.js',
    },
    output: {
        // publicPath: 'https://cdn.com/', // 配置输出公共路径
        // publicPath: '/',
        filename: '[name].js', // 之间引入的名字会走filename的文件名(如main)main.js
        chunkFilename: '[name].js', // 间接引入的文件走chunkFileName vendors-lodash_chunk.js
        path: path.resolve(__dirname, '../dist')
    },
    module: {
        rules: [{
                test: /\.js$/,
                exclude: /node_modules/,
                use: [{
                        loader: 'babel-loader',
                        // babel里面配置的内容非常多的时候，就会显得webpack.config.js文件特别难以维护，因此可以将babel相关的配置放在.babelrc中 (.babelrc 中不能写注释)
                        options: {
                            // 如果写的是业务代码，配合@babel/polyfill 使用就好
                            presets: [
                                ['@babel/preset-env', {
                                    targets: {
                                        chrome: "67", // chrome 版本大于67，就不用使用@babel/preset-env 将es6 的语法转成es5的语法了，因为这些版本已经对es6的语法支持非常好了
                                    },
                                    useBuiltIns: 'usage', // 在低版本浏览器中,使用@babel/polyfill做兼容转换的时候，只把需要做兼容的部分打包进来，这样做的优势可以是打包后的包更小 (如果加了useBuiltIns 的配置项，业务代码中就不用引入@babel/polyfil，这个配置项会自动帮我们加上)
                                }],
                                '@babel/preset-react',
                            ],

                            // 如果写的是库相关的业务代码的话，要使用@babel/plugin-transform-runtime这个插件，这个插件的好处，可以有效的避免polyfill的问题，（polifill 会污染环境）@babel/plugin-transform-runtime 会以闭包的形式注入
                            // plugins: [['@babel/plugin-transform-runtime', {
                            //     'corejs': 2, // corejs 默认是false，我们一般配置成2 (当页面上不存在一些es6语法的时候才会打包的我们main.js中)
                            //     'helpers': true, // 
                            //     'regenerator': true, // 
                            //     'useESModules': false, // 
                            // }]]

                            plugins: ["@babel/plugin-syntax-dynamic-import"]
                        }
                    },
                    {
                        loader: 'imports-loader?this=>window', // 将模块this执行window的配置
                    },
                ],
            },
            {
                test: /\.(jpeg|jpg|png|gif|svg)$/,
                use: {
                    loader: 'url-loader',
                    options: {
                        name: '[name]_[hash].[ext]', // 设置打包出来的静态资源文件名不变
                        outputPath: 'images/', // 把静态资源打包到指定的文件夹中
                        limit: 2048, // (单位是kb) 当图片字段小于2048个字节的时候打包成base64,如果大于的话，就会打包到images文件夹下
                    }
                },

            },
            {
                test: /\.(css|scss|less)$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    {
                        loader: 'css-loader',
                        options: {
                            importLoaders: 2, // 例如indes.scss 中通过@import又引入其他scss 文件，如果没有这个属性配置的话，后面引入的那个scss文件只会被css-loader 和style-loader 所转换，这样就会存在问题，（如果加上importLoaders:2, 意思就是在引入之前也会走scss-loader  和 postcss-loader
                            // modules: true, // 开启css的模块化打包，各模块之间样式互补影像
                        }
                    },
                    'sass-loader',
                    'postcss-loader', // 浏览器前缀
                ]
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
        // new HtmlWebpackPlugin(
        //     {
        //         template: './src/page/font.html', //指定要打包的html路径和文件名
        //         filename:'./font.html' //指定输出路径和文件名
        //     }
        // ),

        new webpack.HotModuleReplacementPlugin(),
        new webpack.ProvidePlugin({
            $: 'jquery', // 当发现模块中有$关键字的时候，会自动的引入jquery模块
        }),
        new MiniCssExtractPlugin({
            filename: '[name].css',
            chunkFilename: '[name].chunk.css'
        }),
    ],
    devServer: {
        contentBase: './dist',
        open: true, // 是否自动打开网页
        port: '8081', // 配置端口号
        hot: true,
        hotOnly: true, // 即便是html的值没有生效，也不让浏览器重新刷新 (修改样式不重新刷新页面)
        // proxy: { // 配置代理
        //     '/api': 'http://localhost:3000'
        // }
    },

    optimization: {
        runtimeChunk: { // 使用[contenthash] 低版本的不支持，加上runtimechunk配置就可以了，新版本的webpack也不会影响， 会生成一个runtime的文件
            name: 'runtime'
        },
        usedExports: true, // tree shaking 在development 环境下默认是不支持tree shaking的功能，如果要想使用，需要加上如下配置
        minimizer: [ // css 代码压缩合并配置
            new OptimizaCssAssetsWebpackPlugin({})
        ],
        splitChunks: {
            chunks: 'all',
            minSize: 30000,
            maxSize: 0,
            minChunks: 1,
            maxAsyncRequests: 6,
            maxInitialRequests: 4,
            automaticNameDelimiter: '~',
            cacheGroups: {
                vendors: {
                    test: /[\\/]node_modules[\\/]/,
                    priority: -10
                },
                default: {
                    priority: -20,
                    reuseExistingChunk: true
                }
            }
        }

    }

}