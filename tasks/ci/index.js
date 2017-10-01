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
import {tasks} from './const';
import gulp from 'gulp';
import runSequence from 'run-sequence';

gulp.task(tasks.TRAVIS_CI, () => {
  return new Promise((resolve, reject) => {
    runSequence(
      tasks.SERVER_LINT_JS,
      tasks.ISTANBUL_PREFIGHT,
    //  tasks.SERVER_UNIT_TESTS,
      tasks.CLIENT_UNIT_TESTS,
      tasks.COVERALLS,
      tasks.SERVER_INTEGRATION_TEST,
      resolve
    );
  });
});

gulp.task(tasks.CLIENT_UNIT_FLIGHT, () => {
  return new Promise((resolve, reject) => {
    runSequence(
      tasks.ISTANBUL_PREFIGHT,
      tasks.CLIENT_UNIT_TESTS,
      resolve
    );
  });

});

gulp.task(tasks.SERVER_UNIT_FLIGHT, () => {
  return new Promise((resolve, reject) => {
    runSequence(
      tasks.ISTANBUL_PREFIGHT,
     // tasks.SERVER_UNIT_TESTS,
      resolve
    );
  });

});
