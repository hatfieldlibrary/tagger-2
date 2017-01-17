/**
 * Created by mspalti on 1/16/17.
 */
import {tasks} from './const';
import gulp from 'gulp';
import runSequence from 'run-sequence';

gulp.task(tasks.TRAVIS_CI, () => {
  return new Promise((resolve, reject) => {
    runSequence(
      tasks.SERVER_LINT_JS,
      tasks.ISTANBUL_PREFIGHT,
      tasks.SERVER_INTEGRATION_TEST,
      tasks.SERVER_UNIT_TESTS,
      tasks.CLIENT_UNIT_TEST,
      tasks.COVERALLS,
      resolve
    );
  });
});
