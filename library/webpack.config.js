const path = require('path');

module.exports = {
    mode: 'production',
    entry: {
        library: './src/js/index.js'
    },
    output: {
        filename: '[name].js',
        path: path.resolve(__dirname, 'dist'),
        library: 'library', // 意思就是把library这个库挂在的library的全局对象上 这种方式使用在 <script src="./library"></script>的方式引用， 这样的话，就可以直接使用library.math.add 的方法
        libraryTarget: 'umd', // 不管你是在AMD (require(['library'], function(){})) 还是CMD (const library = require("library")) 或者是ES 都可以使用 import library from 'library'
        // libraryTarget: 'this', // 这行代码就是相当于把library挂在到this上面
    },
    module: {

    },
    plugins: [

    ],
    externals: ['lodash'], // 打包的时候不把第三方库lodash打包进去，但是如果要用这个库要自己引用lodash的库
}