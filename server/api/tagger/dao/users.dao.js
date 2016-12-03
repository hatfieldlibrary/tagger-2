/**
 * Created by mspalti on 12/1/16.
 */

const taggerSchema = require('../models/index');
const taggerDao = {};

taggerDao.findAllUsers = () => {

  return taggerSchema.Users.findAll({
      attributes:['id','name','email', 'area'],
      order: [['name', 'ASC']],
    }
  );

};


taggerDao.createNewUser = (name, email, area) => {

  return taggerSchema.Users.create({
      name: name,
      email: email,
      area: area
    }
  )
};

taggerDao.deleteUser = (id) => {

  return taggerSchema.Users.destroy({
    where: {
      id: id
    }
  });

};

taggerDao.updateUser = (name, email, area, id) => {

  return taggerSchema.Users.update({
      name: name,
      email: email,
      area: area
    },
    {
      where: {
        id: id
      }
    });
};

module.exports = taggerDao;
