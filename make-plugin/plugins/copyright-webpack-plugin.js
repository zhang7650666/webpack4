class CopyrightWebpackPlugin {
    constructor(options) {
        console.log(options)
    }

    apply(compiler){
        // compiler 相当于webpack 实例
        // console.log('compiler', compiler.hooks)
        compiler.hooks.emit.tapAsync('CopyrightWebpackPlugin', (compilation, cb) => {
            // compilation 存放打包后生成的内容
            compilation.assets['copyright.txt'] = {
                source: function() {
                    return 'Hadwin'
                },
                size: function() {
                    return 6;
                }
            }
            cb();
        })
        compiler.hooks.compile.tap('CopyrightWebpackPlugin', (compilation) => {
            console.log('同步', compilation);
        })
    }
}

module.exports = CopyrightWebpackPlugin;