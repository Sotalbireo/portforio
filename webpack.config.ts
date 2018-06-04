import * as webpack from 'webpack';
import * as path from 'path';
import * as globule from 'globule';
import * as CopyPlugin from 'copy-webpack-plugin';
import * as ExtractTextPlugin from 'extract-text-webpack-plugin';

const isProd = process.env.NODE_ENV === 'production';

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
	globule.find([`**/*.${from}`, `!**/_*.${from}`, `!**/*.d.ts`], {cwd: dir.src}).forEach(filename => {
		files[filename.replace(new RegExp(`.${from}$`), `.${to}`)] = path.join(dir.src, filename);
	});
});

const pugLoader = [
	{
		loader: 'html-loader',
		options: {
			removeComments: isProd,
			minimize: isProd
		}
	},
	'pug-html-loader'
];

const sassLoader = [
	{
		loader: 'css-loader',
		options: {
			minimize: isProd
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
			fix: true,
			tsConfigFile: 'tsconfig.json',
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
		),
		new webpack.LoaderOptionsPlugin({
			minimize: isProd
		})
	];
	if(isProd) {
		plugins = plugins.concat([
			new webpack.optimize.AggressiveMergingPlugin()
		]);
	};

	return plugins;
};



const config = {
	mode: isProd ? 'production' : 'development',
	context: dir.src,
	target: 'web',
	entry: files,
	output: {
		filename: '[name]',
		jsonpFunction: 'vendor',
		path: dir.dest,
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
		],
		extensions: ['*', '.ts', '.tsx', '.pug', '.sass']
	},
	plugins: plugins(),
	serve: {
		content: dir.dest,
		hot: false,
		port: 8000
	}
}

export default config;
