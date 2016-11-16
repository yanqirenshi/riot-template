var path = require('path');

module.exports = {
    context: __dirname + '/src',

    entry: {
        javascript: __dirname + '/src/index.js',
        html: __dirname + '/src/index.html'
    },

    output: {
        path: __dirname + '/dist',
        filename: 'bundle.js'
    },

    // Configuration for dev server
    devServer: {
        contentBase: 'dist',
        port: 8080
    },

    module: {
        loaders: [
            { // file-loader で *.html を /dist にコピーする。
                test: /\.html$/,
                loader: "file?name=[name].[ext]"
            },
            { // *.js を bundle.js にビルド
                test: /\.js$/,
                loader: 'babel-loader',
                exclude: /node_modules/,
                query: {
                    presets: ['es2015']
                }
            },
            { // *.tag を bundle.js にビルド
                test: /\.tag$/,
                loader: 'tag',
                exclued: /node_modules/
            }
        ]
    }
};
