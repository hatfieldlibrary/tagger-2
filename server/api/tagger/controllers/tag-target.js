'use strict';

var async = require('async');


/**
 * Local function for adding association between tag and area.
 * @param tagId   the id of the tag
 * @param areaId   the id of the area
 * @param res      response object
 */
function addArea(tagId, areaId, res) {


  async.series(
    {
      create: function (callback) {
        db.TagAreaTarget.create(
          {
            TagId: tagId,
            AreaId: areaId
          }
        ).then(function (result) {
            callback(null, result);
          })
          .error(function (err) {
            console.log(err);
          });

      },
      areaList: function (callback) {
        db.TagAreaTarget.findAll({

          where: {
            TagId: tagId
          },
          attributes: ['AreaId']
        }).then(function (result) {
            callback(null, result);
          })
          .error(function (err) {
            console.log(err);
          });
      }
    },

    function (err, result) {
      if (err) {
        console.log(err);
      }
      // JSON response
      res.setHeader('Content-Type', 'application/json');
      res.setHeader('Access-Control-Allow-Origin', '*');
      res.end(JSON.stringify({status: 'success', areaTargets: result.areaList}));

    }
  );
}

/**
 * Retrieves list of subject tags associated with a a
 * single area.
 * @param req
 * @param res
 */
exports.getAreaTargets = function (req, res) {

  var TagId = req.params.tagId;

  db.TagAreaTarget.findAll({
      where: {
        TagId: TagId
      },
      attributes: ['AreaId']
    }
  ).then(function (areas) {
    // JSON response
    res.setHeader('Content-Type', 'application/json');
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.end(JSON.stringify(areas));
  }).catch(function (err) {
    console.log(err);
  });
};


/**
 * Creates association between a subject tag and an area
 * if that association does not already exist.
 * @param req
 * @param res
 */
exports.addTarget = function (req, res) {

  var tagId = req.params.tagId;
  var areaId = req.params.areaId;

  async.series(
    {
      // Check to see if tag is already associated
      // with area.
      check: function (callback) {

        db.TagAreaTarget.find(
          {
            where: {
              TagId: tagId,
              AreaId: areaId
            }
          }).then(function (result) {
            callback(null, result);
          })
          .catch(function (err) {
            callback(err);
          });
      }
    },
    function (err, result) {
      if(err) {
        console.log(err);
      }
      // if new
      if (result.check === null) {
        addArea(tagId, areaId, res);

      }
      // if not new, just return the current list.
      else {
        db.TagAreaTarget.findAll({
          where: {
            TagId: tagId
          },
          attributes: ['AreaId', 'TagId']
        }).
        then(function (areas) {
          // JSON response
          res.setHeader('Content-Type', 'application/json');
          res.setHeader('Access-Control-Allow-Origin', '*');
          res.end(JSON.stringify({status: 'exists', areaTargets: areas}));
        }).catch(function (err) {
          console.log(err);
        });
      }

    });
};


/**
 * Removes an association between a subject tag and an area.
 * @param req
 * @param res
 */
exports.removeTarget = function (req, res) {

  var tagId = req.params.tagId;
  var areaId = req.params.areaId;

  async.series (
    {
      // Remove current associations between the tag and collections in the area.
      removeSubjects: function (callback) {
        db.sequelize.query('delete tt from TagTargets tt Inner Join Tags t on t.id = tt.TagId ' +
            'inner join TagAreaTargets tat on t.id = tat.TagId inner join Areas a on tat.AreaId = a.id ' +
            'inner join AreaTargets at on a.id=at.AreaId inner join Collections c on at.CollectionId = c.id ' +
            'where tat.AreaId = ' + areaId + ' and tt.TagId = ' + tagId,
          {
            replacements: [areaId, tagId],
            type: db.Sequelize.QueryTypes.DELETE
          })
          .then(function (result) {
            callback(null, result);
          });
      },
      // Remove the tag from the area.
      delete: function (callback) {
        db.TagAreaTarget.destroy(
          {
            where: {
              TagId: tagId,
              AreaId: areaId
            }
          }
        ).then(function (result) {
            callback(null, result);
          })
          .error(function (err) {
            console.log(err);
          });
      },
// Get the updated tag list for the area
      areaList: function (callback) {
        db.TagAreaTarget.findAll(
          {
            where: {
              TagId: tagId
            },
            attributes: ['AreaId']
          }
        ).then(function (result) {
            callback(null, result);
          })
          .error(function (err) {
            console.log(err);
          });
      }
    },
    function (err, result) {
      if (err) {
        console.log(err);
      }
      // JSON response
      res.setHeader('Content-Type', 'application/json');
      res.setHeader('Access-Control-Allow-Origin', '*');
      res.end(JSON.stringify(
        {
          status: 'success',
          areaTargets: result.areaList,
          removedTags: result.removeSubjects
        }));
    }
  )
  ;


}
;
