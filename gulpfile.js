const gulp = require('gulp');
const sass = require('gulp-sass');
const plugins = require('gulp-load-plugins')();
const rename = require('gulp-rename');

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
