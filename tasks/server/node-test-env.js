/**
 * Created by mspalti on 12/5/16.
 */
process.env.NODE_ENV = "test"

import gulp from 'gulp';
import {tasks} from './const';
import config from '../../server/config/environment'

gulp.task(tasks.SET_TEST_ENVIRONMENT, function() {
  return process.env.NODE_ENV = config.env = 'test';
});
