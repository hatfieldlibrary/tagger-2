/*
 * Copyright (c) 2016.
 *
 *     This program is free software: you can redistribute it and/or modify
 *     it under the terms of the GNU General Public License as published by
 *     the Free Software Foundation, either version 3 of the License, or
 *     (at your option) any later version.
 *
 *     This program is distributed in the hope that it will be useful,
 *     but WITHOUT ANY WARRANTY; without even the implied warranty of
 *     MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 *     GNU General Public License for more details.
 *
 *     You should have received a copy of the GNU General Public License
 *     along with this program.  If not, see <http://www.gnu.org/licenses/>.
 */

import gulp from 'gulp';
import {tasks} from './const';
import mocha from 'gulp-mocha';
import util from 'gulp-util';
import coveralls from 'gulp-coveralls';
import istanbul from 'gulp-istanbul'

// set the test environment variable.
process.env.NODE_ENV = "test";

gulp.task(tasks.SERVER_PRETEST, () => {
  return gulp.src('test/**/*.js')
    .pipe(istanbul())
    // This overwrites `require` so it returns covered files
    .pipe(istanbul.hookRequire());
});

gulp.task(tasks.SERVER_INTEGRATION_TEST,  [tasks.SERVER_PRETEST], function () {
  return gulp.src(['tests/server/tagger/**/*.js'], { read: false })
    .pipe(mocha({ reporter: 'spec', timeout: 3000, globals: ['recursive','async-only'] }))
    .pipe(istanbul.writeReports())
    .on('error', util.log);
});

gulp.task('coveralls', [tasks.SERVER_INTEGRATION_TEST], function() {
  // lcov.info is the file which has the coverage information we wan't to upload
  if (!process.env.CI) return;
  return gulp.src(__dirname + '/coverage/lcov.info')
    .pipe(coveralls());
});


