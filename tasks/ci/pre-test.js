/**
 * Created by mspalti on 1/16/17.
 */
import gulp from 'gulp';
const isparta = require('isparta');
import istanbul from 'gulp-istanbul';
import {tasks} from './const';

gulp.task(tasks.ISTANBUL_PREFIGHT, () => {
  return gulp.src('tests/server/integration/**/*.js')
    .pipe(istanbul({includeUntested: true, instrumenter: isparta.Instrumenter }))
    // This overwrites `require` so it returns covered files
    .pipe(istanbul.hookRequire());
});
