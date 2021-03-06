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

'use strict';

import gulp from 'gulp';
import runSequence from 'run-sequence';
import {path, tasks} from './const';

gulp.task(tasks.CLIENT_BUILD_DIST, () => {
  return new Promise((resolve, reject) => {
    runSequence(
      tasks.CLIENT_LINT_JS,
      tasks.CLIENT_DEL_DIST,
      tasks.CLIENT_COPY,
      tasks.CLIENT_ANNOTATE_JS,
      tasks.CLIENT_BABEL_JS,
      tasks.CLIENT_IMAGE_DIST,
      tasks.CLIENT_VIEWS_PREPARE,
      resolve
    );
  });
});

