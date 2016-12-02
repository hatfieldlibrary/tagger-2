'use strict';

/**
 * Retrieves list of current users.
 * @param req
 * @param res
 */
exports.list = function (req, res ) {

  db.Users.findAll({
      attributes:['id','name','email', 'area'],
      order: [['name', 'ASC']],
    }
  ).then(function(users) {
      // JSON response
      res.setHeader('Content-Type', 'application/json');
      res.setHeader('Access-Control-Allow-Origin','*');
      res.end(JSON.stringify(users));
    }).catch(function(e) {
      console.log(e);
    });

};

/**
 * Adds a new user.
 * @param req
 * @param res
 */
exports.add = function(req, res) {

  var name = req.body.name;
  var email = req.body.email;
  var area = req.body.area;

  db.Users.create({
      name: name,
      email: email,
      area: area
    }
  ).then(function() {
      // JSON response
      res.setHeader('Content-Type', 'application/json');
      res.setHeader('Access-Control-Allow-Origin','*');
      res.end(JSON.stringify({status: 'success'}));
    }).catch(function(e) {
      console.log(e);
    });
};

/**
 * Deletes user.
 * @param req
 * @param res
 */
exports.delete = function(req, res) {
  var id = req.body.id;

  db.Users.destroy({
    where: {
      id: id
    }
  }).then(function() {
    // JSON response
    res.setHeader('Content-Type', 'application/json');
    res.setHeader('Access-Control-Allow-Origin','*');
    res.end(JSON.stringify({ status: 'success' }));
  }).catch(function(err) {
    console.log(err);
  });

};

/**
 * Updates user information.
 * @param req
 * @param res
 */
exports.update = function(req, res) {
  var name = req.body.name;
  var email = req.body.email;
  var area = req.body.area;
  var id = req.body.id;
  db.Users.update({
      name: name,
      email: email,
      area: area
    },
    {
      where: {
        id: id
      }
    }).then(function() {
      // JSON response
      res.setHeader('Content-Type', 'application/json');
      res.setHeader('Access-Control-Allow-Origin','*');
      res.end(JSON.stringify({status: 'success'}));
    }).catch(function(err) {
      console.log(err);
    });
};
