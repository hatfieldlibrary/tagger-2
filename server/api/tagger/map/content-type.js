

exports.mapTypes = function (types) {

  return _mapTypeList(types);

};

function _mapTypeList(types) {

  let typeArray = [];

  for (let i = 0; i < types.length; i++) {
    let type;
    // Values may be contained in the dataValues field.
    if (typeof types[i].dataValues !== 'undefined') {
     type = _mapType(types[i].dataValues);
    }
    else {
      type = _mapType(types[i]);
    }

    typeArray.push(type);

  }
  return typeArray;
}

function _mapType(type) {

  let t = {
    id: type.id,
    name: type.name

  };

  return t;

}
