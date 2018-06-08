
'use strict';

exports.mapCategories = function (categories) {

  return _mapCategoryList(categories);

};

function _mapCategoryList(categories) {

  let categoryArray = [];

  for (let i = 0; i < categories.length; i++) {
    let category;
    // Values may be contained in the dataValues field.
    if (typeof categories[i].dataValues !== 'undefined') {
      category = _mapType(categories[i].dataValues);
    }
    else {
      category = _mapType(categories[i]);
    }
    categoryArray.push(category);

  }
  return categoryArray;
}

function _mapType(category) {

  let t = {
    id: category.id,
    name: category.title

  };

  return t;

}

