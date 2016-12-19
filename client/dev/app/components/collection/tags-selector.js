/**
 * Directive used to associate a TAG with a COLLECTION.
 */

(function () {

  function TagsCtrl(CollectionTagTargetAdd,
                    CollectionTagTargetRemove,
                    TagsForArea,
                    TagsForCollection,
                    AreaObserver,
                    TaggerToast,
                    CollectionObserver) {

    const ctrl = this;
    /**
     * Watch for new collection id.
     * Update the tags when collection changes.
     */
    CollectionObserver.subscribe(function onNext() {
      let collid = CollectionObserver.get();
      ctrl.collectionId = collid;
      _getTagsForCollection(collid);

    });

    /**
     * Watch for new area id.
     * Update the area tag list when area changes.
     */
    AreaObserver.subscribe(function onNext() {
      let id = AreaObserver.get();
     _getTagsForArea(id);
    });

    function _getTagsForArea(id) {
      if (id) {
        let tagsForArea = TagsForArea.query({areaId: id});
        tagsForArea.$promise.then(function (data) {
          ctrl.tagsForArea = data;
        });
      }
    }

    /**
     * Gets the tags for this collection.
     * @param id collection identifier
     * @private
     */
    function _getTagsForCollection(id) {
      let tags = TagsForCollection.query({collId: id});
      tags.$promise.then(function (data) {
        _setTagsArray(data);
      });
    }


    function _setTagsArray(set) {
      let objArray = [];
      if (set.length > 0) {
        for (var i = 0; i < set.length; i++) {
          objArray[i] = {id: set[i].Tag.id, name: set[i].Tag.name};
        }
        ctrl.tagsForCollection = objArray;

      } else {
        ctrl.tagsForCollection = [];
      }
    }

    /**
     * Filter for the md-autocomplete component.
     * @type {_queryTags}
     */
    ctrl.queryTags = (query) => {
      return query ? ctrl.tagsForArea.filter(createFilterFor(query)) : [];

    };


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
          collId: ctrl.collectionId,
          tagId: chip.Tag.id
        }
      );
      result.$promise.then(function (data) {
        console.log(data)
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
          collId: CollectionObserver.get(),
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

    ctrl.$onInit = function () {

      //ctrl.tagsForArea = TagsForAreaObserver.get();
      let id = CollectionObserver.get();
      _getTagsForCollection(id);
      _getTagsForArea(AreaObserver.get());
    };

  }

  taggerComponents.component('subjectSelector', {

    bindings: {
      collectionId: '@'
    },
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
    '             <md-chips class="tagger-chips" ng-model="$ctrl.tagsForCollection" md-autocomplete-snap="" md-require-match="true" md-transform-chip="$ctrl.addTag($chip)" md-on-remove="$ctrl.removeTag($chip)">' +
    '               <md-autocomplete md-selected-item="$ctrl.selectedItem" md-min-length="1" md-search-text="searchText" md-no-cache="true" md-items="item in $ctrl.queryTags(searchText)"  md-item-text="item.tag.name">' +
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
