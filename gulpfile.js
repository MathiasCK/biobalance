const gulp = require('gulp');
const sass = require('gulp-sass');
const plugins = require('gulp-load-plugins')();
const rename = require('gulp-rename');

gulp.task('sass', () => {
	return gulp
		.src(['./scss/*.scss', './scss/pages/*.scss'])
		.pipe(plugins.sourcemaps.init())
		.pipe(sass({ outputStyle: 'compressed' }).on('error', sass.logError))
		.pipe(plugins.autoprefixer())
		.pipe(rename({ extname: '.min.css' }))
		.pipe(plugins.sourcemaps.write('./'))
		.pipe(gulp.dest('./css'));
});
