const loaderUtils = require('loader-utils');

module.exports = function(source) {
    // console.log('this', this.query, source)

    const options = loaderUtils.getOptions(this); // 借助loaderUtils 可以直接通过options获取this下的内容

    // 如果loader 中有异步操作,要调用这个方法 this.async();
    const callback = this.async();
    setTimeout(() => {
        const result =  source.replace(/Hadwin/g, `hello ${options.name} async`);
        callback(null, result);
        // return result;
        // this.callback(null, result);
    }, 5000)
    
}

// callback(
//     err: Error | null,
//     content: string | Buffer,
//     sourceMap?: sourceMap,
//     meta?: any
// )