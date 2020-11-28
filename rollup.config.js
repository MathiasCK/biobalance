import { getBabelOutputPlugin } from '@rollup/plugin-babel';

const config = {
	input: [
		'js/app.js',
		'js/common.js',
		'js/donate.js',
		'js/fade.js',
		'js/gallery.js',
		'js/observer.js',
		'js/popup.js',
	],
	output: {
		dir: 'dist/js',
		format: 'esm',
		sourcemap: true,
	},

	plugins: [
		getBabelOutputPlugin({
			presets: [
				'minify',
				[
					'@babel/preset-env',
					{
						useBuiltIns: 'usage',
					},
				],
			],
			plugins: ['@babel/plugin-proposal-class-properties'],
		}),
	],
};

export default config;
