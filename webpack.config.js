//@ts-check
/* eslint-disable @typescript-eslint/no-var-requires */
const webpack = require("webpack");
const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const TerserPlugin = require("terser-webpack-plugin");
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const VueLoaderPlugin = require("vue-loader/lib/plugin");
const ImageminPlugin = require("imagemin-webpack");
const imageminGifsicle = require("imagemin-gifsicle");
const imageminJpegtran = require("imagemin-jpegtran");
const imageminOptipng = require("imagemin-optipng");
const imageminSvgo = require("imagemin-svgo");
/* eslint-enable */

const plugins = mode => {
    let plugins = [
        new MiniCssExtractPlugin({
            filename: "[name].css",
            chunkFilename: "[id].css"
        }),
        new VueLoaderPlugin(),
        new ImageminPlugin({
            loader: mode === "production",
            bail: false,
            cache: true,
            filter: src => src.byteLength >= 8192,
            imageminOptions: {
                plugins: [
                    imageminGifsicle({
                        interlaced: true
                    }),
                    imageminJpegtran({
                        progressive: true
                    }),
                    imageminOptipng({
                        optimizationLevel: 5
                    }),
                    imageminSvgo({
                        //@ts-ignore
                        cleanupAttrs: true,
                        removeViewBox: true
                    })
                ]
            }
        })
    ];

    const createHtml = (template, filename, title = "siky.jp") => {
        plugins = plugins.concat([
            new HtmlWebpackPlugin({
                template,
                filename,
                title,
                prod: mode === "production",
                minify:
                /* eslint-disable prettier/prettier */
                    mode === "production"
                        ? {
                            sortAttributes: true,
                            sortClassName: true,
                            collapseWhitespace: true
                        }
                        : false
                        /* eslint-enable */
            })
        ]);
    };

    createHtml("./src/index.ejs", "index.html");
    createHtml("./src/404.ejs", "404.html", "Not Found (404) - siky.jp");

    if (mode === "production") {
        plugins = plugins.concat([
            new webpack.optimize.AggressiveMergingPlugin()
        ]);
    }

    return plugins;
};

const ip = () => {
    const ni = require("os").networkInterfaces();
    if (ni.hasOwnProperty("eth0")) {
        for (const i in ni.eth0) {
            if (ni.eth0[i].family === "IPv4") {
                return ni.eth0[i].address;
            }
        }
    } else if (ni.hasOwnProperty("wlan0")) {
        for (const i in ni.wlan0) {
            if (ni.wlan0[i].family === "IPv4") {
                return ni.wlan0[i].address;
            }
        }
    } else if (ni.hasOwnProperty("en1")) {
        for (const i in ni.en1) {
            if (ni.en1[i].family === "IPv4") {
                return ni.en1[i].address;
            }
        }
    }
    return "localhost";
};

module.exports = (mode = "development") => ({
    mode,
    target: "web",
    watch: mode === "development",

    entry: {
        index: ["./src/script/index.ts"]
    },
    output: {
        filename: "[name].js",
        chunkFilename: "[name].bundle.js",
        jsonpFunction: "vendor",
        path: path.resolve(__dirname, "Sotalbireo.github.io")
    },
    module: {
        rules: [
            {
                test: /\.(jpg|png|svg)$/,
                loader: "file-loader",
                options: {
                    name: "[path][sha1:hash:base64:9999].[ext]"
                }
            },
            {
                test: /\/[^_]+?\.sass$/,
                use: [
                    mode === "production"
                        ? "vue-style-loader"
                        : MiniCssExtractPlugin.loader,
                    {
                        loader: "css-loader",
                        options: {
                            importLoaders: 2,
                            modules: false,
                            sourceMap: mode === "development"
                        }
                    },
                    {
                        loader: "postcss-loader",
                        options: {
                            ident: "postcss",
                            plugins: [
                                require("css-mqpacker")(),
                                require("postcss-preset-env")(),
                                require("css-declaration-sorter")({
                                    order: "smacss"
                                }),
                                require("cssnano")()
                            ],
                            sourceMap: mode === "development"
                        }
                    },
                    {
                        loader: "sass-loader",
                        options: {
                            fiber: require("fibers"),
                            implementation: require("sass"),
                            indentedSyntax: true,
                            sourceMap: mode === "development"
                        }
                    }
                ]
            },
            {
                enforce: "pre",
                test: /\.ts$/,
                loader: "eslint-loader",
                exclude: /node_modules/,
                options: {
                    fix: true,
                    quiet: true
                }
            },
            {
                test: /\.ts$/,
                loader: "ts-loader",
                exclude: [/node_modules/, /\.d\.ts$/],
                options: {
                    appendTsSuffixTo: [/\.vue$/]
                }
            },
            {
                test: /\.vue$/,
                loader: "vue-loader"
            },
            {
                test: /\.html$/,
                loader: "html-loader",
                options: {
                    sortAttributes: mode === "production",
                    sortClassName: mode === "production",
                    collapseWhitespace: mode === "production"
                }
            }
        ]
    },
    resolve: {
        modules: [path.resolve(__dirname, "src"), "node_modules"],
        extensions: [".ts", ".vue", ".js"],
        alias: {
            "@": path.resolve(__dirname, "src"),
            vue:
                mode === "production"
                    ? "vue/dist/vue.min.js"
                    : "vue/dist/vue.esm.js"
        }
    },
    plugins: plugins(mode),
    devServer: {
        host: ip(),
        hot: true,
        inline: true,
        port: 8080,
        progress: true,
        contentBase: path.resolve(__dirname, "src")
    },
    devtool: mode === "production" ? "" : "inline-source-map",
    optimization: {
        minimizer: [
            new TerserPlugin({
                cache: true,
                parallel: true,
                sourceMap: mode === "development",
                terserOptions: {
                    ecma: 7
                }
            }),
            new OptimizeCSSAssetsPlugin({})
        ]
    }
});
