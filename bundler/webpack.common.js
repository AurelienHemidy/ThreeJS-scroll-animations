const CopyWebpackPlugin = require('copy-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCSSExtractPlugin = require('mini-css-extract-plugin')
const path = require('path')

module.exports = {
    entry: path.resolve(__dirname, '../src/javascript/app.js'),
    output:
    {
        filename: 'bundle.[contenthash].js',
        path: path.resolve(__dirname, '../dist')
    },
    devtool: 'source-map',
    plugins:
    [
        new CopyWebpackPlugin({
            patterns: [
                { from: path.resolve(__dirname, '../static') }
            ]
        }),
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, '../src/index.html'),
            minify: true,
            favicon: path.resolve(__dirname, '../static/icons/favicon/favicon.png'),
            meta: {
                description: {
                    name: "description",
                    content: "This a small boilerplate to start projects"
                },
                og_title: {
                    property: "og:type",
                    content: "website"
                },
                og_description: {
                    property: "og:description",
                    content: "This a small boilerplate to start projects"
                },
                og_url: {
                    property: "og:url",
                    content: "http://localhost:8080"
                },
                og_image: {
                    property: "og:image",
                    content: path.resolve(__dirname, '../static/icons/favicon/favicon.png')
                },
                og_site_name: {
                    property: "og:site_name",
                    content: "Boilerplate - AH"
                },
                twitter_card: {
                    property: "twitter:card",
                    content: "summary"
                },
                twitter_creator: {
                    property: "twitter:creator",
                    content: "Aurélien Hémidy"
                },
                twitter_title: {
                    property: "twitter:title",
                    content: "Boilerplate - AH"
                },
                twitter_description: {
                    property: "twitter:description",
                    content: "This a small boilerplate to start projects"
                },

            }
        }),
        new MiniCSSExtractPlugin()
    ],
    module:
    {
        rules:
        [
            // HTML
            {
                test: /\.(html)$/,
                use: ['html-loader']
            },

            // JS
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use:
                [
                    'babel-loader'
                ]
            },

            // CSS
            {
                test: /\.s[ac]ss$/i,
                use:
                [
                    'style-loader',
                    {
                        loader: MiniCSSExtractPlugin.loader,
                        options: {
                            esModule: false,
                        },
                    },
                    'css-loader',
                    'sass-loader'
                ]
            },

            // Images
            {
                test: /\.(jpg|png|gif|svg)$/,
                use:
                [
                    {
                        loader: 'file-loader',
                        options:
                        {
                            outputPath: 'assets/images/'
                        }
                    }
                ]
            },

            // Fonts
            {
                test: /\.(ttf|eot|woff|woff2)$/,
                use:
                [
                    {
                        loader: 'file-loader',
                        options:
                        {
                            outputPath: 'assets/fonts/'
                        }
                    }
                ]
            }
        ]
    }
}
