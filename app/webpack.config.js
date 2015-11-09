module.exports = {
    entry: "./public/javascripts/main.js",
    output: {
        path: __dirname,
        filename: "./public/javascripts/build/bundle.js"
    },
    module: {
        loaders: [
            { test: /\.css$/, loader: "style!css" }
        ]
    }
};