module.exports = {
	entry: './index.js',
	output: {
		path: './',
		filename: 'bundle.js'
	},
	devServer: {
		inline: true,
		contentBase: './',
		port: 8100
	},
	module: {
		loaders: [
			{
				test: /\.js$/,
				exclude: /nodel_modules/,
				loader: 'babel'
			}
		]
	}


}