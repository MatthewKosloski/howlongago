import webpack from 'webpack';
import path, { resolve } from 'path';
import cssnano from 'cssnano';

import ExtractTextPlugin from 'extract-text-webpack-plugin';
import OptimizeCssAssetsPlugin from 'optimize-css-assets-webpack-plugin';
import BrowserSyncPlugin from 'browser-sync-webpack-plugin';
import HtmlWebpackPlugin from 'html-webpack-plugin';

const IS_DEV = process.env.NODE_ENV !== 'production';

const LOCAL_IDENT_NAME = IS_DEV 
    ? '[name]-scss__[local]-class___[hash:base64:2]' 
    : '[hash:base64:4]';

const globals = [
    resolve('./src/scss'), // global CSS classes
];

const cssModules = [
    resolve('./src/components'), // CSS modules
];

module.exports = {
    devtool: IS_DEV ? 'cheap-eval-source-map' : 'source-map',
    entry: {
        bundle: [
            './src/scss',
            './src/app.js'
        ]
    },
    output: {
        path: path.join(__dirname, 'public'),
        filename: IS_DEV ? 'js/[name].js' : 'js/[name].min.js'
    },
    module: {
        loaders: [
            {
                test: /\.js$/,
                exclude:  /node_modules/,
                loader: 'babel'
            },
            // loader for CSS modules
            {
                test: /\.s?css$/,
                loader:  ExtractTextPlugin.extract('style', `css?modules&localIdentName=${LOCAL_IDENT_NAME}!postcss!sass`),
                include: cssModules,
                exclude: globals
            },
            // loader for global styles
            {
                test: /\.s?css$/,
                loader:  ExtractTextPlugin.extract('style', 'css!postcss!sass'),
                include: globals,
                exclude: cssModules
            }
        ]
    },
    plugins: IS_DEV ? 
    [
        new ExtractTextPlugin('css/[name].css', {
            allChunks: true
        }),
        new HtmlWebpackPlugin({
            template: './src/index.html'
        }),
        new BrowserSyncPlugin(
            {
                host: 'localhost',
                port: 3000,
                proxy: 'http://localhost:8080/',
                open: false,
                ui: false
            },
            {
                reload: false
            }
        )
    ] : [
        new webpack.optimize.DedupePlugin(),
        new webpack.optimize.OccurenceOrderPlugin(),
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false
            }
        }),
        new ExtractTextPlugin('css/[name].min.css', {
            allChunks: true
        }),
        new OptimizeCssAssetsPlugin({
            assetNameRegExp: /\.css$/g,
            cssProcessor: cssnano,
            cssProcessorOptions: { 
                discardComments: {
                    removeAll: true 
                } 
            },
            canPrint: true
        }),
        new webpack.DefinePlugin({
            'process.env':{
                'NODE_ENV': JSON.stringify('production')
            }
        }),
        new HtmlWebpackPlugin({
            template: './src/index.html',
            minify: {
                collapseWhitespace: true
            }
        })
    ],
    resolve: {
        extensions: ['', '.js', '.css', '.scss'],
        alias: {
            bourbon: path.join(__dirname, '/node_modules/bourbon/app/assets/stylesheets/_bourbon.scss'),
            normalize: path.join(__dirname, 'node_modules/normalize.css/normalize.css'),
            typi: path.join(__dirname, 'node_modules/typi/scss/_typi.scss'),
            abstracts: path.join(__dirname, 'src/scss/abstracts/_index.scss')
        }
    },
    devServer: {
        contentBase: './public',
        noInfo: true,
        hot: false
    }
};