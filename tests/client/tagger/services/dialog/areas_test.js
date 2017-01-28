/**
 * Created by mspalti on 1/27/17.
 */
'use strict';

describe('The areas dialog', () => {

  let $controller;

  let ShowDialog,
    AreaDialog,
    $mdDialog,
    AreaList,
    DialogTest,
    $rootScope,
    controller,
    dialog;

  beforeEach(module('tagger'));


  beforeEach(module(($provide) => {

    $provide.value('AreaList', {
      query: () => {
      }
    });

    $provide.value('ShowDialog', {
      showDialog: () => {
      }
    })

  }));

  beforeEach(inject((_$controller_) => {
    $controller = _$controller_;
  }));

  beforeEach(inject((_$mdDialog_, _ShowDialog_, _AreaDialog_, _AreaList_, _$rootScope_) => {

    $mdDialog = _$mdDialog_;
    ShowDialog = _ShowDialog_;
    AreaDialog = _AreaDialog_;
    AreaList = _AreaList_;
    let obj = Object.assign({}, ShowDialog, AreaDialog);
    dialog = obj.showDialog(null, 'templates/dialog/addAreaMessage.html');
    $rootScope = _$rootScope_;


  }));

  beforeEach(() => {

    // spyOn($mdDialog, 'show');
    spyOn(ShowDialog, 'showDialog').and.callFake(() => {
      return AreaDialog
    });
    spyOn(AreaList, 'query');

  });

  it('should do something', () => {

    //let ctrl = dialog.controller();
    //
    // let dialog = ShowDialog.showDialog();
    // let ctrl = new dialog.controller;
    //
    // // let options = {
    // //   parent: null,
    // //     targetEvent: null,
    // //   templateUrl: '<div></div>',
    // //   controller: controller,
    // //   controllerAs: 'vm'
    // // };
    //
    // // let d = dialog.showDialog();
    // //  let ctrl = $controller(dialogController,{});
    //
    // ctrl.getAreaList();
    //expect(AreaList.query).toHaveBeenCalled();

  });


});
