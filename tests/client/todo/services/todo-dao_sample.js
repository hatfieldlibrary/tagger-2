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

describe('todo.dao', function() {
  var _rootScope, _scope, _httpBackend, _TodoDAO, _Todo;
  var URL_GET_ALL = '/api/todos';
  var URL_CREATE_TODO = '/api/todos';
  var URL_DELETE_TODO = '/api/todos/';

  beforeEach(module('test-app'));

  beforeEach(inject(function($injector) {
    _rootScope = $injector.get('$rootScope');
    _scope = _rootScope.$new();
    _httpBackend = $injector.get('$httpBackend');
    _Todo = $injector.get('Todo');
    _TodoDAO = $injector.get('TodoDAO');
  }));

  describe('getAll', function() {
    describe('error', function() {
      it('should try to get todos from the server, but the server return an error', function() {
        var _response = {
          someError: ':('
        };

        _httpBackend.expectGET(URL_GET_ALL).respond(400, _response);

        var _onSuccess = function() {
          expect(true).toBeFalsy(); // should not come here
        };

        var _onError = function(error) {
          expect(error).toBeDefined();
          expect(error.data.someError).toEqual(_response.someError);
        };

        _TodoDAO
          .getAll()
          .then(_onSuccess)
          .catch(_onError);

        _httpBackend.flush();
      });
    });

    describe('success', function() {
      it('should try get todos from the server, server returns OK', function() {
        var _response = [{
          an: 'array',
          of: 'todos'
        }];

        _httpBackend.expectGET(URL_GET_ALL).respond(200, _response);

        var _onSuccess = function(todos) {
          expect(window.angular.equals(_response.an, todos.an));
          expect(window.angular.equals(_response.of, todos.of));
        };

        var _onError = function() {
          expect(true).toBeFalsy(); // should not come here
        };

        _TodoDAO
          .getAll()
          .then(_onSuccess)
          .catch(_onError);

        _httpBackend.flush();
      });
    });
  });

  describe('createTodo', function() {
    it('should return the promise as an error - object is not a valid instanceof Todo', function() {
      /* jshint -W055 */
      var _invalidTodo = new _Todo();
      _invalidTodo.todoMessage = '';

      var _onSuccess = function() {
        expect(true).toBeFalsy();
      };

      var _onError = function(error) {
        expect(error).toBeDefined();
        expect(error instanceof TypeError).toBeTruthy();
        expect(error.message).toEqual('Invalid todo to be created.');
      };

      _TodoDAO
        .createTodo(_invalidTodo)
        .then(_onSuccess)
        .catch(_onError);

      _rootScope.$digest();
    });

    it('should return the promise as an error - server returns an error', function() {
      /* jshint -W055 */
      var _validTodo = new _Todo();
      _validTodo.todoMessage = 'abcdef';

      _httpBackend.expectPOST(URL_CREATE_TODO, _validTodo).respond(400, {
        someError: 'here'
      });

      var _onSuccess = function() {
        expect(true).toBeFalsy();
      };

      var _onError = function(error) {
        expect(error).toBeDefined();
        expect(error.data.someError).toEqual('here');
      };

      _TodoDAO
        .createTodo(_validTodo)
        .then(_onSuccess)
        .catch(_onError);

      _httpBackend.flush();
    });

    it('should return the just created todo', function() {
      var _response = {
        _id: 'abcdef123',
        todoMessage: 'abcdef',
        createdAt: Date.now()
      };

      /* jshint -W055 */
      var _validTodo = new _Todo();
      _validTodo.todoMessage = 'abcdef';

      _httpBackend.expectPOST(URL_CREATE_TODO, _validTodo).respond(200, _response);

      var _onSuccess = function(todo) {
        expect(window.angular.equals(todo, _response));
      };

      var _onError = function() {
        expect(true).toBeFalsy();
      };

      _TodoDAO
        .createTodo(_validTodo)
        .then(_onSuccess)
        .catch(_onError);

      _httpBackend.flush();
    });
  });

  describe('deleteTodo', function() {
    it('should return with an error, id not informed', function() {
      var _id = null;

      var _onSuccess = function() {
        expect(true).toBeFalsy();
      };

      var _onError = function(error) {
        expect(error).toBeDefined();
        expect(error instanceof TypeError).toBeTruthy();
        expect(error.message).toEqual('Invalid id for deletion.');
      };

      _TodoDAO
        .deleteTodo(_id)
        .then(_onSuccess)
        .catch(_onError);

      _rootScope.$digest();
    });

    it('should try to delete todo, but server returns error - 400', function() {
      var _id = 'abc';

      _httpBackend.expectDELETE(URL_DELETE_TODO + _id).respond(400);

      var _onSuccess = function() {
        expect(true).toBeFalsy();
      };

      var _onError = function() {
        expect(true).toBeTruthy();
      };

      _TodoDAO
        .deleteTodo(_id)
        .then(_onSuccess)
        .catch(_onError);

      _httpBackend.flush();
    });

    it('should delete todo correctly', function() {
      var _id = 'abc';

      _httpBackend.expectDELETE(URL_DELETE_TODO + _id).respond(200);

      var _onSuccess = function() {
        expect(true).toBeTruthy();
      };

      var _onError = function() {
        expect(true).toBeFalsy();
      };

      _TodoDAO
        .deleteTodo(_id)
        .then(_onSuccess)
        .catch(_onError);

      _httpBackend.flush();
    });
  });
});
