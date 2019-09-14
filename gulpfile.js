const gulp = require('gulp');
const htmlclean = require('gulp-htmlclean');
const cssnano = require('gulp-cssnano');

gulp.task('html', done => {
    gulp.src('./index.html')
        .pipe(htmlclean())
        .pipe(gulp.dest('_build'));
    done();
});

gulp.task('css', done => {
    gulp.src(['./assets/css/ie8.css', './assets/css/ie9.css', './assets/css/main.css', './assets/css/noscript.css'])
        .pipe(cssnano())
        .pipe(gulp.dest('_build/assets/css'));
    done();
});

gulp.task('copy', done => {
    gulp.src('./assets/js/*.js')
        .pipe(gulp.dest('_build/assets/js'));
    gulp.src('./assets/css/font-awesome.min.css')
        .pipe(gulp.dest('_build/assets/css'));
    gulp.src('./assets/css/images/*')
        .pipe(gulp.dest('_build/assets/css/images'));
    gulp.src('./assets/fonts/*')
        .pipe(gulp.dest('_build/assets/fonts'));
    gulp.src('./images/*')
        .pipe(gulp.dest('_build/images'));
    gulp.src('./.htaccess')
        .pipe(gulp.dest('_build'));
    done();
});

gulp.task('default', gulp.parallel(['html', 'css', 'copy']));