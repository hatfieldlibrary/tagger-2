/**
 * Created by mspalti on 1/16/17.
 */

'use strict';

import gulp from 'gulp';
import {tasks} from './const';
import mocha from 'gulp-mocha';
import istanbul from 'gulp-istanbul';
import util from 'gulp-util';

gulp.task(tasks.SERVER_INTEGRATION_TEST, function () {
  return gulp.src(['tests/server/integration/**/*.js'], { read: false })
    .pipe(mocha({ reporter: 'spec', timeout: 3000, globals: ['recursive','async-only'] }))
    .pipe(istanbul.writeReports())
    .on('error', util.log);
});

gulp.task(tasks.SERVER_UNIT_TESTS, function() {
  return gulp.src(['tests/server/unit/**/*.js'], {read: false})
    .pipe(mocha({ reporter: 'spec', timeout: 3000, globals: ['recursive','async-only'] }))
    .pipe(istanbul.writeReports())
    .on('error', util.log);

});
