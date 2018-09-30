const path = require('path');
const APP_DIR = path.resolve(__dirname, 'public/js');
const BUILD_DIR = path.resolve(__dirname, 'public/js/build');
const ManifestPlugin = require('webpack-manifest-plugin');

module.exports = {
	mode: 'development',
	context: APP_DIR,
	watch: true,
	watchOptions: {
		aggregateTimeout: 300,
		poll: true,
		ignored: /node_modules/
	},
	entry: {
		app: './app.js'
	},
	output: {
		path: BUILD_DIR,
		filename: '[name].[contenthash].js',
		publicPath: "/"
	},
	plugins: [
		 new ManifestPlugin()
	],
	module: {
		rules: [
			{
				test: /\.js$/,
				exclude: /node_modules/,
				use: {
					loader: "babel-loader"
				}
			},
			{
				test:/\.(s*)css$/,
				use:['style-loader','css-loader', 'sass-loader']
			},
			{
				test:/\.wav$/,
				use: {
					loader: 'file-loader',
					options: {
						publicPath: 'js/build'
					}
				}
			}
		]
	}
};