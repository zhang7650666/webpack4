const path = require('path');

module.exports = {
    entry: './js/index.js',
    output: {
        filename: 'bundler.js',
        path: path.resolve(__dirname, 'pub')
    }
}