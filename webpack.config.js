var path = require('path');
var webpack = require('webpack');

module.exports = {

    entry: './src/index.js',
	output: {
		path: __dirname,
		filename: 'pokedex.min.js'
	},
	module: {
		loaders: [{
				test: /\.js$/,
				loader: 'babel-loader',
				exclude: /node_modules/
			},
			{
				test: /\.jsx$/,
				loader: 'babel-loader',
				exclude: /node_modules/
			},
			{
				test: /\.css$/,
				loader: 'style-loader'
			},
			{
				test: /\.css$/,
				loader: 'css-loader',
				query: {
					modules: true,
					localIdentName: '[name]__[local]___[hash:base64:5]'
				}
			}
		]
	},
    plugins: [
		new webpack.optimize.UglifyJsPlugin({
			include: /\.min\.js$/,
			minimize: true
		}),
		new webpack.DefinePlugin({
			'process.env': {
				NODE_ENV: JSON.stringify('production')
			}
		}),
	],
};
