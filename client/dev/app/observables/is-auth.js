/**
 * Created by mspalti on 12/12/16.
 */
(function()  {

  'use strict';

  taggerServices.factory('IsAuthObserver', ['rx', function(rx){

    const Subject = new rx.Subject();
    let auth = false;

    return {
      set: function set(update){
        auth = update;
        Subject.onNext(auth);
      },
      get: function get() {
        return auth;
      },
      subscribe: function (o) {
        return Subject.subscribe(o);
      }
    };
  }]);

})();
