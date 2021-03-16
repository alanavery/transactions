const gulp = require('gulp');
const sass = require('gulp-sass');
const uglifycss = require('gulp-uglifycss');

const compile = () => {
  return gulp.src('./src/sass/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('./src/css'));
};

const minify = () => {
  return gulp.src('./src/css/*.css')
    .pipe(uglifycss({ 'uglyComments': true }))
    .pipe(gulp.dest('./src/dist'));
};

const watch = () => {
  gulp.watch('./src/sass/*.scss', compile);
  gulp.watch('./src/css/*.css', minify);
};

exports.default = gulp.series(compile, minify, watch);