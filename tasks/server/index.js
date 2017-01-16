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
import runSequence from 'run-sequence';
import {tasks} from './const';

gulp.task(tasks.SERVER_TRAVIS_CI, () => {
  return new Promise((resolve, reject) => {
    runSequence(
      //  tasks.CLIENT_UNIT_TEST,
      tasks.SERVER_INTEGRATION_TEST,
      tasks.SERVER_COVERALLS,
      resolve
    );
  });
});

gulp.task(tasks.SERVER_UNIT_TESTS, () => {
    return new Promise((resolve, reject) => {
      runSequence(
        //  tasks.CLIENT_UNIT_TEST,
        tasks.AREA_UNIT_TESTS,

        resolve
      );
    });
  }
);
