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


'use strict';

import gulp from 'gulp';
import {path, tasks} from './const';
import usemin from 'gulp-usemin';
import uglify from 'gulp-uglify';
import cssmin from 'gulp-clean-css';
import htmlmin from 'gulp-htmlmin';
import rev from 'gulp-rev-append';

const VIEWS = [
  path.DIST + '**/*.html',
  '!' + path.DIST + 'bower_components/**/*.html'
];

gulp.task(tasks.CLIENT_VIEWS_PREPARE, () => {
  return gulp.src(VIEWS, {base: path.DIST})
    .pipe(
      usemin(
        {
          css: [rev()],
          html: [
            htmlmin({
              collapseWhitespace: true,
              caseSensitive: true
            })
          ],
          jsApp: [
            uglify(),
            rev()
          ],
          jsLib: [
            'concat',
            rev()
          ],
          inlinejs: [uglify()],
          inlinecss: [cssmin(), 'concat']
        }
      )
    )
    .pipe(gulp.dest(path.DIST));
});
