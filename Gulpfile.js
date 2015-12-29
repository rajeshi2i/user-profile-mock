var gulp = require('gulp');
var browserSync = require('browser-sync');
var sass = require('gulp-sass');

// Static Server + watching scss/html files
gulp.task('serve', ['sass'], function() {

  browserSync({
    server: {
      baseDir: ''
    }
  });

  gulp.watch("sass/**/*.scss", ['sass']).on('change', browserSync.reload);
  gulp.watch('*.html', 'css/**/*.css', 'js/**/*.js').on('change', browserSync.reload);
});

// Compile sass into CSS & auto-inject into browsers
gulp.task('sass', function() {
  return gulp.src("sass/**/*.scss")
    .pipe(sass())
    .pipe(gulp.dest("css/"));
});

gulp.task('default', ['serve']);
