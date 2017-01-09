/**
 * Created by mspalti on 1/6/17.
 */

import jshint from 'gulp-jshint';
import gulp  from 'gulp';
import {path, tasks} from './const';

const JS = [
  path.DEV + '**/*.js',
  '!' + path.DEV + 'bower_components/**/*'
];

gulp.task(tasks.SERVER_LINT_JS, function() {
  return gulp.src(JS)
    .pipe(jshint())
    .pipe(jshint.reporter('jshint-stylish'));
});
