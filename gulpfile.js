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
    
    var option = "bundle";

    var i = process.argv.indexOf("--name");

    if (i >-1 && process.argv.length > (i + 1)){
	option = process.argv[i+1];
    }
   
    console.log("building with name " + option + '.min.js');

    browserify({
            entries: './js/app.js',
            debug: true
    })
   .bundle()
   .pipe(source(option +'.min.js'))
   .pipe(buffer()) 
   .pipe(uglify().on('error', gutil.log))
   .pipe(gulp.dest('./dist'));
});

// When running 'gulp' on the terminal this task will fire.
// It will start watching for changes in every .js file.
// If there's a change, the task 'build' defined above will fire.
gulp.task('default', ['watch']);
