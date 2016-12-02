'use strict';


var async = require('async');


/**
 * Retrieves content type by id
 * @param req
 * @param res
 */
exports.byId = function (req, res) {

  var id = req.params.id;

  db.ItemContent.find({
    where:{
       id: id
    }
  }).then(function (type) {
    // JSON response
    res.setHeader('Content-Type', 'application/json');
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.end(JSON.stringify(type));
  }).catch(function (err) {
    console.log(err);
  });

};

/**
 * Retrieves list of all content types
 * @param req
 * @param res
 */
exports.list = function (req, res) {

  db.ItemContent.findAll({
    attributes: ['id', 'name'],
    order: [['name', 'ASC']]
  }).then(function (types) {
    // JSON response
    res.setHeader('Content-Type', 'application/json');
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.end(JSON.stringify(types));
  }).catch(function (err) {
    console.log(err);
  });

};

/**
 * Returns name and frequency for content types in a single
 * area for use in dashboard.
 * @param req
 * @param res
 */
exports.countByArea = function (req, res) {

  var areaId = req.params.areaId;

  db.sequelize.query('Select name, COUNT(*) as count from AreaTargets left ' +
    'join Collections on AreaTargets.CollectionId = Collections.id left join ItemContentTargets ' +
    'on ItemContentTargets.CollectionId = Collections.id left join ItemContents on ' +
    'ItemContentTargets.ItemContentId = ItemContents.id ' +
    'where AreaTargets.AreaId = ? group by ItemContents.id order by ' +
    'count DESC',
    {
      replacements: [areaId],
      type: db.Sequelize.QueryTypes.SELECT
    }
  ).then(function (types) {
    res.setHeader('Content-Type', 'application/json');
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.end(JSON.stringify(types));
  });

};

/**
 * Adds new content type. First checks to see if it exists.
 * @param req
 * @param res
 */
exports.add = function (req, res) {

  var name = req.body.title;

  async.parallel (
    {
      // Check to see if content type already exists.
      check: function (callback) {
        db.ItemContent.find(
          {
            where: {
              name:  name
            }
          }
        ).then(function(result) {
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
        db.ItemContent.create({
          name: name
        }).then(function (result) {
            // JSON response
            res.setHeader('Content-Type', 'application/json');
            res.setHeader('Access-Control-Allow-Origin', '*');
            res.end(JSON.stringify({status: 'success', id: result.id}));
          })
          .catch(function (err) {
            console.log(err);
          });

      } else {
        // JSON response
        res.setHeader('Content-Type', 'application/json');
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.end(JSON.stringify({status: 'failure'}));

      }
    }
  );
};
/**
 * Updates a content type.
 * @param req
 * @param res
 */
exports.update = function (req, res) {

  var id = req.body.id;
  var name = req.body.name;
  var icon = req.body.icon;

  db.ItemContent.update(
    {
      name: name,
      icon: icon
    },
    {
      where: {
        id: id
      }
    }
  ).then(function () {
    // JSON response
    res.setHeader('Content-Type', 'application/json');
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.end(JSON.stringify({status: 'success'}));
  }).catch(function (err) {
    console.log(err);
  });
};

/**
 * Deletes a content type.
 * @param req
 * @param res
 */
exports.delete = function (req, res) {

  var contentId = req.body.id;

  db.ItemContent.destroy(
    {
      where: {
        id: contentId
      }
    }).then(function () {
    // JSON response
    res.setHeader('Content-Type', 'application/json');
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.end(JSON.stringify({status: 'success'}));

  }).
  catch(function (err) {
    console.log(err);
  });

};

