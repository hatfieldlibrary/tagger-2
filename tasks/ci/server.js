/*
 * Copyright (c) 2017.
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

/**
 * Created by mspalti on 1/16/17.
 */

'use strict';

import gulp from 'gulp';
import {tasks} from './const';
import mocha from 'gulp-mocha';
import istanbul from 'gulp-istanbul';
import util from 'gulp-util';

gulp.task(tasks.SERVER_INTEGRATION_TEST, function () {
  return gulp.src(['tests/server/integration/**/*.js'], { read: false })
    .pipe(mocha({ reporter: 'spec', timeout: 3000, globals: ['recursive','async-only'] }))
    .pipe(istanbul.writeReports())
    .on('error', util.log);
});

// gulp.task(tasks.SERVER_UNIT_TESTS, function() {
//   return gulp.src(['tests/server/unit/**/*.js'], {read: false})
//     .pipe(mocha({ reporter: 'spec', timeout: 3000, globals: ['recursive','async-only'] }))
//     .pipe(istanbul.writeReports())
//     .on('error', util.log);
//
// });
