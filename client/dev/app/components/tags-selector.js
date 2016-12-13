/**
 * Directive used to associate a TAG with a COLLECTION.
 */

(function () {


  function TagsCtrl(CollectionTagsObserver,
                    TagListObserver,
                    TagsForAreaObserver) {

    const ctrl = this;

    CollectionTagsObserver.subscribe(function onNext() {

      const tags = CollectionTagsObserver.get();
      let objArray = [];
      if (tags.length > 0) {
        for (var i = 0; i < tags.length; i++) {
          objArray[i] = {id: tags[i].Tag.id, name: tags[i].Tag.name};
        }
        ctrl.tagsForCollection = objArray;

      } else {
        ctrl.tagsForCollection = [];
      }
    });

    TagListObserver.subscribe(function onNext() {
      ctrl.tagsForArea = TagsForArea.query({areaId: Data.currentAreaIndex});
    });

    TagsForAreaObserver.subscribe(function onNext() {
        ctrl.tagsForArea = TagsForAreaObserver.get();
    });


    /**
     * Returns filter.
     * @param query
     * @returns {*}
     */
    function queryTags(query) {
      return query ? ctrl.tagsForArea.filter(createFilterFor(query)) : [];

    }

    /**
     * Filter for the md-autocomplete component.
     * @type {queryTags}
     */
    ctrl.queryTags = queryTags;


    /**
     * Function called when appending a chip.  Adds a new subject association
     * for the collection. Toasts response from the service.
     * @param chip  {Object} $chip
     * @returns {{id: *, name: *}}
     */
    ctrl.addTag = function (chip) {
      let chipObj = {id: chip.Tag.id, name: chip.Tag.name};
      let result = CollectionTagTargetAdd.query(
        {
          collId: Data.currentCollectionIndex,
          tagId: chip.Tag.id
        }
      );
      result.$promise.then(function (data) {
        if (data.status === 'success') {
          new TaggerToast('Subject Tag Added');

        } else {
          new TaggerToast('WARNING: Unable to add subject tag!');
          return {};

        }
      });

      return chipObj;

    };

    /**
     * Function called when deleting a subject chip.  The function
     * deletes the subject association with this collection
     * via db call. Toasts on success.
     * @param chip  {Object} $chip
     */
    ctrl.removeTag = function (chip) {
      const result = CollectionTagTargetRemove.query(
        {
          collId: Data.currentCollectionIndex,
          tagId: chip.id
        }
      );
      result.$promise.then(function (data) {
        if (data.status === 'success') {
          new TaggerToast('Subject Tag Removed');
        } else {
          new TaggerToast('WARNING: Unable to remove subject tag!');
        }
      });
    };


    /**
     * Watch for changes to the subject tags associated with
     * the collection area.
     */
    // $scope.$watch(function () {
    //     return Data.tagsForArea;
    //   },
    //   function (newValue) {
    //     $scope.tagsForArea = newValue;
    //   }
    // );

    /**
     * Watch for changes to the subject tags associated with
     * this collection.
    //  */
    // $scope.$watch(function () {
    //     return Data.tagsForCollection;
    //   },
    //   function (newValue) {
    //     if (newValue.length > 0) {
    //       var objArray = [];
    //       for (var i = 0; i < newValue.length; i++) {
    //         objArray[i] = {id: newValue[i].Tag.id, name: newValue[i].Tag.name};
    //       }
    //       $scope.tagsForCollection = objArray;
    //
    //     } else {
    //       $scope.tagsForCollection = [];
    //     }
    //   }
    // );

    /**
     * Watch for changes to the list of globally available tags.
     * On change, update the tag list for the current area.
     */
    // $scope.$watch(function () {
    //     return Data.tags;
    //   },
    //   function () {
    //     $scope.tagsForArea = TagsForArea.query({areaId: Data.currentAreaIndex});
    //
    //
    //   });

    /**
     * Creates a regex filter for the search term
     * @param query {string} term to match
     * @returns {Function}
     */
    function createFilterFor(query) {
      const regex = new RegExp(query, 'i');
      return function filterFn(tagItem) {
        if (tagItem.Tag.name.match(regex) !== null) {
          return true;
        }
        return false;
      };
    }

  }

  taggerComponents.component('subjectSelector', {


    template: '<md-card flex>' +
    ' <md-toolbar class="md_primary">' +
    '   <div class="md-toolbar-tools">     ' +
    '     <i class="material-icons">link</i>     ' +
    '     <h3 class="md-display-1">&nbsp;Subject Tags</h3>     ' +
    '     <span flex="" class="flex"></span>   </div>' +
    ' </md-toolbar>' +
    ' <md-card-content>' +
    '    <div layout="column">' +
    '       <md-input-container>' +
    '         <div layout="column" class="chips">' +
    '           <md-container>' +
    '             <label>Add Tags</label>' +
    '             <md-chips class="tagger-chips" ng-model="ctrl.tagsForCollection" md-autocomplete-snap="" md-require-match="true" md-transform-chip="ctrl.addTag($chip)" md-on-remove="ctrl.removeType($chip)">' +
    '               <md-autocomplete md-selected-item="ctrl.selectedItem" md-min-length="1" md-search-text="searchText" md-no-cache="true" md-items="item in ctrl.queryTags(searchText)"  md-item-text="item.tag">' +
    '                 <span md-highlight-text="searchText"> {{item.Tag.name}} </span>' +
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
    controller: TagsCtrl

  });

})();

