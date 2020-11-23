const gulp = require('gulp');
const autoprefixer = require('gulp-autoprefixer');
const babel = require('gulp-babel');
const browserSync = require('browser-sync').create();
const browserify = require('gulp-browserify');

var AUTOPREFIXER = [
    '> 1%',
    'ie >= 8',
    'edge >= 15',
    'ie_mob >= 10',
    'ff >= 45',
    'chrome >= 45',
    'safari >= 7',
    'opera >= 23',
    'ios >= 7',
    'android >= 4',
    'bb >= 10'
];

const css = () => {
    return gulp.src('dev/styles/**/*.css')
        .pipe(autoprefixer(AUTOPREFIXER, { cascade: false, grid: true }))
        .pipe(gulp.dest('dist/styles'))
}

const js = () => {
    return gulp.src('dev/scripts/**/*.js')
        .pipe(babel({
            presets: ['@babel/preset-env']
        }))
        .pipe(gulp.dest('dist/scripts'))
}

exports.default = (cd) => {
    browserSync.init({
        server: "./dist"
    });

    css()
    js()

    gulp.watch('dev/scripts/**/*.js', gulp.series(js, browserSync.reload));
    gulp.watch('dev/styles/**/*.css', gulp.series(css, browserSync.reload));
    gulp.watch('./dist/**/*.html', browserSync.reload)

    return cd()
}