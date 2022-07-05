const HtmlWebpack           = require('html-webpack-plugin');
const MiniCssExtractPlugin  = require("mini-css-extract-plugin");
const CopyPlugin            = require("copy-webpack-plugin");
const MinimizerCssPlugin         = require("css-minimizer-webpack-plugin");
const TerserPlugin          = require("terser-webpack-plugin");
module.exports = {
    mode: 'production',
    output: {
        clean: true,
        filename: 'main.[contenthash].js'
    },
    module: {
        rules: [
            {
                test: /\.html$/,
                loader: 'html-loader',
                options: {
                    sources: false
                }

            },
            {
                test: /\.css$/,
                exclude: /style.css$/,
                use: ['style-loader','css-loader']
            },
            {
                test: /style.css$/,
                use: [MiniCssExtractPlugin.loader, "css-loader"],
            },
            {
                test: /\.(png|jp?g|gif)$/,
                loader: 'file-loader'
            },
            {
                test: /\.m?js$/,
                exclude: /node_modules/,
                use: {
                  loader: "babel-loader",
                  options: {
                    presets: ['@babel/preset-env']
                  }
                }
            }    
        ]
    },
    
    optimization:{
        minimize: true,
        minimizer: [
            new MinimizerCssPlugin(),
            new TerserPlugin(),
        ]
    },
    plugins:[
        new HtmlWebpack({
            title:  'Mi webpack app',
            template: './src/index.html'
        }),
        new MiniCssExtractPlugin({
            filename: '[name].[fullhash].css'
        }),
        new CopyPlugin({
            patterns:[
                { from: 'src/assets/', to: 'assets/' }
            ]
        }),
    ]
}