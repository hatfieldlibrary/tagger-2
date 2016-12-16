/**
 * Created by mspalti on 12/12/16.
 */
(function()  {

  'use strict';

  taggerServices.factory('ContentTypeObserver', ['rx', function(rx){

    const Subject = new rx.Subject();
    let contentType = 0;

    return {
      set: function set(update){
        if (update !== contentType) {
          contentType = update;
          Subject.onNext(contentType);
        }
      },
      get: function get() {
        return contentType;
      },
      subscribe: function (o) {
        return Subject.subscribe(o);
      }
    };
  }]);

})();
