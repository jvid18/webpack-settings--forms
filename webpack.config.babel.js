import { resolve } from 'path';
import MiniCSSExtractPlugin from 'mini-css-extract-plugin';
import CopyPlugin from 'copy-webpack-plugin';
import CSSMinimizerPlugin from 'css-minimizer-webpack-plugin';
import TerserPlugin from 'terser-webpack-plugin';

const entries = {
	'./js/forms/auto-diagnosis': './src/js/forms/auto-diagnosis.js',
	'./js/forms/visitor': './src/js/forms/visitor.js',
	'./js/forms/holidays': './src/js/forms/holidays.js',
	'./js/login': './src/js/login.js',
}

export default () => ({
	entry: entries,
	output: {
		path: resolve(__dirname, 'dist'), 
		filename: '[name].bundle.js',
	},
	resolve: {
		extensions: ['.js'],
		alias: {}
	},
	module: {
		rules: [
			{
				test: /\.m?js$/,
				exclude: /node_modules/,
				use: {
					loader: 'babel-loader',
				},
			},
			{
				test: /\.css$/i,
				use: [
					MiniCSSExtractPlugin.loader,
					'css-loader',
				],
			},
			{
				test: /\.(png|svg|jpg|jpeg|gif)$/i,
				type: 'asset/resource',
			},
			{
				test: /\.(woff|woff2)$/i,
				use: {
					loader: 'url-loader',
					options: {
						limit: 10000,
						mimetype: 'application/font-woff',
						name: '[name].[ext]',
						outputPath: './assets/fonts/',
						publicPath: './assets/fonts/',
						esModule: false,
					},
				},
			},
		],
	},
	plugins: [
		new MiniCSSExtractPlugin({
			filename: './assets/css/[name].bundle.css',
		}),
		new CopyPlugin({
			patterns: [
				{
					from: resolve(__dirname, 'src', 'assets/images'),
					to: 'assets/images',
				},
			],
		}),
	],
	optimization: {
		minimize: true,
		minimizer: [
			new CSSMinimizerPlugin(),
			new TerserPlugin(),
		],
	},
});
