/**
 * Created by mspalti on 1/16/17.
 */
'use strict';

import coveralls from 'gulp-coveralls';
import {path, tasks} from './const';
import gulp from 'gulp';

gulp.task(tasks.COVERALLS, () => {
  return gulp.src('coverage/**/lcov.info')
    .pipe(coveralls())
    .on('error', function(err) {console.log(err)} );;
});
