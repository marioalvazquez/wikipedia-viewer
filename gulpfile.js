"use strict";

const gulp = require('gulp');
const webserver = require('gulp-webserver');
const cleanCSS = require('gulp-clean-css');
const imagemin = require('gulp-imagemin');

gulp.task('server', ()=> {
  gulp.src('./')
  .pipe(webserver({
    livereload: true,
    port: 8080,
    host: "localhost",
    open: true
  }))
});

gulp.task('minify-css', () => {
  return gulp.src('./build/css/index.css')
  .pipe(cleanCSS({ compatibility: 'ie8'}))
  .pipe(gulp.dest('dist/css'));
});

gulp.task('images', () =>{
  gulp.src('src/img/*')
  .pipe(imagemin())
  .pipe(gulp.dest('dist/img'));
});
