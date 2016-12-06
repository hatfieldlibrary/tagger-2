process.env.NODE_ENV = "test"
import gulp from 'gulp';
import {tasks} from './const';
import mocha from 'gulp-mocha';
import util from 'gulp-util';

gulp.task(tasks.SERVER_INTEGRATION_TEST, function () {
  return gulp.src(['tests/server/tagger/**/*.js'], { read: false })
    .pipe(mocha({ reporter: 'spec' }))
    .on('error', util.log);
});
