import gulp from 'gulp';
import uglify from 'gulp-uglify';
import {path, tasks} from './const';
import ngAnnotate from 'gulp-ng-annotate';

const JS = [
  path.DIST + '**/*.js',
  '!' + path.DIST + 'bower_components/**/*'
];

gulp.task(tasks.CLIENT_BUILD_JS_DIST, () => {
  return gulp.src(JS, {base: path.DIST})
    .pipe(ngAnnotate())
    .pipe(uglify())
    .pipe(gulp.dest(path.DIST));
});
