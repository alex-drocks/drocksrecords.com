module.exports = {
    entry: {
        index: "./src/index.js",
        aide: "./src/csv/aide.js",
        csv: "./src/csv/csv.js",
        nouvelles: "./src/nouvelles/nouvelles.js",
    },
    module: {
        rules: [
            {
                test: /\.html$/,
                use: ["html-loader"]
            },
            {
                test: /\.ico$/,
                use: {
                    loader: "file-loader",
                    options: {
                        name: "[name].[ext]",
                        outputPath: "./"
                    }
                }
            },
            {
                test: /\.(gif|png|jpe?g|svg)$/i,
                use: [
                    'file-loader?name=[name].[ext]&outputPath=images',
                    {
                        loader: 'image-webpack-loader',
                        options: {
                            mozjpeg: {
                                progressive: true,
                                quality: 75
                            },
                            pngquant: {
                                quality: [0.75, 0.90],
                                speed: 1,
                            },
                            gifsicle: {
                                interlaced: false,
                            },
                        }
                    },
                ],
            },
            {
                test: /site\.webmanifest$/,
                use: {
                    loader: "file-loader",
                    options: {
                        name: "[name].[ext]",
                        outputPath: "./"
                    }
                }
            }
        ]
    }
};