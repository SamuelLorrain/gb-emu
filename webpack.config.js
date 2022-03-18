const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');

const nodeConfig = {
    target: 'node',
    entry: './src/index.ts',
    output: {
        filename: 'bundle.js',
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
                exclude: /node_modules/,
            },
        ],
    },
    resolve:  {
        extensions: ['.tsx', '.ts', '.js']
    },
    plugins: [
        new webpack.EnvironmentPlugin({
            WEB: false,
        })
    ]
};

const webConfig = structuredClone(nodeConfig);
webConfig.target = 'web';
webConfig.output = {
    filename: 'bundle.web.js',
    path: path.resolve(__dirname, 'dist')
};
webConfig.plugins = [
    new HtmlWebpackPlugin({
        title: 'GB emu',
        template: './template.ejs'
    }),
    new webpack.EnvironmentPlugin({
        WEB: true,
    })
]

module.exports = [nodeConfig, webConfig];
