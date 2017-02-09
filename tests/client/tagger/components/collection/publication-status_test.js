/**
 * Created by mspalti on 1/24/17.
 */
'use strict';

describe('The collection publication status', () => {

  let $componentController;

  let UpdatePublicationStatus,
    GetPublicationStatus,
    CollectionObservable,
    PublicationStatusObservable,
    TaggerToast,
    status,
    testCollectionId,
    publishQueryResponse,
    unPublishQueryResponse,
    pubStatus,
    deferredStatus,
    $rootScope;

  beforeEach(module('tagger'));

  beforeEach(() => {

    module(($provide) => {
      $provide.value('UpdatePublicationStatus', {
        query: () => {
        }
      });
    });

    module(($provide) => {
      $provide.value('GetPublicationStatus', {
        query: () => {
        }
      });
    });

    module(($provide) => {
      $provide.value('CollectionObservable', {
        set: (x) => {
        },
        get: () => {
        },
        subscribe: (o) => {
        }
      })
    });

    module(($provide) => {
      $provide.value('PublicationStatusObservable', {
        set: (x) => {
        },
        get: () => {
        },
        subscribe: (o) => {
        }
      })
    });

  });

  beforeEach(inject((_$componentController_) => {

    $componentController = _$componentController_;

  }));

  beforeEach(inject((_UpdatePublicationStatus_,
                     _GetPublicationStatus_,
                     _CollectionObservable_,
                     _PublicationStatusObservable_,
                     _TaggerToast_,
                     _$q_,
                     _$rootScope_) => {

    UpdatePublicationStatus = _UpdatePublicationStatus_;
    GetPublicationStatus = _GetPublicationStatus_;
    CollectionObservable = _CollectionObservable_;
    PublicationStatusObservable = _PublicationStatusObservable_;
    TaggerToast = _TaggerToast_;
    deferredStatus = _$q_.defer();
    $rootScope = _$rootScope_;

  }));

  beforeEach(() => {
    status = {status: 'success'};
    testCollectionId = 1;

    unPublishQueryResponse = {
      published: false,
      getCollectionObject: {
        published: false
      }
    };

    publishQueryResponse = {
      published: true,
      getCollectionObject: {
        published: true
      }
    };

    pubStatus = publishQueryResponse;

  });

  beforeEach(() => {

    let fakeCollectionObservableCallback = () => {
    };

    spyOn(UpdatePublicationStatus, 'query').and.callFake(() => {
      return {
        $promise: deferredStatus.promise
      }

    });

    spyOn(GetPublicationStatus, 'query').and.callFake(() => {
      return {
        $promise: {
          then: (callback) => {
            callback(pubStatus);
          }
        }
      }
    });

    spyOn(TaggerToast, 'toast');

    spyOn(PublicationStatusObservable, 'set');
    spyOn(CollectionObservable, 'set').and.callFake(() => {
      fakeCollectionObservableCallback(testCollectionId);
    });
    spyOn(CollectionObservable, 'get').and.returnValue(testCollectionId);
    spyOn(CollectionObservable, 'subscribe').and.callFake((callback) => {
      fakeCollectionObservableCallback = callback;
    });

  });

  it('should initialize the component with publish status true', () => {

    let ctrl = $componentController('pubStatusSwitch', null);

    ctrl.$onInit();



    expect(CollectionObservable.subscribe).toHaveBeenCalled();
    expect(GetPublicationStatus.query).toHaveBeenCalledWith({collId: 1});
    expect(ctrl.pubstatus).toBe(true);
    expect(ctrl.message).toEqual('Published');
    expect(PublicationStatusObservable.set).toHaveBeenCalledWith(true);

  });

  it('should toast if publication status updated failed.', () => {

    let ctrl = $componentController('pubStatusSwitch', null);

    ctrl.$onInit();

    ctrl.onChange();
    deferredStatus.resolve({status: 'failure'});
    $rootScope.$apply();
    expect(TaggerToast.toast).toHaveBeenCalledWith('WARNING: Unable to update publication status!');


  });

  it('should show collection as unpublished', () => {

    pubStatus = unPublishQueryResponse;

    let ctrl = $componentController('pubStatusSwitch', null);

    ctrl.$onInit();

    expect(ctrl.pubstatus).toBe(false);
    expect(ctrl.message).toEqual('Unpublished');

  });

  it('should update the publication status with collection change', () => {

    let ctrl = $componentController('pubStatusSwitch', null);

    ctrl.$onInit();

    CollectionObservable.set();

    expect(GetPublicationStatus.query).toHaveBeenCalled();
    expect(PublicationStatusObservable.set).toHaveBeenCalled();

  });

  it('should toggle the collection status', () => {

    let ctrl = $componentController('pubStatusSwitch', null);

    ctrl.$onInit();

    PublicationStatusObservable.set.calls.reset();

    ctrl.onChange(false);

    deferredStatus.resolve({status: 'success'});
    $rootScope.$apply();

    expect(ctrl.message).toEqual('Unpublished');
    expect(UpdatePublicationStatus.query).toHaveBeenCalledWith({collId: 1, status: false});
    expect(PublicationStatusObservable.set).toHaveBeenCalledWith(false);

    PublicationStatusObservable.set.calls.reset();

    ctrl.onChange(true);

    deferredStatus.resolve({status: 'success'});
    $rootScope.$apply();

    expect(ctrl.message).toEqual('Published');
    expect(UpdatePublicationStatus.query).toHaveBeenCalledWith({collId: 1, status: true});
    expect(PublicationStatusObservable.set).toHaveBeenCalledWith(true);
  });


});
