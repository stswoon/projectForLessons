module.exports = {
    entry: {
        simpleTest: "./src/test/web/simpleTest.jsx"
    },
    output: {
        filename: "target/test/[name].bundle.js",
        chunkFilename: "[id].bundle.js"
    },
    devtool: "source-map",
    module: {
        loaders: [
            {
                test: /\.jsx?$/,
                exclude: /(node_modules|bower_components)/,
                loader: "babel-loader",
                query: {
                    presets: ["react", "es2015"]
                }
            }
        ]
    }
};