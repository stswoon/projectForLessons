const HtmlWebpackPlugin = require("html-webpack-plugin");
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const webpack = require("webpack");
const path = require("path");

const prod = process.env.NODE_ENV === "production";
const cssDev = ["style-loader", "css-loader", "less-loader"];
//     [{
//         loader: "style-loader" // creates style nodes from JS strings
//     }, {
//         loader: "css-loader" // translates CSS into CommonJS
//     }, {
//         loader: "less-loader" // compiles Less to CSS
//     }]
const cssProd = ExtractTextPlugin.extract({
    fallback: "style-loader",
    use: ["css-loader", "less-loader"]
    //publicPath: "/dist"
});
const cssConfig = prod ? cssProd : cssDev;

//todo: pretty bundle in dev, source maps

//https://github.com/jantimon/html-webpack-plugin#configuration
module.exports = {
    entry: {
        app: "./src/index.js",
        admin: "./src/admin.js" //todo: css bundle
    },
    output: {
        // libraryTarget: "umd"
        //path: __dirname + "/dist",
        path: path.resolve(__dirname, "dist"),
        filename: "[name].bundle.js"
    },
    module: {
        rules: [
            // {test: /\.css$/, use: ["style-loader", "css-loader"]},
            {
                test: /\.less$/,
                //exclude: /node_modules/,
                use: cssConfig
            },
            {
                test: /\.js$/,
                exclude: /node_modules/, //exactly without quotes
                use: "babel-loader"
            }
        ]
    },
    //https://webpack.js.org/configuration/dev-server/#devserver
    devServer: {
        contentBase: path.join(__dirname, "dist"),
        compress: true,
        port: 9000,
        stats: "errors-only", //"normal" or "verbose"
        hot: true
        //https, colors, hot, overlay (for errors), proxy for backend, progress, setup (for express and backe emulation)
        //watchContentBase to watch, watchOptions: polling
    },
    plugins: [
        new HtmlWebpackPlugin({
            filename: "index.html",
            template: "./src/index.html",
            excludeChunks: ["admin"]
            //favicon, minify, hash, cache, showErrors
        }),
        new ExtractTextPlugin({
            filename: "main.css",
            disable: !prod//,
            //excludeChunks: ["admin"] //todo
        }),
        new HtmlWebpackPlugin({
            filename: "admin.html",
            template: "./src/admin.html",
            chunks: ["admin"]
        }),
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NamedModulesPlugin()
    ]
};