/*
 * Copyright (c) 2017.
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
 * Created by mspalti on 3/31/17.
 */
(function () {

  'use strict';

  exports.mapTags = function (tags, type) {

    return _mapTagList(tags, type);
  };

  function _mapTagList(tags, type) {

    let tagArray = [];

    for (let i = 0; i < tags.length; i++) {

      let tag = {};

      // Since we started using raw queries for subject tags,
      // this special data handling is not needed.
      if (type === 'collection') {
        // sequelize tomfoolery.
        tag = _mapTag(tags[i].dataValues.Tag.dataValues);
      }
      else if (type === 'all') {
        tag = _mapTag(tags[i].dataValues);
      }
      else {
        // The query for finding tags by area no longer
        // requires special handling.
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




