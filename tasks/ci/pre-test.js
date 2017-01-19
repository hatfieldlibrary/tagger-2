/**
 * Created by mspalti on 1/16/17.
 */
import gulp from 'gulp';
const isparta = require('isparta');
import istanbul from 'gulp-istanbul';
import {path, tasks} from './const';

const SERVER_JS = path.SERVER + "/api/**/*.js";
const CLIENT_JS = [path.CLIENT + "/dev/app/**/*.js", '!' + path.CLIENT + '/dev/bower_components/**/*.js'];

gulp.task(tasks.ISTANBUL_PREFIGHT, () => {
  return gulp.src(CLIENT_JS, SERVER_JS)
    .pipe(istanbul({includeUntested: true, instrumenter: isparta.Instrumenter}))
    // This overwrites `require` so it returns covered files
    .pipe(istanbul.hookRequire());
});
