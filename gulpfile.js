const fs = require('fs');
const gulp = require('gulp');
const mustache = require('gulp-mustache');
const sass = require('gulp-sass');
const concat = require('gulp-concat');
const uglify = require('gulp-uglify');
const htmlclean = require('gulp-htmlclean');

var config = JSON.parse(fs.readFileSync('./config.json'));

gulp.task('html', function () {
    config.build.path = config.build.dev.path;
    gulp.src(config.build.dev.src + '/*.html')
        .pipe(mustache(config))
        .pipe(htmlclean())
        .pipe(gulp.dest(config.build.dev.dst))
});

gulp.task('html-local', function () {
    config.build.path = config.build.local.path;
    gulp.src(config.build.dev.src + '/*.html')
        .pipe(mustache(config))
        .pipe(htmlclean())
        .pipe(gulp.dest(config.build.local.dst))
});

gulp.task('css', function () {
    gulp.src(config.build.dev.src + '/assets/scss/*.scss')
        .pipe(sass({outputStyle: "compressed"}))
        .pipe(gulp.dest(config.build.dev.dst + '/assets/css'));
});

gulp.task('js', function () {
    gulp.src(config.build.dev.src + '/assets/js/*.js')
        .pipe(uglify())
        .pipe(gulp.dest(config.build.dev.dst + '/assets/js'));
});

gulp.task('copy', function () {
    gulp.src(['node_modules/foundation-sites/css/foundation.min.css',
        'node_modules/normalize-css/normalize.css'])
        .pipe(gulp.dest(config.build.dev.dst + '/assets/css'));
    gulp.src(['node_modules/foundation-icons/foundation-icons*'])
        .pipe(gulp.dest(config.build.dev.dst + '/assets/font'));
    gulp.src([config.build.dev.src + '/assets/img/*'])
        .pipe(gulp.dest(config.build.dev.dst + '/assets/img'));
});

gulp.task('default', ['copy', 'html', 'css', 'js']);
gulp.task('local', ['copy', 'html-local', 'css', 'js']);

gulp.task('watch', ['default'], function () {
    gulp.watch(config.build.dev.src + '/*.html', ['html']);
    gulp.watch(config.build.dev.src + '/assets/scss/*.scss', ['css']);
    gulp.watch(config.build.dev.src + '/assets/js/*.js', ['js']);
});