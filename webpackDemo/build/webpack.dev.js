
const webpack = require('webpack');

const devConfig =  {
    mode: 'development',
    devtool: 'cheap-module-eval-source-map', // 关闭sourceMap功能， 生产环境会自动加上，（把’none'改成‘source-map‘就可以了)
    output: {
        filename: '[name].js',
        chunkFilename: '[name].chunk.js',
    },
    module: {
       rules: [
        {
            test: /\.(css|scss|less)$/,
            use: [
                'style-loader',
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
        new webpack.HotModuleReplacementPlugin(),
    ],
    devServer: {
        contentBase: './dist',
        open: true,
        port: '8081',
        hot: true,
        // hotOnly: true,
        // proxy: { 
        //     '/api': 'http://localhost:3000'
        // }
    },
}

module.exports = devConfig;