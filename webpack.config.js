
var webpack = require('webpack');
var path = require('path');
var fs = require('fs');

var nodeModules = {};
fs.readdirSync('node_modules')
    .filter(function (x) {
        return ['.bin'].indexOf(x) === -1;
    })
    .forEach(function (mod) {
        nodeModules[mod] = 'commonjs ' + mod;
    });

var config = [
    {
        entry: {
            index: [
                __dirname + '/src/index.ts'
            ],
        },
        output: {
            path: __dirname + '/lib/',
            filename: '[name].js',
            libraryTarget: 'commonjs-module'
        },
        externals: nodeModules,
        devtool: 'none',
        resolve: {
            extensions: [".ts", ".tsx", ".js"],
            alias: {
            }
        },
        target: 'node',
        node: {
            __dirname: false,
            __filename: false,
        },
        module: {
            loaders: [
                {
                    test: /\.tsx?$/,
                    exclude: [/lib/, /dist/, /templates/],
                    loader: "ts-loader"
                }
            ]
        },
    }
];


module.exports = config;