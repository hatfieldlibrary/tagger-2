/*
 * Copyright (c) 2016.
 *
 *     This program is free software: you can redistribute it and/or modify
 *     it under the terms of the GNU General Public License as published by
 *     the Free Software Foundation, either version 3 of the License, or
 *     (at your option) any later version.
 *
 *     This program is distributed in the hope that it will be useful,
 *     but WITHOUT ANY WARRANTY; without even the implied warranty of
 *     MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 *     GNU General Public License for more details.
 *
 *     You should have received a copy of the GNU General Public License
 *     along with this program.  If not, see <http://www.gnu.org/licenses/>.
 */

/**
 * Created by mspalti on 12/13/16.
 */
(function () {
  'use strict';

  function TypeController(ContentTypeList,
                          CollectionObservable,
                          CollectionTypeTargetRemove,
                          CollectionTypeTargetAdd,
                          TypesForCollection,
                          TaggerToast) {

    const ctrl = this;

    /** {Object} */
    ctrl.selectedItem = null;

    /** {string} */
    ctrl.searchText = null;

    /** {boolean} */
    ctrl.isDisabled = false;

    /** @type {Array.<Object>} */
    ctrl.selectedTags = [];

    /** @type {Array.<Object>} */
    ctrl.globalTypes = ContentTypeList.query();

    /** @type {Array.<Object>} */
    ctrl.typesForCollection = [];

    /**
     * Watch for new collection id.
     * Update the tags when collection changes.
     */
    CollectionObservable.subscribe(function onNext() {
      let collid = CollectionObservable.get();
      _getTypesForCollection(collid);

    });

    function _getTypesForCollection(id) {
      var types = TypesForCollection
        .query({collId: id});
      types.$promise.then(function (data) {
        _setTypes(data);
      });
    }

    function _setTypes(types) {

      if (types.length > 0) {
        let objArray = [];
        for (let i = 0; i < types.length; i++) {
          objArray[i] = {id: types[i].ItemContent.id, name: types[i].ItemContent.name};
        }
        ctrl.typesForCollection = objArray;
      }
      else {
        ctrl.typesForCollection = [];
      }
    }


    /** @type {queryTypes} */
    ctrl.queryTypes = (query) => {
      return query ? ctrl.globalTypes.filter(createFilterFor(query)) : [];
    };


    /**
     * Function called when adding a content type chip.  The
     * function associates the content type with this
     * collection via db call. Toasts on success.
     * @param chip {Object} $chip
     * @returns {{id: *, name: *}}
     */
    ctrl.addType = function (chip) {

      var chipObj = {id: chip.id, name: chip.name};

      var result = CollectionTypeTargetAdd.query(
        {
          collId: CollectionObservable.get(),
          typeId: chip.id
        }
      );
      result.$promise.then(function (data) {
        if (data.status === 'success') {
          new TaggerToast('Content Type Added');

        } else {
          new TaggerToast('WARNING: Unable to add content type!');

        }
      });

      return chipObj;

    };

    /**
     * Function called when deleting a content type chip.  The
     * function removes the content type association with this
     * collection via db call. Toasts on success.
     * @param chip {Object} $chip
     */
    ctrl.removeType = function (chip) {
      var result = CollectionTypeTargetRemove.query(
        {
          collId: CollectionObservable.get(),
          typeId: chip.id
        }
      );

      result.$promise.then(function (data) {
        if (data.status === 'success') {
          new TaggerToast('Content Type Removed');
        } else {
          new TaggerToast('WARNING: Unable to remove content type!');
        }
      });
    };

    /**
     * Creates filter for content types
     * @param query  {string} term
     * @returns {Function}
     */
    function createFilterFor(query) {

      var regex = new RegExp(query, 'i');
      return function filterFn(item) {
        if (item.name.match(regex) !== null) {
          return true;
        }
        return false;
      };
    }

    ctrl.$onInit = function () {
      // Need to set at init to cover all cases.
      let id = CollectionObservable.get();
      _getTypesForCollection(id);
    };
  }

  taggerComponents.component('contentTypeSelector', {
    template: '<md-card flex>' +
    ' <md-toolbar class="md_primary">' +
    '   <div class="md-toolbar-tools">' +
    '     <i class="material-icons">local_movies</i>' +
    '     <h3 class="md-display-1">&nbsp;Content Types</h3>' +
    '     <span flex></span>' +
    '   </div>' +
    ' </md-toolbar>' +
    ' <md-card-content>' +
    '    <div layout="column">' +
    '       <md-input-container>' +
    '         <div layout="column" class="chips">' +
    '           <md-container>' +
    '             <label>Add Type</label>' +
    '             <md-chips class="tagger-chips" ng-model="$ctrl.typesForCollection" md-autocomplete-snap="" md-require-match="true" md-transform-chip="$ctrl.addType($chip)" md-on-remove="$ctrl.removeType($chip)">' +
    '               <md-autocomplete md-selected-item="$ctrl.selectedItem" md-min-length="1" md-search-text="searchText" md-no-cache="true" md-items="item in $ctrl.queryTypes(searchText)" md-item-text="item.tag">' +
    '                 <span md-highlight-text="searchText"> {{item.name}} </span>' +
    '               </md-autocomplete>' +
    '               <md-chip-template>' +
    '                 <span> {{$chip.name}} </span>' +
    '               </md-chip-template>' +
    '               <button md-chip-remove="" class="md-primary taggerchip">' +
    '                 <md-icon md-svg-icon="md-clear" aria-label="remove"></md-icon>' +
    '               </button>' +
    '             </md-chips>' +
    '            </md-container>' +
    '         </div>' +
    '       </md-input-container>' +
    '     </div>' +
    ' </md-card-content>' +
    '</md-card>',
    controller: TypeController
  });

})();

