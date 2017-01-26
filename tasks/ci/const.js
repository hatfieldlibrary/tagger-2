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
