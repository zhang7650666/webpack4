
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizaCssAssetsWebpackPlugin = require('optimize-css-assets-webpack-plugin');
const prodConfig =  {
    mode: 'production',
    devtool: 'cheap-module-source-map',
    output: {
        filename: '[name].[contenthash].js',
        chunkFilename: '[name].[contenthash].js',
    }, 
    module: {
        rules:[
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
        ]
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: '[name].css',
            chunkFilename: '[name].chunk.css'
        }),
    ],
    optimization:{
        runtimeChunk: {
            name: 'runtime'
        },
        minimizer: [
            new OptimizaCssAssetsWebpackPlugin({})
        ]
    }
}

module.exports = prodConfig;