const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    mode: 'development',
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
                use: [
                    {
                        loader: path.resolve(__dirname, './loaders/replaceLoader.js'),
                        loader: 'replaceLoader.js',
                        options: {
                            name: 'Hadwin',
                            age: '30'
                        }
                    },
                    {
                        // loader: path.resolve(__dirname, './loaders/replaceLoaderAsync.js'),
                        loader: 'replaceLoaderAsync.js',
                        options: {
                            name: 'Hadwin',
                            age: '30'
                        }
                    }
                ]
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './src/index.html',
            filename: path.resolve(__dirname, 'dist', 'index.html'),
        })
    ],
    devServer: {
        contentBase: 'dist',
        open: true,
        port: '8082', 
        hot: true,
    },
    resolveLoader: { // 在加载loader的时候，首先从node_modules查找，如果找不到，然后在从loaders去找
        modules: ['node_modules', './loaders'],
    }
}