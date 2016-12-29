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
 * 12/29/16
 *
 * @author Michael Spalti
 */

import gulp from 'gulp';
import babel from 'gulp-babel';
import {path, tasks} from './const';

const JS = [
  path.DIST + '**/*.js',
  '!' + path.DIST + 'bower_components/**/*'
];

gulp.task(tasks.CLIENT_BABEL_JS, () => {
  return gulp.src(JS, {base: path.DIST})
    .pipe(babel())
    .pipe(gulp.dest(path.DIST));
});
