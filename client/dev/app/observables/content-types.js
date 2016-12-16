/**
 * Created by mspalti on 12/12/16.
 */
(function()  {

  'use strict';

  taggerServices.factory('ContentTypeListObserver', ['rx', function(rx){

    const Subject = new rx.Subject();
    let types = [];

    return {
      set: function set(update){
        if (update !== types) {
          types = update;
          Subject.onNext(types);
        }
      },
      get: function get() {
        return types;
      },
      subscribe: function (o) {
        return Subject.subscribe(o);
      }
    };
  }]);


})();
