import gulp from 'gulp';
import {tasks} from './const';
import mocha from 'gulp-mocha';
import util from 'gulp-util';

// set the test environment variable.
process.env.NODE_ENV = "test";

gulp.task(tasks.SERVER_INTEGRATION_TEST, function () {
  return gulp.src(['tests/server/tagger/**/*.js'], { read: false })
    .pipe(mocha({ reporter: 'spec', timeout: 3000, globals: ['recursive','async-only'] }))
    .on('error', util.log);
});
