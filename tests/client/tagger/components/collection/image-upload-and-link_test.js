/**
 * Created by mspalti on 1/24/17.
 */
'use strict';

describe('The image components', () => {

  let $componentController;

  let testImage;

  let DialogStrategy,
    ThumbImageObservable;

  beforeEach(module('tagger'));

  beforeEach(() => {

    module(($provide) => {
      $provide.value('ThumbImageObservable', {
        set: (x) => {
        },
        get: () => {
        },
        subscribe: (o) => {
        }
      });
    });

    module(($provide) => {
      $provide.value('DialogStrategy', {
        makeDialog: () => {
        }
      });
    });

  });


  beforeEach(inject((_$componentController_) => {
    $componentController = _$componentController_;
  }));

  describe('The image link component', () => {

    it('should return the thumbnail image link', () => {

      let bindings = {
        imgname: 'test.png'
      };

      let ctrl = $componentController('thumbImageLink', null, bindings);

      let thumb = ctrl.getLink();

      expect(thumb).toEqual('/resources/img/thumb/test.png');

    });

    it('should return and empty string if no image is provided.', () => {
      let bindings = {
        imgname: ''
      };

      let ctrl = $componentController('thumbImageLink', null, bindings);

      let thumb = ctrl.getLink();

      expect(thumb).toEqual('');

    });

  });

  describe('The image upload component', () => {


    beforeEach((inject((_DialogStrategy_, _ThumbImageObservable_) => {
      DialogStrategy = _DialogStrategy_;
      ThumbImageObservable = _ThumbImageObservable_;
    })));

    beforeEach(() => {

      let thumbImageCallback;
      testImage = 'test_image.png';

      spyOn(DialogStrategy,'makeDialog');
      spyOn(ThumbImageObservable,'subscribe').and.callFake((callback)=> {
        thumbImageCallback = callback;
      });
      spyOn(ThumbImageObservable, 'set').and.callFake(() => {
        thumbImageCallback(testImage);
      })

    });

    it('should initialize the component', () => {

      let ctrl = $componentController('imageSelector', null);

      ctrl.$onInit();

      expect(DialogStrategy.makeDialog).toHaveBeenCalled();
      expect(ThumbImageObservable.subscribe).toHaveBeenCalled();


    });

    it('should update the thumb image.', () => {

      let ctrl = $componentController('imageSelector', null);

      ctrl.$onInit();

      ThumbImageObservable.set();

      expect(ctrl.thumbnailImage).toEqual(testImage);

    });

  });

});
