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
 * Created by mspalti on 1/31/17.
 */
'use strict';

/*jshint expr: true*/

describe('The show dialog service', () => {

  let $mdDialog,
    ShowDialog,
    deferred,
    $rootScope,
    $q;

  beforeEach(module('tagger'));

  beforeEach(module(($provide) => {

      $provide.value('$mdDialog', {
        show: () => {
        }
      })
    }
  ));

  beforeEach(inject((_$mdDialog_,
                     _ShowDialog_,
                     _$q_, _$rootScope_) => {

    $mdDialog = _$mdDialog_;
    ShowDialog = _ShowDialog_;
    $q = _$q_;
    $rootScope = _$rootScope_;

  }));

  beforeEach(() => {
    spyOn($mdDialog, 'show').and.callFake(() => {
      deferred = $q.defer();
      return deferred.promise;
    });

  });

  it('should open the $mdDialog', () => {


    ShowDialog.showDialog();
    deferred.resolve();
    $rootScope.$apply();
    expect($mdDialog.show.calls.count()).toEqual(1);


  });


});
