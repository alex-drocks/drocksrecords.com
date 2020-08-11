const common = require("./webpack.common");
const path = require("path");
const {merge} = require("webpack-merge");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const {CleanWebpackPlugin} = require("clean-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const TerserPlugin = require('terser-webpack-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const ScriptExtHtmlWebpackPlugin = require("script-ext-html-webpack-plugin");


module.exports = merge(common, {
    mode: "production",
    output: {
        filename: "[contentHash].js",
        path: path.resolve(__dirname, "public")
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                use: [
                    MiniCssExtractPlugin.loader, //2. extract css into files
                    "css-loader" //1. turns css into common js
                ]
            },
        ]
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: "[contentHash].css"
        }),
        new CleanWebpackPlugin() //deletes old generated files before creating new ones
    ],
    optimization: {
        minimize: true,
        minimizer: [
            new TerserPlugin({ //minify js
                test: /\.js(\?.*)?$/i, // default
                // exclude: /\/lib/, // won't minify already minified files
                cache: true,
                parallel: true,
                sourceMap: false, // Must be set to true if using source-maps in production
                terserOptions: {
                    // https://github.com/webpack-contrib/terser-webpack-plugin#terseroptions
                    mangle: true,
                    extractComments:false,
                }
            }),
            new OptimizeCssAssetsPlugin(), // minify css
            new HtmlWebpackPlugin({
                filename: "index.html",
                template: "./src/index.html",
                chunks: ["index"],
                cache: true,
                inject: "head",
                scriptLoading: "defer",
                minify: {
                    collapseWhitespace: true,
                    removeAttributeQuotes: true,
                    removeComments: true,
                    removeRedundantAttributes: true,
                    removeScriptTypeAttributes: true,
                    removeStyleLinkTypeAttributes: true,
                    useShortDoctype: true
                }
            }),
            new ScriptExtHtmlWebpackPlugin({
                defaultAttribute: "defer"
            })
        ]
    }
});