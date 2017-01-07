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

export const path = {
  ROOT: './',
  DEV: './client/dev/',
  DIST: './client/dist/'
};

export const tasks = {
  CLIENT_VIEWS_PREPARE: 'client.prepare:dist',
  CLIENT_ANNOTATE_JS: 'client.annotate:dist',
  CLIENT_BABEL_JS: 'client.babel:dist',
  CLIENT_IMAGE_DIST: 'client.imgs:dist',
  CLIENT_DEL_DIST: 'client.del:dist',
  CLIENT_LINT_JS: 'client.lint',

  CLIENT_COPY: 'client.copy',

  CLIENT_UNIT_TEST: 'client.unit_test',
  CLIENT_COVERAGE: 'client.coverage',

  CLIENT_WATCH: 'client.watch',

  CLIENT_RELOAD: 'client.reload',

  CLIENT_BUILD_DIST: 'client.build:dist'
};
