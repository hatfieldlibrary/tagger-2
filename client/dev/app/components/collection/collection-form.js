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

    /** @type {[string]} */
    const placeholder = ['Add the collection URL, e.g.: http://host.domain.edu/wombats?type=hungry', 'Add the collection name for select option, e.g. wallulah'];

    ThumbImageObserver.subscribe(function onNext() {
      vm.thumbnailImage = ThumbImageObserver.get();
    });

    AreaObserver.subscribe(function onNext() {
      const areaId = AreaObserver.get();
      _getCollectionForNewArea(areaId);
    });


    CollectionObserver.subscribe(function onNext() {

      const id = CollectionObserver.get();
      vm.collectionId = id;
      _getCollectionById(id);
      _checkCategory(id);
    });


    function _getCategories() {

      const cats = CategoryByArea.query(
        {
          areaId: AreaObserver.get()
        }
      );
      cats.$promise.then(function (data) {
        vm.categoryList = data;
      });

    }

    function _getCollectionForNewArea(areaId) {
      const first = FirstCollectionInArea.query({areaId: areaId});
      first.$promise.then(function (data) {
        vm.collection = data;
        vm.collectionId = data.id;
        vm.thumbnailImage = data.image;
        ThumbImageObserver.set(data.image);
        vm.menu({id: vm.collection.id, title: vm.collection.title});
      });
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
        vm.thumbnailImage = data.image;
        ThumbImageObserver.set(data.image);
        vm.menu({id: vm.collection.id, title: vm.collection.title});
        _setBrowseTypeLabel(data.browseType);
      });

    }

    function _setBrowseTypeLabel(type) {
      if (type === 'link') {
        vm.browsePlaceholder = placeholder[0];
      } else {
        vm.browsePlaceholder = placeholder[1];
      }
    }

    /**
     * Sets the category form input.
     * @param categories
     * @private
     */
    function _setCategoryView(categories) {

      let area = AreaObserver.get();
      // Collection has category assigned
      if (categories[0].Category !== null) {
        // The assigned category belongs to this area. Fill input options.
        // Using unary operator to force integer comparison.
        if (+categories[0].Category.areaId === area) {
          _getCategories();
          vm.showCollectionCategories = true;
        } else {
          // The current category belongs to a different area.
          // Do not offer input option.
          vm.showCollectionCategories = false;
        }
      }
      // No category assigned yet. Fill input options.
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
    function _checkCategory(id) {
      if (id > 0) {
        const categories = CategoryForCollection.query({collId: id});
        categories.$promise.then(function (cats) {
          // Returns an array length zero or one
          if (cats.length === 1) {
           _setCategoryView(cats);
          }
          else {
            console.log('Collection not found');
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
        category: vm.collection.category,
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
      let collection = CollectionObserver.get();
      if (collection) {
        vm.collectionId = collection;
        _getCollectionById(collection);
      } else {
        _getCollectionForNewArea(AreaObserver.get());
      }
      _checkCategory(collection);
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
