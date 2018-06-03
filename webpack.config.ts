import * as webpack from 'webpack';
import * as path from 'path';
import * as globule from 'globule';
import * as CopyPlugin from 'copy-webpack-plugin';
import * as ExtractTextPlugin from 'extract-text-webpack-plugin';



const dir = {
	src : path.resolve(__dirname, 'src'),
	dest: path.resolve(__dirname, 'Sotalbireo.github.io')
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
	globule.find([`**/*.${from}`, `!**/_*.${from}`], {cwd: dir.src}).forEach(filename => {
		files[filename.replace(new RegExp(`.${from}$`), `.${to}`)] = path.join(dir.src, filename);
	});
});

const pugLoader = [
	{
		loader: 'html-loader',
		options: {
			// removeComments: true,
			// minimize: true
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

const plugins = () => {
	let plugins = [
		new ExtractTextPlugin('[name]'),
		new CopyPlugin(
			[{from: {glob: '**/*', dot: true}}],
			{ignore: Object.keys(convertExt).map(ext => `*.${ext}`)}
		)
	];
	if(process.env.NODE_ENV === 'production') {
		plugins = plugins.concat([
			new webpack.LoaderOptionsPlugin({
				minimize: true
			}),
			new webpack.optimize.AggressiveMergingPlugin()
		]);
	};
	return plugins;
};



const config = {
	mode: process.env.NODE_ENV === 'production' ? 'production' : 'development',
	context: dir.src,
	target: 'web',
	entry: files,
	output: {
		filename: '[name]',
		jsonpFunction: 'vendor',
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
				exclude: /node_modules(?!\/webpack-serve)/,
				use: tsLoader
			}
		]
	},
	resolve: {
		modules: [
			path.resolve(__dirname, 'src'),
			'node_modules'
		]
	},
	plugins: plugins(),
	serve: {
		content: dir.dest,
		port: 8000,
		hot: {
			hot: true
		}
	}
}

module.exports = config;
