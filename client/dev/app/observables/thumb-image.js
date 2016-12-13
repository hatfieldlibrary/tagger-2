/**
 * Created by mspalti on 12/12/16.
 */
/**
 * Created by mspalti on 12/11/16.
 */
(function()  {

  'use strict';

  taggerServices.factory('ThumbImageObserver', ['rx', function(rx){

    const Subject = new rx.Subject();
    let thumb = '';

    return {
      set: function set(update){
        thumb = update;
        Subject.onNext(thumb);
      },
      get: function get() {
        return thumb;
      },
      subscribe: function (o) {
        return Subject.subscribe(o);
      }
    };
  }]);

})();
