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
 * Created by mspalti on 12/5/16.
 */
export const path = {
  ROOT: './',
  DEV: './server/'
};

export const tasks = {
  SERVER_BUILD_TEST: 'server.build_test',
  SERVER_PRETEST: 'server.pretest_test',
  SERVER_INTEGRATION_TEST: 'server.integration_test',
  SERVER_LINT_JS: 'server.lint',
  SERVER_TRAVIS_CI: 'server.test-on-travis',
  SERVER_COVERALLS: 'server.coveralls',
  SERVER_UNIT_TESTS: 'server.unit_test',
  AREA_UNIT_TESTS: 'server.area_test'
};

