module.exports = {
	entry: './index.js',
	resolve:  {
		modulesDirectories: ['node_modules', './'],
		extensions: ['', '.js', '.jsx'],
	},
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