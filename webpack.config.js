const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');

module.exports = {
    mode:'production',
    target: 'web',
    entry: './src/index.ts',
    output: {
        filename: 'bundle.web.js',
        path: path.resolve(__dirname, 'dist')
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: [
                    {
                        loader: 'babel-loader',
                        options: {
                            presets: ['@babel/preset-env'],
                        }
                    },
                    'ts-loader',
                ],
                exclude: [/node_modules/],
            },
        ],
    },
    resolve:  {
        extensions: ['.tsx', '.ts', '.js']
    },
    plugins: [
        new HtmlWebpackPlugin({
            title: 'GB emu',
            template: './template.ejs'
        }),
        new webpack.EnvironmentPlugin({
            WEB: true,
        }),
    ]
};
