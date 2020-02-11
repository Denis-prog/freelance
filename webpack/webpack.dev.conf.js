const webpack = require('webpack');
const merge = require('webpack-merge');
const Path = require('path');

const baseWebpackConfig = require('./webpack.common.conf');

const devWebpackConfig = merge(baseWebpackConfig, {
    mode: 'development',
    devtool: 'cheap-module-eval-source-map',
    devServer: {
        contentBase: baseWebpackConfig.externals.paths.dist,
        port: 8081,
        overlay: {
            warnings: false,
            errors: true,
        },
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                include: Path.resolve(__dirname, '../src'),
                enforce: 'pre',
                loader: 'eslint-loader',
                options: {
                    emitWarning: true,
                },
            },
        ],
    },
    plugins: [
        new webpack.SourceMapDevToolPlugin({
            filename: '[file].map',
        }),
        new webpack.ProvidePlugin({
            $: 'jquery',
            jQuery: 'jquery',
            'window.jQuery': 'jquery',

        }),
    ],
});

module.exports = new Promise((resolve) => {
    resolve(devWebpackConfig);
});
