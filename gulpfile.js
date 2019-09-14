const fs = require('fs');
const gulp = require('gulp');
const mustache = require('gulp-mustache');
const sass = require('gulp-sass');
const uglify = require('gulp-uglify');
const htmlclean = require('gulp-htmlclean');

let config = JSON.parse(fs.readFileSync('./config.json'));

gulp.task('html', done => {
    config.build.path = config.build.dev.path;
    gulp.src(config.build.dev.src + '/*.html')
        .pipe(mustache(config))
        .pipe(htmlclean())
        .pipe(gulp.dest(config.build.dev.dst));
    done();
});

gulp.task('html-local', done => {
    config.build.path = config.build.local.path;
    gulp.src(config.build.dev.src + '/*.html')
        .pipe(mustache(config))
        .pipe(htmlclean())
        .pipe(gulp.dest(config.build.local.dst));
    done();
});

gulp.task('css', done => {
    gulp.src(config.build.dev.src + '/assets/scss/*.scss')
        .pipe(sass({
            outputStyle: "compressed"
        }))
        .pipe(gulp.dest(config.build.dev.dst + '/assets/css'));
    done();
});

gulp.task('js', done => {
    gulp.src(config.build.dev.src + '/assets/js/*.js')
        .pipe(uglify())
        .pipe(gulp.dest(config.build.dev.dst + '/assets/js'));
    done();
});

gulp.task('copy', done => {
    gulp.src(['node_modules/foundation-sites/css/foundation.min.css',
            'node_modules/normalize-css/normalize.css'
        ])
        .pipe(gulp.dest(config.build.dev.dst + '/assets/css'));
    gulp.src(['node_modules/foundation-icons/foundation-icons*'])
        .pipe(gulp.dest(config.build.dev.dst + '/assets/font'));
    gulp.src([config.build.dev.src + '/assets/img/*'])
        .pipe(gulp.dest(config.build.dev.dst + '/assets/img'));
    gulp.src([config.build.dev.src + '/*.txt'])
        .pipe(gulp.dest(config.build.dev.dst));
    gulp.src([config.build.dev.src + '/.htaccess'])
        .pipe(gulp.dest(config.build.dev.dst));
    done();
});

gulp.task('default', gulp.parallel(['copy', 'html', 'css', 'js']));
gulp.task('local', gulp.parallel(['copy', 'html-local', 'css', 'js']));

gulp.task('watch', gulp.parallel(['default'], () => {
    gulp.watch(config.build.dev.src + '/*.html', ['html']);
    gulp.watch(config.build.dev.src + '/assets/scss/*.scss', ['css']);
    gulp.watch(config.build.dev.src + '/assets/js/*.js', ['js']);
}));