/**
 * Created by mspalti on 12/13/16.
 */
(function () {

  function AreaController($rootScope,
                          TaggerToast,
                          AreaTargetAdd,
                          AreaTargetRemove,
                          AreasForCollection,
                          CollectionObserver,
                          AreaListObserver) {

    const ctrl = this;

    CollectionObserver.subscribe(function onNext() {
      _getCurrentAreaTargets(CollectionObserver.get());
    });

    AreaListObserver.subscribe(function onNext() {
      ctrl.areas = AreaListObserver.get();
    });

    /**
     * Gets the list of areas associated with the current
     * collection
     * @param id  {number} the collection id
     */
    function _getCurrentAreaTargets(id) {
      const areas = AreasForCollection.query({collId: id});
      areas.$promise.then(function(data) {
           ctrl.areaTargets = data;
      });
    }

    /**
     * Private method. Searches for area id in the current list of
     * area associations.
     * @param areaId  {number} the area ID
     * @param target  {Array.<Object>} the areas associated with the collection.
     * @returns {boolean}
     */
    var _findArea = function (areaId, targets) {

      for (var i = 0; i < targets.length; i++) {
        if (targets[i].AreaId === areaId) {
          return true;
        }
      }
      return false;
    };

    /**
     * Tests to see if the collection area is currently
     * associated with this collection.
     * @param areaId   {number} area ID
     * @returns {boolean}
     */
    ctrl.isChosen = function (areaId) {
       if (ctrl.areaTargets) {
         return _findArea(areaId, ctrl.areaTargets);
       }

    };

    /**
     * Adds or removes the association between a collection and a
     * collection area.  If the association already exists, it is
     * removed.  If it is a new association, it is added. Toasts
     * on success.
     * @param areaId  {number} the area ID
     */
    ctrl.update = function (areaId) {

      if (ctrl.areaTargets !== undefined) {
        // If the area id of the selected checkbox is a
        // already a target, then delete the area target.
        if (_findArea(areaId, ctrl.areaTargets)) {
          if (ctrl.areaTargets.length === 1) {
            new TaggerToast('Cannot remove area.  Collections must belong to at least one area.');

          } else {
            var result = AreaTargetRemove.query({collId: CollectionObserver.get(), areaId: areaId});
            result.$promise.then(function (data) {
              if (data.status === 'success') {
                ctrl.areaTargets = result.areaTargets;

                // probably some way to avoid this
                $rootScope.$broadcast('removedFromArea');

                new TaggerToast('Collection removed from area.');
              }
            });
          }
        }
        // If the area id of the selected item is
        // not a target already, add a new area target.
        else {
          var add = AreaTargetAdd.query({collId: CollectionObserver.get(), areaId: areaId});
          add.$promise.then(function (data) {
            if (data.status === 'success') {
              ctrl.areaTargets = add.areaTargets;
              new TaggerToast('Collection added to Area.');
            }
          });
        }
      }

    };

   ctrl.$onInit = function () {
       ctrl.areas = AreaListObserver.get();
       ctrl.areaTargets =  _getCurrentAreaTargets(CollectionObserver.get());
   }

  }

  taggerComponents.component('areaSelector', {

    template: '<md-content class="transparent"><md-card>' +
    '  <md-toolbar class="md-primary">' +
    '   <div class="md-toolbar-tools">' +
    '     <i class="material-icons"> public </i>' +
    '     <h3 class="md-display-1"> &nbsp;Areas</h3>' +
    '    </div>' +
    '   </md-toolbar>' +
    '   <md-card-content>' +
    '      <div layout="column" class="md-subhead">Select the Areas in which this Collection will appear.' +
    '        <md-container layout="column">' +
    '           <md-checkbox ng-repeat="area in $ctrl.areas" aria-label="Areas" value="area.id" ng-checked=$ctrl.isChosen(area.id) ng-click="$ctrl.update(area.id)">{{area.title}}</md-checkbox>' +
    '        </md=container>' +
    '      </div>' +
    '   </md-content>' +
    '</md-card></md-content>',
    controller: AreaController

  });
})();
