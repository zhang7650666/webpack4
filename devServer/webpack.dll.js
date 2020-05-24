const path = require("path");
const webpack = require('webpack');

module.exports = {
    mode: "production",
    entry: {
        vendors: ['lodash'],
        react: ['react', 'react-dom'],
        jquery: ['jquery'],
    },
    output: {
        filename: '[name].dll.js',
        path: path.resolve(__dirname, 'dll'),
        library: '[name]', // 把打包生成的库文件用vendors作为全局变量输出出去
    },
    plugins: [
        new webpack.DllPlugin({
            name: '[name]', // 要对那个文件进行分析，这name指的是vendors
            path: path.resolve(__dirname, './dll/[name].mainfest.json'), // 分析的结果生成一个映射文件
        })
    ]
}