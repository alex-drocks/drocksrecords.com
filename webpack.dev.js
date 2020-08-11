const path = require("path");
const HtmlWebpackPlugin = require('html-webpack-plugin'); // generates stuff in html files
const {merge} = require("webpack-merge"); // joins what is shared by common config files
const common = require("./webpack.common");

module.exports = merge(common, {
    mode: "development",
    output: {
        filename: "[name]-dev.bundle.js",
        path: path.resolve(__dirname, "public")
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                use: [
                    "style-loader", //2. inject styles into the DOM
                    "css-loader" //1. turns css into common js
                ]
            },
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            filename: "index.html",
            template: "./src/index.html",
            chunks: ["index"],
            cache: true,
            minify: false
        }),
    ]
});