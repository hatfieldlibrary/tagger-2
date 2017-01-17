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

/**
 * Tagger
 * 12/31/16
 *
 * @author Michael Spalti
 */
'use strict';

import gulp from 'gulp';
import ngAnnotate from 'gulp-ng-annotate';
import {path, tasks} from './const';

const JS = [
  path.DIST + '**/*.js',
  '!' + path.DIST + 'bower_components/**/*'
];

gulp.task(tasks.CLIENT_ANNOTATE_JS, () => {
  return gulp.src(JS, {base: path.DIST})
    .pipe(ngAnnotate({singleQuotes: true}))
    .pipe(gulp.dest(path.DIST));
});
