var gulp = require('gulp'),
    gutil = require('gulp-util'),
    webserver = require('gulp-webserver'),
    sass = require('gulp-sass'),
    sourcemaps = require('gulp-sourcemaps'),
    autoprefixer = require('gulp-autoprefixer');


    var autoprefixerOptions = {
      browsers: ['last 2 versions', '> 5%', 'Firefox ESR']
    };



gulp.task('js', function() {
  gulp.src('builds/dev/js/**/*');
});

gulp.task('html', function() {
  gulp.src('builds/dev/*.html');
});

gulp.task('css', function() {
  gulp.src('builds/dev/css/*.css');
});


gulp.task('sass', function () {
  return gulp.src('builds/dev/css/sass/style.scss')
    .pipe(sourcemaps.init())
    .pipe(sass({outputStyle: 'expanded'}).on('error', sass.logError))
    .pipe(autoprefixer(autoprefixerOptions))
    .pipe(sourcemaps.write('builds/dev/css/'))
    .pipe(gulp.dest('builds/dev/css/'));
});

gulp.task('watch', function() {
  gulp.watch('builds/dev/js/**/*', ['js']);
  gulp.watch('builds/dev/css/*.css', ['css']);
  gulp.watch(['builds/dev/*.html', 'builds/dev/views/*.html'], ['html']),
  gulp.watch('builds/dev/css/sass/*.scss', ['sass']);
});

gulp.task('webserver', function() {
  gulp.src('builds/dev/')
    .pipe(webserver({
      livereload: true,
      open: true
    }));
});

gulp.task('default', ['sass', 'watch', 'html', 'js', 'css',  'webserver']);
