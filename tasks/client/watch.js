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
import browserSync from 'browser-sync';
import {path, tasks} from './const';

const JS = path.DEV + '**/*.js';
const CSS = path.DEV + '**/*.css';
const HTML = path.DEV + '**/*.html';

gulp.task(tasks.CLIENT_RELOAD, () => {
  return browserSync.reload();
});

gulp.task(tasks.CLIENT_WATCH, () => {

  browserSync({port: 3000, proxy: "http://localhost:3333/tagger/", reloadDelay: 1000});

  let _watchable = [];

  _watchable.push(JS);
  _watchable.push(CSS);
  _watchable.push(HTML);

  return gulp.watch(_watchable, [tasks.CLIENT_RELOAD]);
});
