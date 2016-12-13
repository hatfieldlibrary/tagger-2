/**
 * Created by mspalti on 12/12/16.
 */
(function()  {

  'use strict';

  taggerServices.factory('CollectionObserver', ['rx', function(rx){

    const Subject = new rx.Subject();
    let collection = 0;

    return {
      set: function set(update){
        collection = update;
        Subject.onNext(collection);
      },
      get: function get() {
        return collection;
      },
      subscribe: function (o) {
        return Subject.subscribe(o);
      }
    };
  }]);

})();
