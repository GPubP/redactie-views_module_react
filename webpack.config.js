const path = require('path');

const RedactionWebpackPlugin = require('@redactie/module-webpack-plugin');
const kebabCase = require('lodash.kebabcase');
const postcssPresetEnv = require('postcss-preset-env');
const webpack = require('webpack');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

const packageJSON = require('./package.json');

module.exports = env => {
	const defaultConfig = {
		mode: 'production',
		entry: './public/index.tsx',
		performance: {
			hints: false,
		},
		module: {
			rules: [
				{
					test: /\.ts(x)?$/,
					use: 'ts-loader',
					include: [/public/, /node_modules\/@redactie\/translations-module/],
				},
				{
					test: /\.s[ac]ss$/i,
					use: [
						'style-loader',
						{
							loader: 'css-loader',
							options: {
								importLoaders: 1,
							},
						},
						{
							loader: 'postcss-loader',
							options: {
								ident: 'postcss',
								plugins: () => [postcssPresetEnv()],
							},
						},
						'sass-loader',
					],
				},
			],
		},
		resolve: {
			extensions: ['.tsx', '.ts', '.js'],
		},
		plugins: [
			// add default plugins here
		],
		externals: {
			react: 'react',
			ramda: 'ramda',
			ky: 'ky',
			formik: 'formik',
			yup: 'yup',
			moment: 'moment',
			'react-dom': 'react-dom',
			'react-router-dom': 'react-router-dom',
			'@redactie/react-router-guards': '@redactie/react-router-guards',
			'@redactie/redactie-core': '@redactie/redactie-core',
			'@redactie/roles-rights-module': '@redactie/roles-rights-module',
			'@acpaas-ui/react-components': '@acpaas-ui/react-components',
			'@acpaas-ui/react-editorial-components': '@acpaas-ui/react-editorial-components',
		},
		output: {
			filename: `${kebabCase(packageJSON.name)}.umd.js`,
			path: path.resolve(__dirname, 'dist'),
			libraryTarget: 'umd',
		},
	};

	if (env.analyse) {
		return {
			...defaultConfig,
			plugins: [
				...defaultConfig.plugins,
				new BundleAnalyzerPlugin(),
				new webpack.SourceMapDevToolPlugin({
					filename: `${kebabCase(packageJSON.name)}.umd.js.map`,
					publicPath: `${kebabCase(packageJSON.name + packageJSON.version)}/dist/`,
				}),
			],
		};
	}

	if (env.prod) {
		return {
			...defaultConfig,
			plugins: [
				...defaultConfig.plugins,
				new RedactionWebpackPlugin({
					moduleName: packageJSON.name,
				}),
				new webpack.SourceMapDevToolPlugin({
					filename: `${kebabCase(packageJSON.name)}.umd.js.map`,
					publicPath: `${kebabCase(packageJSON.name + packageJSON.version)}/dist/`,
				}),
			],
		};
	}

	return defaultConfig;
};
