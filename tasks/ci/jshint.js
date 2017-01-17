/**
 * Created by mspalti on 1/16/17.
 */
'use strict';
import jshint from 'gulp-jshint';
import gulp  from 'gulp';
import {path, tasks} from './const';

const JS = [
  path.SERVER + '**/*.js'
];

gulp.task(tasks.SERVER_LINT_JS, function() {
  return gulp.src(JS)
    .pipe(jshint())
    .pipe(jshint.reporter('jshint-stylish'));
});
