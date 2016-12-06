/**
 * Created by mspalti on 12/5/16.
 */
process.env.NODE_ENV = "test"
import gulp from 'gulp';
import {tasks} from './const';

gulp.task(tasks.SET_TEST_BABEL, function() {
  return process.env.BABEL_ENV = 'test';
});
