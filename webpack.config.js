const path = require('path');
const APP_DIR = path.resolve(__dirname, 'public/js');
const BUILD_DIR = path.resolve(__dirname, 'public/js/build');

module.exports = {
	mode: 'development',
	context: APP_DIR,
	entry: {
		app: './app.js'
	},
	output: {
		path: BUILD_DIR,
		filename: 'app.js',
		publicPath: "/"
	},
	module: {
		rules: [
			{
				test: /\.js$/,
				exclude: /node_modules/,
				use: {
					loader: "babel-loader"
				}
			}
		]
	}
};