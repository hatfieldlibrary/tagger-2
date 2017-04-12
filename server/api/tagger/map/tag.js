/**
 * Created by mspalti on 3/31/17.
 */
(function() {

  'use strict';

  exports.mapTags = function (tags, type) {

    return _mapTagList(tags, type);
  };

  function _mapTagList(tags, type) {

    let tagArray = [];

    for(let i = 0; i < tags.length; i++) {

      let tag = {};

      if (type === 'collection' || type === 'area' ) {
        // sequelize tomfoolery.
        tag = _mapTag(tags[i].dataValues.Tag.dataValues);
      }
      else if (type === 'all') {
        tag = _mapTag(tags[i].dataValues);
      }
      else
       {
        tag = _mapTag(tags[i]);
      }

      tagArray.push(tag);

    }
    return tagArray;
  }


  function _mapTag(tag) {

    let t = {
      id: tag.id,
      name: tag.name,
      url: tag.url

    };

    return t;
  }

})();




