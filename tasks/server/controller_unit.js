/**
 * Created by mspalti on 1/15/17.
 */
import gulp from 'gulp';
import {tasks} from './const';
import mocha from 'gulp-mocha';
import util from 'gulp-util';
const isparta = require('isparta');
import istanbul from 'gulp-istanbul';

// set the test environment variable.
process.env.NODE_ENV = "test";

gulp.task(tasks.SERVER_PRETEST, () => {
  return gulp.src('tests/server/unit/**/*.js')
    .pipe(istanbul({includeUntested: true, instrumenter: isparta.Instrumenter }))
    // This overwrites `require` so it returns covered files
    .pipe(istanbul.hookRequire());
});

gulp.task(tasks.AREA_UNIT_TESTS,  [tasks.SERVER_PRETEST], function () {
  return gulp.src(['tests/server/unit/**/*.js'], { read: false })
    .pipe(mocha({ reporter: 'spec', timeout: 3000, globals: ['recursive','async-only'] }))
    .pipe(istanbul.writeReports())
    .on('error', util.log);
});
