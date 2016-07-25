var gulp = require('gulp');
var mocha = require('gulp-mocha');
var plumber = require('gulp-plumber');
var gutil = require('gulp-util');

var gulp_src = gulp.src;
gulp.src = function() {
    return gulp_src.apply(gulp, arguments)
        .pipe(plumber(function(error) {
                // Output an error message
                gutil.log(gutil.colors.red('Error (' + error.plugin + '): ' + error.message));
                // emit the end event, to properly end the task
                this.emit('end');
            })
        );
};

gulp.task('test', function() {
    var error = false;
    gulp.src('./test/**/*.js')
        .pipe(mocha())
        .on('error', function() {
            console.log('Tests failed!');
            error = true;
        })
        .on('end', function() {
            if (!error) {
                console.log('Tests succeeded! ');
            }
        });
});

gulp.task('watch', function() {
    gulp.watch(['./test/**/*.js', './*.js', 'routes/**/*.js', 'validators/**/*.js'], ['test']);
});