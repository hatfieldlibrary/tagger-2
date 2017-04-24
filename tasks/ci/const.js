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
export const path = {
  SERVER: process.cwd() + '/server',
  CLIENT: process.cwd() + '/client'
};

export const tasks = {

  TRAVIS_CI: 'test-on-travis',
  COVERALLS: 'coveralls',
  ISTANBUL_PREFIGHT: 'server.pretest_test',
  SERVER_INTEGRATION_TEST: 'server.integration_test',
  SERVER_LINT_JS: 'server.lint',
  SERVER_UNIT_TESTS: 'server.unit_test',
  CLIENT_UNIT_TESTS: 'client.unit_test',
  SERVER_UNIT_FLIGHT: 'server.unit_coverage_test',
  CLIENT_UNIT_FLIGHT: 'client.unit_coverage_test'

};
