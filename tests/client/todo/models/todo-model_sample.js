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

describe('Todo', function() {
  var _Todo;

  beforeEach(module('test-app'));

  beforeEach(inject(function($injector) {
    _Todo = $injector.get('Todo');
  }));

  describe('instance', function() {
    it('should have the right prop for the instance', function() {
      /* jshint -W055 */
      var _todo = new _Todo();

      expect(_todo.todoMessage).toBeNull();
    });
  });

  describe('isValid', function() {
    it('should return false, invalid something2do', function() {
      /* jshint -W055 */
      var _todo = new _Todo();

      expect(_todo.isValid()).toBeFalsy();
    });

    it('should return true, new instance is valid', function() {
      /* jshint -W055 */
      var _todo = new _Todo();
      _todo.todoMessage = 'I have to walk the dog.';

      expect(_todo.isValid()).toBeTruthy();
    });
  });
});
