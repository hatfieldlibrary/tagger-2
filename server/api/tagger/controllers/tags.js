'use strict';

/**
 * Created by mspalti on 5/23/14.
 */

var async = require('async');


/**
 * Retrieves a list of all tags.
 * @param req
 * @param res
 */
exports.list = function (req, res) {

  db.Tag.findAll({
    order: [['name', 'ASC']]

  }).then(function (tags) {
    // JSON response
    res.setHeader('Content-Type', 'application/json');
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.end(JSON.stringify(tags));

  }).catch(function(err) {
    console.log(err);
  });

};

/**
 * Retrieves tag information by tag id.
 * @param req
 * @param res
 */
exports.byId = function(req, res) {

  var id = req.params.id;

  db.Tag.find( {
    where: {
      id:  id
    },
    order: [['name', 'ASC']]
  }).then( function(tag) {
    // JSON response
    res.setHeader('Content-Type', 'application/json');
    res.setHeader('Access-Control-Allow-Origin','*');
    res.end(JSON.stringify(tag));

  }).catch(function(err) {
    console.log(err);
  });
};

/**
 * Retrieves list of tags assoicated with an area. Query
 * by area id.
 * @param req
 * @param res
 */
exports.tagByArea = function (req, res) {

  var areaId = req.params.areaId;

  db.TagAreaTarget.findAll( {
    where: {
      AreaId: areaId
    },

    attributes: ['"Tags.name"', 'TagId'],
    order: [[db.Tag, 'name', 'ASC']],
    include: [db.Tag]
  }).then( function(tags) {
    // JSON response
    res.setHeader('Content-Type', 'application/json');
    res.setHeader('Access-Control-Allow-Origin','*');
    res.end(JSON.stringify(tags));
  }).catch(function(err) {
    console.log(err);
  });
};


/**
 * Retrieves tag name and use count by area id.
 * @param req
 * @param res
 */
exports.tagByAreaCount = function (req, res) {

  var areaId = req.params.areaId;

  db.sequelize.query('SELECT name, COUNT(*) as count from TagTargets left join Tags on ' +
    'TagTargets.TagId = Tags.id left join TagAreaTargets on TagAreaTargets.TagId = Tags.id  ' +
    'WHERE TagAreaTargets.AreaId = ? group by TagTargets.TagId order by Tags.name',
    {
      replacements: [areaId],
      type: db.Sequelize.QueryTypes.SELECT
    }
  ).then(function (tags) {
      res.setHeader('Content-Type', 'application/json');
      res.setHeader('Access-Control-Allow-Origin', '*');
      res.end(JSON.stringify(tags));
    }).catch(function(err) {
      console.log(err);
    });
};


/**
 * Adds a new tag.  First checks to see if tag with this name already
 * exists.
 * @param req
 * @param res
 */
exports.add = function( req, res) {

  var name = req.body.name;

  async.parallel (
    {
      // Check to see if content type already exists.
      check: function (callback) {
        db.Tag.find(
          {
            where: {
              name: name
            }
          }
        ).then(function (result) {
            callback(null, result);
          })
          .catch(function (err) {
            callback(err);
          });
      }
    },
    function (err, result) {
      if (err) {
        console.log(err);
      }
      if (result.check === null) {
        // Add new content type
        db.Tag.create({name: name
        }).then(function (result) {
          // JSON response
          res.setHeader('Content-Type', 'application/json');
          res.setHeader('Access-Control-Allow-Origin','*');
          res.end(JSON.stringify({status: 'success', id: result.id}));
        })
          .catch(function (err) {
            console.log(err);
          });

      } else {
        // JSON response
        res.setHeader('Content-Type', 'application/json');
        res.setHeader('Access-Control-Allow-Origin','*');
        res.end(JSON.stringify({status: 'failure'}));

      }
    }

  );
};

/**
 * Update the tag name.
 * @param req
 * @param res
 */
exports.update = function (req, res) {

  var id = req.body.id;
  var name = req.body.name;

  db.Tag.update(
    {
      name: name
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

/**
 * Delete the tag.
 * @param req
 * @param res
 */
exports.delete = function (req , res) {

  var id = req.body.id;

  db.Tag.destroy({
    where: {
      id: id
    }
  }).then(function() {
    // JSON response
    res.setHeader('Content-Type', 'application/json');
    res.setHeader('Access-Control-Allow-Origin','*');
    res.end(JSON.stringify({ status: 'success'}));
  });
};


/**
 * Retrieves a list of subjects by area for the public API.
 * @param req
 * @param res
 */
exports.subjectsByArea = function(req, res) {

  var id = req.params.id;
  db.TagAreaTarget.findAll( {
    where: {
      AreaId: id
    },
    include: [db.Tag],
    attributes: ['"Tags.name"', 'TagId'],
    order: [[db.Tag, 'name', 'ASC']]

  }).then( function(tags) {
    // JSON response
    res.setHeader('Content-Type', 'application/json');
    res.setHeader('Access-Control-Allow-Origin','*');
    res.end(JSON.stringify(tags));
  }).catch(function(err) {
    console.log(err);
  });
};

