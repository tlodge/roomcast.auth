var gulp = require('gulp');
var browserify = require('browserify');
var source = require('vinyl-source-stream');
var gutil = require('gulp-util');
var babelify = require('babelify');
var rename = require('gulp-rename');
var uglify = require('gulp-uglify');
var buffer = require('vinyl-buffer');


// Gulp tasks
// ----------------------------------------------------------------------------

gulp.task('watch', function () {
    gulp.watch(['./js/**/*.js'], ['build']);
});

gulp.task('build', function () {
    browserify({
            entries: './js/app.js',
            debug: true
    })
   .bundle()
   .pipe(source('register.min.js'))
   .pipe(buffer()) 
   .pipe(uglify().on('error', gutil.log))
   .pipe(gulp.dest('./dist'));
});

// When running 'gulp' on the terminal this task will fire.
// It will start watching for changes in every .js file.
// If there's a change, the task 'build' defined above will fire.
gulp.task('default', ['watch']);
