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
 * Created by mspalti on 1/30/17.
 */
'use strict';

/*jshint expr: true*/

describe('The image upload dialog controller', () => {

  let $controller;

  let $mdDialog,
    CollectionObservable,
    ThumbImageObservable,
    TaggerToast,
    httpBackend,
    Upload,
    $rootScope,
    deferred,
    dialogController;

  beforeEach(module('tagger'));


  beforeEach(module(($provide) => {

    $provide.value('$mdDialog', {
      hide: () => {

      }
    });

    $provide.value('Upload', {
      upload: () => {
      }
    });


    $provide.value('TaggerToast', {
      toast: () => {
      }
    });

    $provide.value('CollectionObservable', {
      get: () => {
      }
    });


    $provide.value('ThumbImageObservable', {
      set: () => {
      }
    });


  }));

  beforeEach(inject((_$controller_) => {
    $controller = _$controller_;
  }));

  beforeEach(inject((_$httpBackend_,
                     _$mdDialog_,
                     _ImageDialog_,
                     _Upload_,
                     _TaggerToast_,
                     _CollectionObservable_,
                     _ThumbImageObservable_,
                     _$rootScope_,
                     _$q_) => {

    httpBackend = _$httpBackend_;
    $mdDialog = _$mdDialog_;
    Upload = _Upload_;
    ThumbImageObservable = _ThumbImageObservable_;
    dialogController = _ImageDialog_.controller;
    TaggerToast = _TaggerToast_;
    CollectionObservable = _CollectionObservable_;
    $rootScope = _$rootScope_;
    deferred =  _$q_.defer();

  }));

  beforeEach(() => {


  });

  beforeEach(() => {

    spyOn(Upload, 'upload').and.callFake(() => {
      return deferred.promise;
    });
    spyOn(ThumbImageObservable, 'set');
    spyOn(CollectionObservable, 'get').and.returnValue(1);
    spyOn(TaggerToast, 'toast');
    spyOn($mdDialog, 'hide');

  });


  it('should upload an image', () => {

    let ctrl = $controller(dialogController, {});

    spyOn(ctrl, 'closeDialog').and.callThrough();

    ctrl.uploadImage('test.png');
    deferred.resolve({config: {file: {name: 'test.png'}}});
    $rootScope.$apply();

    let imageInfo = {
      url: '/tagger/collection/image',
      file: 'test.png',
      fields: {id: 1}
    };

    expect(CollectionObservable.get).toHaveBeenCalled();
    expect(Upload.upload).toHaveBeenCalledWith(imageInfo);
    expect(ThumbImageObservable.set).toHaveBeenCalledWith('test.png');
    expect(ctrl.closeDialog).toHaveBeenCalled();
    expect($mdDialog.hide).toHaveBeenCalled();

  });

  it('should throw error when add is called', () => {

    let ctrl = $controller(dialogController, {});

    let errorTest = function() {
      ctrl.add();
    };
    expect(errorTest).toThrow(new Error('Call to unimplemented function.'));

  });

  it('should throw error when delete is called', () => {

    let ctrl = $controller(dialogController, {});

    let errorTest = function() {
      ctrl.delete();
    };
    expect(errorTest).toThrow(new Error('Call to unimplemented function.'));

  });


});

