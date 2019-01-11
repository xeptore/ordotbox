'use strict';

const merge = require('webpack-merge');
const common = require('./webpack.common.js');
const path = require('path');

const webpack = require('webpack');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const WebpackVisualizerPlugin = require('webpack-visualizer-plugin');

const TemplateMeta = {
    viewport: { 'viewport': 'width=device-width, initial-scale=1, shrink-to-fit=no' },
    charset: { 'charset': 'UTF-8' }
};

// eslint-disable-next-line no-unused-vars
const minificationConfig = {
    collapseWhitespace: true,
    removeComments: true,
    removeScriptTypeAttributes: true,
    removeRedundantAttributes: true,
    removeStyleLinkTypeAttributes: true,
    useShortDoctype: true
};

module.exports = merge(common,
    {
        mode: 'production',
        output: {
            filename: path.join('[name].js')
        },
        module: {
            rules: [
                {
                    test: /\.jsx?/,
                    loader: 'babel-loader',
                    include: [
                        path.resolve(__dirname, 'src')
                    ]
                },
                {
                    test: /\.scss$/,
                    include: [
                        path.resolve(__dirname, 'src')
                    ],
                    use: [
                        {
                            loader: MiniCssExtractPlugin.loader
                        },
                        {
                            loader: 'css-loader',
                        },
                        {
                            loader: 'postcss-loader'
                        },
                        {
                            loader: 'resolve-url-loader',
                            options: {
                                keepQuery: true,
                                debug: true
                            }
                        },
                        {
                            loader: 'sass-loader',
                            options: {
                                outputStyle: 'compressed',
                                includePaths: [
                                    path.join(__dirname, 'node_modules')
                                ]
                            }
                        }
                    ]
                },
                {
                    test: /\.(woff|woff2|eot|ttf)$/,
                    loader: 'file-loader',
                    options: {
                        name: '[name].[ext]',
                        publicPath: '../assets/fonts',
                        outputPath: 'assets/fonts'
                    }
                }
            ]
        },
        optimization: {
            runtimeChunk: 'single',
            minimize: false,
            splitChunks: {
                name: true,
                cacheGroups: {
                    vendor: {
                        test: /[\\/]node_modules[\\/]/,
                        name: 'vendors',
                        chunks: 'all'
                    }
                }
            }
        },
        plugins: [
            new webpack.HashedModuleIdsPlugin(),
            new WebpackVisualizerPlugin({
                filename: path.join('stats', 'visualize.html')
            }),
            new BundleAnalyzerPlugin({
                analyzerMode: 'static',
                openAnalyzer: false,
                generateStatsFile: true,
                statsFilename: path.join('stats', 'stats.json'),
                reportFilename: path.join('stats', 'report.html')
            }),
            new UglifyJsPlugin({
                extractComments: /^\**|@preserve|@liscence|@cc_on/i,
                sourceMap: false,
                parallel: 7
            }),
            new CleanWebpackPlugin([path.resolve(__dirname, 'dist')], {
                verbose: true
            }),
            new MiniCssExtractPlugin({
                filename: '[name].style.css',
                chunkFilename: '[name].[contenthash].[hash].[chunkhash].css'
            }),
            new HtmlWebpackPlugin({
                template: path.resolve(__dirname, 'src', 'index.html'),
                filename: path.join('index.html'),
                chunks: ['main', 'vendors', 'runtime'],
                meta: TemplateMeta,
                minify: minificationConfig
            })
        ]
    }
);
