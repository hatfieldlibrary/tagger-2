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

import coveralls from 'gulp-coveralls';
import {path, tasks} from './const';
import gulp from 'gulp';

gulp.task(tasks.COVERALLS, () => {
  return gulp.src('coverage/**/lcov.info')
    .pipe(coveralls())
    .on('error', function(err) {console.log(err)} );;
});
