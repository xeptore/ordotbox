'use strict';

const merge = require('webpack-merge');
const common = require('./webpack.common.js');
const webpack = require('webpack');
const path = require('path');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const WriteFilePlugin = require('write-file-webpack-plugin');

const TemplateMeta = {
    viewport: {
        viewport: 'width=device-width, initial-scale=1, shrink-to-fit=no'
    },
    charset: {
        'charset': 'UTF-8'
    }
};

module.exports = merge(common,
    {
        mode: 'development',
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
                            loader: 'style-loader',
                            options: {
                                sourceMap: true
                            }
                        },
                        {
                            loader: 'css-loader',
                            options: {
                                camelCase: true,
                                sourceMap: true
                            }
                        },
                        {
                            loader: 'postcss-loader',
                            options: {
                                sourceMap: true
                            }
                        },
                        {
                            loader: 'resolve-url-loader',
                            options: {
                                sourceMap: true,
                                keepQuery: true,
                                debug: true
                            }
                        },
                        {
                            loader: 'sass-loader',
                            options: {
                                sourceComments: true,
                                sourceMap: true,
                                sourceMapContents: true,
                                outputStyle: 'expanded',
                                includePaths: [
                                    './node_modules'
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
        devtool: 'source-map',
        plugins: [
            new CleanWebpackPlugin([path.resolve(__dirname, 'dist')]),
            new webpack.HashedModuleIdsPlugin(),
            new HtmlWebpackPlugin({
                template: path.resolve(__dirname, 'src', 'index.html'),
                filename: path.join('index.html'),
                chunks: ['main'],
                meta: TemplateMeta
            }),
            new BundleAnalyzerPlugin({
                openAnalyzer: false
            }),
            new WriteFilePlugin()
        ],
        devServer: {
            contentBase: './dist',
            port: 8080,
            open: true
        }
    }
);
