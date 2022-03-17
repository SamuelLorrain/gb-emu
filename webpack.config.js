const path = require('path');

module.exports = {
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
}
