const gulp = require('gulp');
const sass = require('gulp-sass');
const plugins = require('gulp-load-plugins')();
const rename = require('gulp-rename');
const babel = require('gulp-babel');
const browserify = require('gulp-browserify');
const uglify = require('gulp-uglify');

// Converts all sass to minified css files with autoprefixing for older browsers
gulp.task('sass', () => {
	return gulp
		.src(
			[
				'./scss/*.scss',
				'./contact/contact.scss',
				'./how-it-works/how-it-works.scss',
				'./our-team/ourteam.scss',
				'./problem/problem.scss',
				'./solution/solution.scss',
			],
			{ allowEmpty: true }
		)
		.pipe(plugins.sourcemaps.init())
		.pipe(sass({ outputStyle: 'compressed' }).on('error', sass.logError))
		.pipe(plugins.autoprefixer())
		.pipe(rename({ extname: '.min.css' }))
		.pipe(plugins.sourcemaps.write('./'))
		.pipe(gulp.dest('./css'));
});

// Transpiles all ESNEXT javascript files to older ES5 for IE support
gulp.task('js', () => {
	return gulp
		.src('./js/*.js', { allowEmpty: true })
		.pipe(
			babel({
				sourceMap: true,
				plugins: ['@babel/plugin-proposal-class-properties'],
				presets: [
					[
						'@babel/preset-env',
						{
							useBuiltIns: 'usage',

							// forceAllTransforms: true,
							corejs: 3,
						},
					],
				],
			})
		)
		.pipe(browserify())
		.pipe(uglify())
		.pipe(gulp.dest('./js'));
});
