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
