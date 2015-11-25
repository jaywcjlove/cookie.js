var gulp = require('gulp')
var watch = require('gulp-watch')
var uglify = require('gulp-uglify');
var rename = require("gulp-rename");
var sourcemap = require('gulp-sourcemap');
var umd = require('gulp-umd')


gulp.task('default', ['build','min','map']);

gulp.task('watch', function (cb) {
    watch('src/*.js', ['build']);
});

gulp.task('build',function(){
    gulp.src('src/*.js')
        .pipe(umd({
            exports: function(file) {
                return 'cookie';
            },
            namespace: function(file) {
                return 'cookie';
            }
        }))
        .pipe(gulp.dest('./dist'));

})


gulp.task('min',function(){
    gulp.src('dist/cookie.js')
        .pipe(uglify({
            mangle: false,
            output:{
                // comments:true
            }
        }))
        .pipe(rename({
            suffix:".min"
        }))
        .pipe(gulp.dest('./dist'));
})



gulp.task('map', function (cb) {
    // 生成 JSLite.min.map
    gulp.src('dist/cookie.js')
        .pipe(sourcemap({
            outSourceMap:'cookie.min.map',
            sourceRoot:"http://jslite.io",
            write:'./dist/',
            beautify: {
                "ascii_only": true
            }
        }))
        .pipe(gulp.dest('./dist/'));

})