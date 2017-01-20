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
 * Created by mspalti on 12/14/16.
 */

(function () {

  'use strict';

  function FormController($scope,
                          CollectionsByArea,
                          CollectionById,
                          CollectionUpdate,
                          CategoryByArea,
                          CategoryForCollection,
                          AreaObserver,
                          UserAreaObserver,
                          CollectionObserver,
                          FirstCollectionInArea,
                          ThumbImageObserver,
                          TaggerToast) {

    const vm = this;

    /** @type {Object} */
    vm.collection = {};

    /** @type {Array.<Object>} */
    vm.collectionList = [];

    /** @type {Array.<Object>} */
    vm.categoryList = [];

    /** @type {number} */
    vm.collectionId = -1;

    /** @type {string} */
    vm.thumbnailImage = '';

    /** @type {number} */
    vm.userAreaId = UserAreaObserver.get();

    vm.noCollectionMessage = 'No collections for this area.';

    /**
     * Set the component subscriptions.
     * @private
     */
    function _setSubscriptions() {

      ThumbImageObserver.subscribe(function onNext() {
        vm.thumbnailImage = ThumbImageObserver.get();
      });

      AreaObserver.subscribe(function onNext() {

        areaId = AreaObserver.get();
        _getCollectionForNewArea(areaId);

      });

      CollectionObserver.subscribe(function onNext() {

        const id = CollectionObserver.get();
        vm.collectionId = id;
        _getCollectionById(id);
        _getCategoryForCollection(id);

      });

    }

    /** @type {[string]} */
    const placeholder = ['Add the collection URL, e.g.: http://host.domain.edu/wombats?type=hungry', 'Add the collection name for select option, e.g. wallulah'];

    /**
     * Initialize area id to 0
     * @type {number}
     */
    let areaId = 0;


    /**
     * Gets the first collection for the current area.
     * @param areaId
     * @private
     */
    function _getCollectionForNewArea(areaId) {
      if (areaId) {
        const first = FirstCollectionInArea.query({areaId: areaId});
        first.$promise.then(function (data) {
          vm.collection = data;
          vm.collectionId = data.id;
          vm.thumbnailImage = data.image;
          ThumbImageObserver.set(data.image);
          vm.menu({id: vm.collection.id, title: vm.collection.title});
          _getCategoryForCollection(data.id);
        });
      }
    }

    /**
     * Retrieves collection information, tags and
     * content types associated with the collection.
     * @param id  {number} the collection id
     */
    function _getCollectionById(id) {
      const col = CollectionById.query({id: id});
      col.$promise.then(function (data) {

        vm.collection = data;
        vm.category = data.category;
        vm.thumbnailImage = data.image;
        ThumbImageObserver.set(data.image);
        vm.menu({id: vm.collection.id, title: vm.collection.title});
        _setBrowseTypeLabel(data.browseType);
        _getCategoryForCollection(id);
      });

    }

    /**
     * The placeholder changes with link type.  This
     * function sets the view model based on the type
     * passed in.
     * @param type string indicating the link type.
     * @private
     */
    function _setBrowseTypeLabel(type) {
      if (type === 'link') {
        vm.browsePlaceholder = placeholder[0];
      } else {
        vm.browsePlaceholder = placeholder[1];
      }
    }

    /**
     * Get list of categories for current area.
     * @private
     */
    function _getCategories() {
      const cats = CategoryByArea.query(
        {
          areaId: areaId
        }
      );
      cats.$promise.then(function (data) {
        vm.categoryList = data;
      });
    }

    /**
     * Test to see if the category belongs to the
     * current collection area.  Sets view model
     * based on the comparison.
     * @param categories a single element array of objects
     * @private
     */
    function _evaluateCategoryArea(categories) {

      //  Using unary operator to force integer comparison.
      if (+categories[0].Category.areaId === areaId) {

        /* Category belongs to this area.  Provide user with the
         option to change category. */
        _getCategories();
        vm.showCollectionCategories = true;

      } else {
        // The current category belongs to a different area.
        // Do not offer input option.
        vm.showCollectionCategories = false;
      }
    }

    /**
     * Checks for whether category has already been assigned.
     * @param categories
     * @private
     */
    function _checkForAssignedCategory(categories) {

      if (categories !== null && categories[0].Category !== null) {

        // Set category id on the view model.
        vm.category = categories[0].Category.id;
        // Check to see if the category belongs to a different area.
        _evaluateCategoryArea(categories);

      }
      // No category assigned yet. Provide input options now.
      else {
        _getCategories();
        vm.showCollectionCategories = true;
      }
    }

    /**
     * Checks the status of the category, if one has
     * been assigned previously.  Categories are specific
     * to an area. Collections can live in more than
     * one area.
     * @param id
     * @private
     */
    function _getCategoryForCollection(id) {

      if (id > 0) {

        const categories = CategoryForCollection.query({collId: id});
        categories.$promise.then(function (cats) {
          // Returns an array length zero or one
          if (cats.length === 1) {
            // Pass to check function with list.
            _checkForAssignedCategory(cats);
          }
          else {
            // Pass to check function with null.
            _checkForAssignedCategory(null);
          }
        });
      }

    }

    vm.overrideCategory = function () {
      vm.showCollectionCategories = true;
    };

    /**
     * Updates the collection and reloads the collection
     * list for the current area upon success.
     */
    vm.updateCollection = function () {

      const update = CollectionUpdate.save({
        id: vm.collection.id,
        title: vm.collection.title,
        url: vm.collection.url,
        description: vm.collection.description,
        dates: vm.collection.dates,
        repoType: vm.collection.repoType,
        category: vm.category,
        items: vm.collection.items,
        browseType: vm.collection.browseType,
        restricted: vm.collection.restricted,
        ctype: vm.collection.ctype

      });
      update.$promise.then(function (data) {
        if (data.status === 'success') {
          vm.collectionList = CollectionsByArea.query(
            {
              areaId: AreaObserver.get()
            }
          );
          // Toast upon success
          new TaggerToast('Collection Updated');
        }
      });

    };
    /**
     * Listens for event emitted after the collection has
     * been removed from and area.  This updates the collection
     * list in the current view in the event that the collection
     * was removed from the area currently in view.
     *
     * Updates the collection list on event.
     *
     * This could be observable on collection list.
     */
    $scope.$on('removedFromArea', function () {
      vm.collectionList = CollectionsByArea.query(
        {
          areaId: AreaObserver.get()
        }
      );

    });


    /**
     * Sets vm.browseType string for choosing the URL label.
     * @param type array index
     */
    vm.setBrowseType = function (index) {
      vm.browsePlaceholder = placeholder[index];
    };

    vm.$onInit = function () {

      _setSubscriptions();

      areaId = AreaObserver.get();
      let collection = CollectionObserver.get();
      if (collection) {
        vm.collectionId = collection;
        _getCollectionById(collection);
      } else {
        _getCollectionForNewArea(AreaObserver.get());
      }
      _getCategoryForCollection(collection);
    };

  }


  taggerComponents.component('collectionForm', {
    bindings: {
      menu: '&'
    },
    templateUrl: 'templates/component/collection-form.html',
    controller: FormController,
    controllerAs: 'vm'

  });

})();
