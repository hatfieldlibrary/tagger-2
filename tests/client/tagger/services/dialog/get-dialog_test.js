/**
 * Created by mspalti on 1/31/17.
 */
'use strict';

describe('The dialog strategy for decorating with $mdDialog controller', () => {

  let $componentController, $controller;

  let AreasController;

  beforeEach(module('tagger'));

  beforeEach(inject((_$componentController_,
                     _$controller_) => {

    $componentController = _$componentController_;
    $controller = _$controller_;

  }));


  it('should return dialog for the main areas component.', () => {

    let ctrl = $componentController('areasComponent', null);

    ctrl.$onInit();

    let dialog = ctrl.dialog;
    expect(dialog.controller).toBeDefined();
    // get the controller for the new dialog.
    let dialogController = $controller(dialog.controller, {});
    expect(dialog.showDialog).toBeDefined();
    expect(dialogController.addArea).toBeDefined();
    expect(dialogController.deleteArea).toBeDefined();

  });

  it('should return dialog for the main collections component.', () => {

    let ctrl = $componentController('collectionComponent', null);

    ctrl.$onInit();

    let dialog = ctrl.dialog;
    expect(dialog.controller).toBeDefined();
    // get the controller for the new dialog.
    let dialogController = $controller(dialog.controller, {});
    expect(dialog.showDialog).toBeDefined();
    expect(dialogController.addCollection).toBeDefined();
    expect(dialogController.deleteCollection).toBeDefined();

  });

  it('should return dialog for the main tag component.', () => {

    let ctrl = $componentController('tagsComponent', null);

    ctrl.$onInit();

    let dialog = ctrl.dialog;
    expect(dialog.controller).toBeDefined();
    // get the controller for the new dialog.
    let dialogController = $controller(dialog.controller, {});
    expect(dialog.showDialog).toBeDefined();
    expect(dialogController.addTag).toBeDefined();
    expect(dialogController.deleteTag).toBeDefined();
    expect(dialogController.addAreaToTag).toBeDefined();
    expect(dialogController.removeAreaFromTag).toBeDefined();

  });

  it('should return dialog for the main item type component.', () => {

    let ctrl = $componentController('typesComponent', null);

    ctrl.$onInit();

    let dialog = ctrl.dialog;
    expect(dialog.controller).toBeDefined();
    // get the controller for the new dialog.
    let dialogController = $controller(dialog.controller, {});
    expect(dialog.showDialog).toBeDefined();
    expect(dialogController.deleteContentType).toBeDefined();
    expect(dialogController.addContentType).toBeDefined();

  });

  it('should return dialog for the main item type component.', () => {

    let ctrl = $componentController('groupsComponent', null);

    ctrl.$onInit();

    let dialog = ctrl.dialog;
    expect(dialog.controller).toBeDefined();
    // get the controller for the new dialog.
    let dialogController = $controller(dialog.controller, {});
    expect(dialog.showDialog).toBeDefined();
    expect(dialogController.deleteCategory).toBeDefined();
    expect(dialogController.addCategory).toBeDefined();

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
    expect(dialogController.addTag).toBeDefined();
    expect(dialogController.deleteTag).toBeDefined();

  });

  it('should return dialog for the subject tag button used by collection maintainers.', () => {

    let ctrl = $componentController('toggleTagAreaButton', null);

    ctrl.$onInit();

    let dialog = ctrl.dialog;
    expect(dialog.controller).toBeDefined();
    // get the controller for the new dialog.
    let dialogController = $controller(dialog.controller, {});
    expect(dialog.showDialog).toBeDefined();
    expect(dialogController.addTag).toBeDefined();
    expect(dialogController.deleteTag).toBeDefined();

  });

});
