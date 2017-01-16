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
const isparta = require('isparta');
import istanbul from 'gulp-istanbul';

// set the test environment variable.
process.env.NODE_ENV = "test";

gulp.task(tasks.SERVER_PRETEST, () => {
  return gulp.src('tests/server/integration/**/*.js')
    .pipe(istanbul({includeUntested: true, instrumenter: isparta.Instrumenter }))
    // This overwrites `require` so it returns covered files
    .pipe(istanbul.hookRequire());
});

gulp.task(tasks.SERVER_INTEGRATION_TEST,  [tasks.SERVER_PRETEST], function () {
  return gulp.src(['tests/server/integration/**/*.js'], { read: false })
    .pipe(mocha({ reporter: 'spec', timeout: 3000, globals: ['recursive','async-only'] }))
    .pipe(istanbul.writeReports())
    .on('error', util.log);
});


