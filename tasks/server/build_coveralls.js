/**
 * Created by mspalti on 1/14/17.
 */

'use strict';

import coveralls from 'gulp-coveralls';
import {path, tasks} from './const';
import gulp from 'gulp';

gulp.task(tasks.SERVER_COVERALLS, function() {
  return gulp.src('./coverage/lcov.info')
    .pipe(coveralls())
    .on('error', function(err) {console.log(err)} );
});
