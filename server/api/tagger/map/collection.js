(function () {

  'use strict';

  exports.mapCollectionList = function (collections, type) {
    return _mapCollectionList(collections, type);

  };

  exports.mapSingleCollection = function(collection) {
    return _mapSingleCollection(collection.dataValues);

  };

  exports.mapContentTypeList = function(contentTypes) {
    return _mapContentTypeList(contentTypes);

  };

  exports.mapCategory = function(category) {
    return _mapCategory(category);

  };

  exports.mapTagList = function(tags) {
    return _mapTagList(tags);
  };

  exports.mapRelatedCollections = function(collections) {
    return _mapRelatedCollections(collections);
  };

  /**
   * Maps collection list data object to API object. The collection
   * dao objects vary between those that wrap collection objects in
   * a <code>dataValue</code> object and those that do not.  Use the
   * <code>type</code> parameter to indicate presence of dataValue wrapper.
   * @param collections the list of collections
   * @param type string indicates whether collection data is wrapped
   * @returns {Array}
   * @private
   */
  function _mapCollectionList(collections, type) {

    let collectionArray = [];
    for (let i = 0; i < collections.length; i++) {


      let collection;
      if(type === 'all') {
        collection = collections[i].dataValues;
      } else {
        collection = collections[i];
      }

      let coll = _mapListCollection(collection);
      collectionArray.push(coll);

    }
    return collectionArray;

  }


  function _mapContentTypeList(contentTypes) {
    let typeArray = [];

    for (let i = 0; i < contentTypes.length; i++) {
      // sequelize tomfoolery.
      let type = _mapContentType(contentTypes[i].dataValues.ItemContent.dataValues);
      typeArray.push(type);
    }

    return typeArray;
  }

  function _mapListCollection(collection) {

    let coll = {
      id: collection.CollectionId,
      title: collection.title,
      image: collection.image,
      url: collection.url,
      desc: collection.description,
      dates: collection.dates,
      items: collection.items,
      linkOptions: collection.browseType,
      searchOptions: collection.repoType,
      assetType: collection.ctype,
      restricted: collection.restricted,
      published: collection.published
    };

    return coll;
  }
  /**
   * Maps a single collection to API object.
   * @param collection
   * @returns {{id, title, image, url, description, dates, items, linkOptions, searchOptions, assetType, restricted: (*|number|boolean|Collection.restricted|{type, defaultValue}), published: (*|boolean|Collection.published|{type, defaultValue}|number)}}
   * @private
   */
  function _mapSingleCollection(collection) {

    let coll = {
      id: collection.id,
      title: collection.title,
      image: collection.image,
      url: collection.url,
      desc: collection.description,
      dates: collection.dates,
      items: collection.items,
      linkOptions: collection.browseType,
      searchOptions: collection.repoType,
      assetType: collection.ctype,
      restricted: collection.restricted,
      published: collection.published
    };

    return coll;
  }

  function _mapContentType(contentType) {

    let type = {
      id: contentType.id,
      name: contentType.name,
      icon: contentType.icon
    };

    return type;

  }

  function _mapCategory(categoryNoNormalized) {

    // more sequelize tomfoolery.
    let category = categoryNoNormalized.dataValues.Category.dataValues;

    let cat = {
      id: category.id,
      title: category.title,
      linkLabel: category.linkLabel,
      url: category.url,
      secondaryUrl: category.secondaryUrl,
      description: category.description,
      areaId: category.areaId,

    };

    return cat;
  }

  function _mapTagList(tags) {

    let tagArray = [];

    for (let i = 0; i < tags.length; i++) {
      tagArray.push(tags[0].dataValues.TagId)
    }
    return tagArray;
  }

  function _mapRelatedCollections(collections) {

    let collectionsArray = [];

    for (let i = 0; i < collections.length; i++) {
      collectionsArray.push(_mapSingleRelatedCollection(collections[i]));
    }

    return collectionsArray;
  }

  function _mapSingleRelatedCollection(collection) {

    let coll = {
      id: collection.id,
      title: collection.title,
      count: collection.count,
      image: collection.image
    };

    return coll;
  }

})();
