// Thanks: https://qiita.com/toduq/items/2e0b08bb722736d7968c

const webpack = require('webpack')
const path = require('path')
const globule = require('globule')
const CopyPlugin = require('copy-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')

const dir = {
	src: path.resolve(__dirname, 'src'),
	dest: process.env.NODE_ENV === 'production' ? path.resolve(__dirname, 'Sotalbireo.github.io') : path.resolve(__dirname, 'dist')
}

const convertExt = {
	pug: 'html',
	sass: 'css',
	ts: 'js'
}

const files = {}
Object.keys(convertExt).forEach(from => {
	const to = convertExt[from]
	globule.find([`**/*.${from}`, `!**/_*.${from}`], {cwd: dir.src}).forEach(filename => {
		files[filename.replace(new RegExp(`.${from}$`), `.${to}`)] = path.join(dir.src, filename)
	})
})

const pugLoader = [
	{
		loader: 'html-loader',
		options: {
			removeComments: true,
			minimize: true
		}
	},
	'pug-html-loader'
]

const sassLoader = [
	{
		loader: 'css-loader',
		options: {
			minimize: true
		}
	},
	{
		loader: 'postcss-loader',
		options: {
			ident: 'postcss',
			plugins: loader => [require('autoprefixer')()]
		}
	},
	'sass-loader'
]

const tsLoader = [
	'awesome-typescript-loader',
	{
		loader: 'tslint-loader',
		options: {
			configFile: 'tslint.json'
		}
	}
]

const config = {
	context: dir.src,
	target: 'web',
	entry: files,
	output: {
		filename: '[name]',
		path: dir.dest
	},
	module: {
		rules: [
			{
				test: /\.pug$/,
				use: ExtractTextPlugin.extract(pugLoader)
			},
			{
				test: /\.sass$/,
				oneOf: [
					{
						resourceQuery: /inline/,
						use: sassLoader
					},
					{
						use: ExtractTextPlugin.extract(sassLoader)
					}
				]
			},
			{
				test: /\.tsx?$/,
				exclude: /node_modules(?!\/webpack-dev-server)/,
				use: tsLoader
			}
		]
	},
	resolve: {
		modules: [
			'node_modules',
			path.resolve(__dirname, 'src')
		]
	},
	plugins: [
		new ExtractTextPlugin('[name]'),
		new CopyPlugin(
			[{from: {glob: '**/*', dot: true}}],
			{ignore: Object.keys(convertExt).map(ext => `*.${ext}`)}
		),
		new webpack.DefinePlugin({
			'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV)
		}),
	],
	devServer: {
		contentBase: dir.dest,
		port: 8000,
		hot: true
	}
}

if(process.env.NODE_ENV === 'production') {
	config.plugins = config.plugins.concat([
		new webpack.optimize.UglifyJsPlugin(),
		new webpack.optimize.OccurrenceOrderPlugin(),
		new webpack.optimize.AggressiveMergingPlugin()
	])
}

module.exports = config
