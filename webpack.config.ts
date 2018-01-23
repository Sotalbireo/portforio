// Thanks: https://qiita.com/toduq/items/2e0b08bb722736d7968c

import * as webpack from 'webpack';
import * as path from 'path';
import * as globule from 'globule';
import * as CopyPlugin from 'copy-webpack-plugin';
import * as ExtractTextPlugin from 'extract-text-webpack-plugin';



const dir = {
	src : path.resolve(__dirname, 'src'),
	dest: path.resolve(__dirname, 'dist'), // for Develop use.
	pub: path.resolve(__dirname, 'Sotalbireo.github.io') // for Publish use.
};

const convertExt = {
	pug: 'html',
	sass: 'css',
	ts: 'js'
};
type convertExtFrom = 'pug' | 'sass' | 'ts';

const files: webpack.Entry = {};
Object.keys(convertExt).forEach(from => {
	const to = convertExt[(from as convertExtFrom)];
	globule.find([`**/*.${from}`, `!**/_*.${from}`, `!**/_*/*.${from}`], {cwd: dir.src}).forEach(filename => {
		files[filename.replace(new RegExp(`.${from}$`), `.${to}`)] = path.join(dir.src, filename);
	});
});

const pugLoader = [
	{
		loader: 'html-loader',
		options: {
			removeComments: true,
			minimize: true
		}
	},
	'pug-html-loader'
];

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
			plugins: () => [require('autoprefixer')()]
		}
	},
	'sass-loader'
];

const tsLoader = [
	'awesome-typescript-loader',
	{
		loader: 'tslint-loader',
		options: {
			configFile: 'tslint.json',
			typeCheck: true
		}
	}
];

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

module.exports = (env: any) => {
	if(env && env.production) {

		config.output.path = dir.pub;

		config.plugins = config.plugins.concat([
			new webpack.optimize.DedupePlugin(),
			new webpack.optimize.UglifyJsPlugin(),
			new webpack.optimize.OccurrenceOrderPlugin(true),
			new webpack.optimize.AggressiveMergingPlugin()
		]);
	};
	return config
};
