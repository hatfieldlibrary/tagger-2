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

describe('The dialog strategy for decorating $mdDialog with controller', () => {

  let $componentController, $controller, DialogStrategy;

  beforeEach(module('tagger'));

  beforeEach(inject((_$componentController_,
                     _$controller_,
                     _DialogStrategy_) => {

    $componentController = _$componentController_;
    $controller = _$controller_;
    DialogStrategy = _DialogStrategy_;

  }));


  it('should return dialog for the main areas component.', () => {

    let ctrl = $componentController('areasComponent', null);

    ctrl.$onInit();

    let dialog = ctrl.dialog;
    expect(dialog.controller).toBeDefined();
    // get the controller for the new dialog.
    let dialogController = $controller(dialog.controller, {});
    expect(dialog.showDialog).toBeDefined();
    expect(dialogController.add).toBeDefined();
    expect(dialogController.delete).toBeDefined();

  });

  it('should return dialog for the main collections component.', () => {

    let ctrl = $componentController('collectionComponent', null);

    ctrl.$onInit();

    let dialog = ctrl.dialog;
    expect(dialog.controller).toBeDefined();
    // get the controller for the new dialog.
    let dialogController = $controller(dialog.controller, {});
    expect(dialog.showDialog).toBeDefined();
    expect(dialogController.add).toBeDefined();
    expect(dialogController.delete).toBeDefined();

  });

  it('should return dialog for the main tag component.', () => {

    let ctrl = $componentController('tagsComponent', null);

    ctrl.$onInit();

    let dialog = ctrl.dialog;
    expect(dialog.controller).toBeDefined();
    // get the controller for the new dialog.
    let dialogController = $controller(dialog.controller, {});
    expect(dialog.showDialog).toBeDefined();
    expect(dialogController.add).toBeDefined();
    expect(dialogController.delete).toBeDefined();

  });

  it('should return dialog for the main item type component.', () => {

    let ctrl = $componentController('typesComponent', null);

    ctrl.$onInit();

    let dialog = ctrl.dialog;
    expect(dialog.controller).toBeDefined();
    // get the controller for the new dialog.
    let dialogController = $controller(dialog.controller, {});
    expect(dialog.showDialog).toBeDefined();
    expect(dialogController.delete).toBeDefined();
    expect(dialogController.add).toBeDefined();

  });

  it('should return dialog for the main item type component.', () => {

    let ctrl = $componentController('groupsComponent', null);

    ctrl.$onInit();

    let dialog = ctrl.dialog;
    expect(dialog.controller).toBeDefined();
    // get the controller for the new dialog.
    let dialogController = $controller(dialog.controller, {});
    expect(dialog.showDialog).toBeDefined();
    expect(dialogController.delete).toBeDefined();
    expect(dialogController.add).toBeDefined();

  });

  it('should return dialog for the main image upload component.', () => {

    let ctrl = $componentController('imageSelector', null);

    ctrl.$onInit();

    let dialog = ctrl.dialog;
    expect(dialog.controller).toBeDefined();
    // get the controller for the new dialog.
    let dialogController = $controller(dialog.controller, {});
    expect(dialog.showDialog).toBeDefined();
    expect(dialogController.uploadImage).toBeDefined();

  });

  it('should return dialog for the subject tag\'s area selector component.', () => {

    let ctrl = $componentController('tagAreaSelector', null);

    ctrl.$onInit();

    let dialog = ctrl.dialog;
    expect(dialog.controller).toBeDefined();
    // get the controller for the new dialog.
    let dialogController = $controller(dialog.controller, {});
    expect(dialog.showDialog).toBeDefined();
    expect(dialogController.add).toBeDefined();
    expect(dialogController.delete).toBeDefined();

  });

  it('should return dialog for the subject tag button used by collection maintainers.', () => {

    let ctrl = $componentController('toggleTagAreaButton', null);

    ctrl.$onInit();

    let dialog = ctrl.dialog;
    expect(dialog.controller).toBeDefined();
    // get the controller for the new dialog.
    let dialogController = $controller(dialog.controller, {});
    expect(dialog.showDialog).toBeDefined();
    expect(dialogController.add).toBeDefined();
    expect(dialogController.delete).toBeDefined();

  });

  it('should throw error when no matching controller is found.', () => {

    expect(
      function () {
        DialogStrategy.makeDialog('BAD_TYPE')
      }
    ).toThrow(new Error('WARNING: dialog controller not found for BAD_TYPE'));

  });


});
