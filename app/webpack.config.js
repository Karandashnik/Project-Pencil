module.exports = {
    entry: "./public/javascripts/main.js",
    devtool: 'source-map',
    output: {
        path: __dirname,
        filename: "./public/javascripts/build/bundle.js"
    },
    resolve: {
        alias: {
            'handlebars': 'handlebars/runtime.js'
        }
    },
    resolveLoader: {
        alias: {
            'hbs': 'handlebars-loader'
        }
    },
    module: {
        loaders: [
            { test: /\.css$/, loader: "style!css" },
            { test: /\.hbs$/, loader: "handlebars-loader" }
        ]
    }
};