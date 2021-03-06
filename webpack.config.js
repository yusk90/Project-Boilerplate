var NODE_ENV = process.env.NODE_ENV || 'development',
    webpack = require('webpack');

module.exports = {
    context: __dirname + '/js',
    entry: {
        home: './home',
        about: './about',
        common: './common' // for example - libraries initialization
    },
    output: {
        path: __dirname + '/public/js',
        filename: '[name].js',
        publicPath: 'js/',
        library: '[name]'
    },
    resolve: {
        root: __dirname + '/vendor',
        alias: {
            // old: 'old/dist/old'
        }
    },
    watch: NODE_ENV == 'development',
    watchOptions: {
        aggregateTimeout: 100
    },
    devtool: NODE_ENV == 'development' ? 'cheap-inline-module-source-map' : null,
    module: {
        loaders: [
            {
                test: /\.js$/,
                include: __dirname + '/js',
                loader: 'babel',
                query: {
                    presets: ['es2015'],
                    plugins: ['transform-runtime']
                }
            }
        ]
    },
    plugins: [
        new webpack.NoErrorsPlugin(),
        new webpack.DefinePlugin({
            NODE_ENV: JSON.stringify(NODE_ENV)
        }),
        // You can use multiple chunk plugins
        new webpack.optimize.CommonsChunkPlugin({
            name: 'common'
            // minChunks: 3
        }),
        new webpack.ProvidePlugin({
            // $: 'jquery'
        })
    ]
};

if (NODE_ENV == 'production') {
    module.exports.plugins.push(
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false,
                drop_console: true,
                unsafe: true
            }
        })
    );
}
