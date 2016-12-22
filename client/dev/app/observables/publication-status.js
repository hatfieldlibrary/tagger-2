/**
 * Created by mspalti on 12/22/16.
 */
(function()  {

  'use strict';

  taggerServices.factory('PublicationStatusObserver', ['rx', function(rx){

    const Subject = new rx.Subject();
    let tag = 0;

    return {
      set: function set(update){
        tag = update;
        Subject.onNext(tag);
      },
      get: function get() {
        return tag;
      },
      subscribe: function (o) {
        return Subject.subscribe(o);
      }
    };
  }]);

})();