//     controller: function ($scope,
//                           TagsForArea,
//                           CollectionTagTargetAdd,
//                           CollectionTagTargetRemove,
//                           TaggerToast,
//                           Data) {
//
//
//
//       /** @type {number} */
//       $scope.selectedItem = null;
//
//       /** @type {string} */
//       $scope.searchText = null;
//
//       /** @type {boolean} */
//       $scope.isDisabled = false;
//
//       /** @type {Array.<Object>} */
//       $scope.selectedTags = [];
//
//       /** @type {Array.<Object>} */
//       $scope.tagsForArea = [];
//
//       /** @type {Array.<Object>} */
//       $scope.tagsForCollection = [];
//
//       /**
//        * Returns filter.
//        * @param query
//        * @returns {*}
//        */
//       function queryTags(query) {
//         return query ? $scope.tagsForArea.filter(createFilterFor(query)) : [];
//
//       }
//
//       /**
//        * Filter for the md-autocomplete component.
//        * @type {queryTags}
//        */
//       $scope.queryTags = queryTags;
//
//
//       /**
//        * Function called when appending a chip.  Adds a new subject association
//        * for the collection. Toasts response from the service.
//        * @param chip  {Object} $chip
//        * @returns {{id: *, name: *}}
//        */
//       $scope.addTag = function (chip) {
//         var chipObj = {id: chip.Tag.id, name: chip.Tag.name};
//         var result = CollectionTagTargetAdd.query(
//           {
//             collId: Data.currentCollectionIndex,
//             tagId: chip.Tag.id
//           }
//         );
//         result.$promise.then(function (data) {
//           if (data.status === 'success') {
//             new TaggerToast('Subject Tag Added');
//
//           } else {
//             new TaggerToast('WARNING: Unable to add subject tag!');
//             return {};
//
//           }
//         });
//
//         return chipObj;
//
//       };
//
//       /**
//        * Function called when deleting a subject chip.  The function
//        * deletes the subject association with this collection
//        * via db call. Toasts on success.
//        * @param chip  {Object} $chip
//        */
//       $scope.removeTag = function (chip) {
//         var result = CollectionTagTargetRemove.query(
//           {
//             collId: Data.currentCollectionIndex,
//             tagId: chip.id
//           }
//         );
//         result.$promise.then(function (data) {
//           if (data.status === 'success') {
//             new TaggerToast('Subject Tag Removed');
//           } else {
//             new TaggerToast('WARNING: Unable to remove subject tag!');
//           }
//         });
//       };
//
//
//       /**
//        * Watch for changes to the subject tags associated with
//        * the collection area.
//        */
//       $scope.$watch(function () {
//           return Data.tagsForArea;
//         },
//         function (newValue) {
//           $scope.tagsForArea = newValue;
//         }
//       );
//
//       /**
//        * Watch for changes to the subject tags associated with
//        * this collection.
//        */
//       $scope.$watch(function () {
//           return Data.tagsForCollection;
//         },
//         function (newValue) {
//           if (newValue.length > 0) {
//             var objArray = [];
//             for (var i = 0; i < newValue.length; i++) {
//               objArray[i] = {id: newValue[i].Tag.id, name: newValue[i].Tag.name};
//             }
//             $scope.tagsForCollection = objArray;
//
//           } else {
//             $scope.tagsForCollection = [];
//           }
//         }
//       );
//
//       /**
//        * Watch for changes to the list of globally available tags.
//        * On change, update the tag list for the current area.
//        */
//       $scope.$watch(function () {
//           return Data.tags;
//         },
//         function () {
//           $scope.tagsForArea = TagsForArea.query({areaId: Data.currentAreaIndex});
//
//
//         });
//
//       /**
//        * Creates a regex filter for the search term
//        * @param query {string} term to match
//        * @returns {Function}
//        */
//       function createFilterFor(query) {
//         var regex = new RegExp(query, 'i');
//         return function filterFn(tagItem) {
//           if (tagItem.Tag.name.match(regex) !== null) {
//             return true;
//           }
//           return false;
//         };
//       }
//
//
//     }
//
//   };
//
// }
//
// ]);
