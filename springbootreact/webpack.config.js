module.exports = {
    entry: {
        antdTableCtrl: "./src/main/web/scripts/antdTableCtrl.js",
        helloWorldCtrl: "./src/main/web/scripts/helloWorldCtrl.js",
        dataFromServerCtrl: "./src/main/web/scripts/dataFromServerCtrl.js"
    },
    output: {
        filename: "target/classes/static/scripts/[name].bundle.js",
        chunkFilename: "[id].bundle.js"
    },
    devtool:'source-map',
    module: {
        loaders: [
            {
                test: /\.jsx?$/,
                exclude: /(node_modules|bower_components)/,
                loader: 'babel-loader',
                query: {
                    presets: ['react', 'es2015']
                }
            }
        ]
    }
};