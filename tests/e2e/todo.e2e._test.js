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

"use strict";

describe('todo.e2e', function() {
    var SUBMIT_TODO_BUTTON = '#submit-todo-button';
    var TODO_MODEL = 'todosCtrl.todo.todoMessage';
    var CLOSE_TODO = '.todo-done';

    beforeEach(function() {
        browser.get('/');
    })

    describe('creation', function() {
        it('should have the submit button disabled', function() {
            expect($(SUBMIT_TODO_BUTTON).isEnabled()).toBeFalsy();
        })

        it('should have the right title', function() {
            expect(browser.getTitle()).toEqual('Stuff Todo!');
        })
    })

    describe('addition', function() {
        it('should add a new todo - enter', function() {
            element(by.model(TODO_MODEL)).sendKeys('This was added by Protractor :D (at '+String(new Date())+')');

            element(by.model(TODO_MODEL)).sendKeys(protractor.Key.ENTER);

            var _count = element.all(by.repeater('t in todosCtrl.todos')).count();

            expect(_count).toBeGreaterThan(0);
        })

        it('should add a new todo - click', function() {
          element(by.model(TODO_MODEL)).sendKeys('Added by Protractor :D (at '+String(new Date())+')');

          $(SUBMIT_TODO_BUTTON)
            .click()
            .then(function() {
                element.all(by.repeater('t in todosCtrl.todos'))
                  .count()
                  .then(function(count) {
                      expect(count).toBeGreaterThan(0);
                  });
            });
        })
    })

    describe('deletion', function() {
        it('should delete a todo', function() {
            var _firstCount = element.all(by.repeater('t in todosCtrl.todos')).count();

            $$(CLOSE_TODO)
              .get(0)
              .click(function() {
                  var _secondCount = element.all(by.repeater('t in todosCtrl.todos')).count();

                  expect(_secondCount).toBeLessThan(_firstCount);
              });
        })
    })
})
