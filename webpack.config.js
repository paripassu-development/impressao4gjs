var path = require("path");
var ExtractTextPlugin = require("extract-text-webpack-plugin");

module.exports = {
    entry: "./www/index.ts",
    output: {
        filename: "bundle.js",
        path: path.resolve("target/dist")
    },
    module: {
        rules: [
            {
                enforce: 'pre',
                test: /\.js$/,
                loader: "source-map-loader"
            },
            {
                enforce: 'pre',
                test: /\.tsx?$/,
                use: "source-map-loader"
            },

            {
                test: /\.jsx?$/,
                include: [
                    path.resolve("www")
                ],

                loader: "babel-loader",
            },
            {
                test: /\.tsx?$/,
                loader: 'ts-loader',
                exclude: /node_modules/,
            },
            {
                test: /\.svg$/,
                include: [
                    path.resolve(__dirname, "www/assets/images")
                ],
                loader: "file-loader",
                options: {
                    name: "images/[name]--[hash].[ext]"
                }
            },
            {//fonts
                test: /\.(eot|otf|svg|ttf|woff2?)($|\?)/,
                loader: "file-loader",
                options: {
                    name: "fonts/[name]--[hash].[ext]",
                    outputPath: path.resolve("target/dist/assets")
                }
            },
            {
                test: /\.(otf|js|bin?)($|\?)/,
                loader: "file-loader",
                include: [
                    path.resolve("node_modules/bwip-js/fonts")
                ]
            },
            {
                test: /\.html$/,
                loader: "file-loader",
                options: {
                    name: "[name].[ext]",
                    outputPath: path.resolve("target/dist")
                }
            },
            {
                test: /\.css$/,
                loader: ExtractTextPlugin.extract({
                    loader: "css-loader"
                })
            }

        ],
    },
    resolve: {
        extensions: [".tsx", ".ts", ".js"],
        modules: [
            "node_modules",
            "target/build"
        ]
    },
    plugins: [
        new ExtractTextPlugin({ filename: 'bundle.css', disable: false, allChunks: true })
    ],

    devServer: {
        contentBase: path.resolve("target/dist"),
        compress: true,
        port: 8086
    },
    devtool: "source-map"
};