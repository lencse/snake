import * as path from 'path'
import * as commandLineArgs from 'command-line-args'
import * as HtmlWebpackPlugin from 'html-webpack-plugin'
import * as ExtractTextWebpackPlugin from 'extract-text-webpack-plugin'
import * as UglifyjsWebpackPlugin from 'uglifyjs-webpack-plugin'
import * as OptimizeCssAssetsWebpackPlugin from 'optimize-css-assets-webpack-plugin'
import * as cssnano from 'cssnano'
import * as CopyWebpackPlugin from 'copy-webpack-plugin'
import dirs from './dirs'

interface Config {
    plugins: any[]
    fileNames: {
        js: string,
        css: string
    },
    loaders: any[],
    devServer: any
}

interface Configs {
    dev: Config,
    watch: Config
    prod: Config
}

const options = commandLineArgs([{
    name: 'open',
    alias: 'o',
    type: Boolean,
    defaultValue: false
}], {partial: true})

const mode = options.open
    ? 'watch'
    : process.env.NODE_ENV === 'production'
        ? 'prod'
        : 'dev'

const config: Configs = {
    dev: {
        plugins: [],
        fileNames: {
            js: '[name].js',
            css: '[name].css'
        },
        loaders: [],
        devServer: {}
    },
    prod: {
        plugins: [
            new UglifyjsWebpackPlugin(),
            new OptimizeCssAssetsWebpackPlugin({
                cssProcessor: cssnano,
                cssProcessorOptions: {
                    discardComments: {
                        removeAll: true
                    }
                },
                uglifyOptions: {
                    output: {
                        comments: false
                    }
                }
            })
        ],
        fileNames: {
            js: '[name].[hash].js',
            css: '[name].[contentHash].css'
        },
        loaders: [],
        devServer: {}
    },
    watch: {
        plugins: [],
        fileNames: {
            js: '[name].js',
            css: '[name].css'
        },
        loaders: [],
        devServer: {
            contentBase: `./${dirs.dist}`
        }
    }
}

const effective = config[mode]

module.exports =  {
    entry: [
        `./${dirs.build}/main.js`,
        `./${dirs.styles}/main.scss`
    ],
    output: {
        path: path.resolve(dirs.projectRoot, dirs.dist),
        filename: `js/${effective.fileNames.js}`
    },
    module: {
        loaders: effective.loaders.concat([
            {
                test: /\.css$/,
                loader: ExtractTextWebpackPlugin.extract({
                    fallback: 'style-loader',
                    use: 'css-loader?url=false'
                })
            }, {
                test: /\.scss$/,
                loader: ExtractTextWebpackPlugin.extract({
                    fallback: 'style-loader',
                    use: 'css-loader?url=false!sass-loader'
                })
            }, {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'babel-loader'
            }, {
                test: /\.(png|svg|jpg|gif)$/,
                loader: 'file-loader'
            }
        ])
    },
    plugins: effective.plugins.concat([
        new HtmlWebpackPlugin({
            template: `${dirs.views}/index.ejs`,
            filename: 'index.html',
            inject: 'body'
        }),
        new ExtractTextWebpackPlugin(`css/${effective.fileNames.css}`)
        // ,new CopyWebpackPlugin([{
        //     from: `img`,
        //     to: 'img'
        // }])
    ]),
    devServer: effective.devServer
}
