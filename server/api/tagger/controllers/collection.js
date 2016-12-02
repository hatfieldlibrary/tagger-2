'use strict';

const async = require('async');
const utils = require('../utils/response-utility');
const taggerDao = require('../dao/collection-dao');


/**
 * Returns ctype (item type) counts for the overview
 * dashboard.
 * @param req
 * @param res
 */
exports.countCTypesByArea = function (req, res) {
  var areaId = req.params.areaId;

  taggerDao.countCTypesByArea(areaId).then(function (types) {
    utils.sendResponse(res, types);
  }).error(function (err) {
    console.log(err);
  });
};

/**
 * Gets browse type (search option types) by area for overview dashboard.
 * @param req
 * @param res
 */
exports.browseTypesByArea = function (req, res) {

  var areaId = req.params.areaId;

  db.sequelize.query('SELECT Collections.browseType, COUNT(Collections.id) as count from AreaTargets ' +
    'join Collections on AreaTargets.CollectionId=Collections.id where AreaTargets.AreaId = ? group by Collections.browseType',
    {
      replacements: [areaId],
      type: db.Sequelize.QueryTypes.SELECT
    }).then(
    function (collections) {

      // JSON response
      res.setHeader('Content-Type', 'application/json');
      res.setHeader('Access-Control-Allow-Origin', '*');
      res.end(JSON.stringify(collections));

    }).error(function (err) {
    console.log(err);
  });
};

/**
 * Returns repoType (search option) counts for the overview
 * dashboard.
 * @param req
 * @param res
 */
exports.repoTypeByArea = function (req, res) {

  var areaId = req.params.areaId;

  db.sequelize.query('SELECT repoType, COUNT(*) as count FROM AreaTargets ' +
    'LEFT JOIN Collections ON AreaTargets.CollectionId = Collections.id ' +
    'WHERE AreaTargets.AreaId = ? GROUP BY repoType',
    {
      replacements: [areaId],
      type: db.Sequelize.QueryTypes.SELECT
    }
  ).then(function (types) {
    res.setHeader('Content-Type', 'application/json');
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.end(JSON.stringify(types));
  }).error(function (err) {
    console.log(err);
  });
};

/**
 * Retrieves the collections by area id for the administrative
 * collection panel.
 * @param req
 * @param res
 */
exports.list = function (req, res) {

  var areaId = req.params.areaId;

  db.AreaTarget.findAll({
    where: {
      AreaId: areaId
    },
    order: [[db.Collection, 'title', 'ASC']],
    include: [db.Collection]

  }).then(function (collections) {
    // JSON response
    res.setHeader('Content-Type', 'application/json');
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.end(JSON.stringify(collections));

  }).error(function (err) {
    console.log(err);
  });
};

/**
 * Retrieves areas by collection id for the administrative
 * collections panel.
 * @param req
 * @param res
 */
exports.areas = function (req, res) {

  var collId = req.params.collId;

  db.AreaTarget.findAll({
    where: {
      CollectionId: collId
    }
  }).then(function (areas) {
    // JSON response
    res.setHeader('Content-Type', 'application/json');
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.end(JSON.stringify(areas));
  }).error(function (err) {
    console.log(err);
  });

};

/**
 * Adds a content type to the collection metadata after first
 * checking whether the association already exists.
 * @param req
 * @param res
 */
exports.addTypeTarget = function (req, res) {

  var collId = req.params.collId;
  var typeId = req.params.typeId;

  async.series ({
      check: function (callback) {
        db.ItemContentTarget.find(
          {
            where: {
              CollectionId: collId,
              ItemContentId: typeId
            }
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
      if (result.check === null) {

        db.ItemContentTarget.create(
          {
            CollectionId: collId,
            ItemContentId: typeId
          }
        ).then(function () {
          // JSON response
          res.setHeader('Content-Type', 'application/json');
          res.setHeader('Access-Control-Allow-Origin', '*');
          res.end(JSON.stringify({status: 'success'}));
        }).error(function (e) {
          console.log(e);
        });

      } else {

        // JSON response
        res.setHeader('Content-Type', 'application/json');
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.end(JSON.stringify({status: 'exists'}));

      }

    }
  );
};

/**
 * Removes a content type association from the collection.
 * @param req
 * @param res
 */
exports.removeTypeTarget = function (req, res) {

  var collId = req.params.collId;
  var typeId = req.params.typeId;

  db.ItemContentTarget.destroy(
    {
      where: {
        ItemContentId: typeId,
        CollectionId: collId
      }
    }
  ).then(function () {
    // JSON response
    res.setHeader('Content-Type', 'application/json');
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.end(JSON.stringify({status: 'success'}));
  }).error(function (e) {
    console.log(e);
  });

};

/**
 * Add a subject tag to the collection after first checking
 * whether the association already exists.
 * @param req
 * @param res
 */
exports.addTagTarget = function (req, res) {

  var collId = req.params.collId;
  var tagId = req.params.tagId;

  async.series(
    {
      check: function (callback) {

        db.TagTarget.find(
          {
            where: {
              CollectionId: collId,
              TagId: tagId
            }
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
      // if new, add target
      if (result.check === null) {

        db.TagTarget.create(
          {
            CollectionId: collId,
            TagId: tagId
          }
        ).then(function () {
          // JSON response
          res.setHeader('Content-Type', 'application/json');
          res.setHeader('Access-Control-Allow-Origin', '*');
          res.end(JSON.stringify({status: 'success'}));
        }).error(function (e) {
          console.log(e);
        });

      } else {

        // JSON response
        res.setHeader('Content-Type', 'application/json');
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.end(JSON.stringify({status: 'exists'}));

      }

    });

};

/**
 * Removes a subject tag from the collection.
 * @param req
 * @param res
 */
exports.removeTagTarget = function (req, res) {

  var collId = req.params.collId;
  var tagId = req.params.tagId;

  db.TagTarget.destroy(
    {
      where: {
        TagId: tagId,
        CollectionId: collId
      }
    }
  ).then(function () {
    // JSON response
    res.setHeader('Content-Type', 'application/json');
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.end(JSON.stringify({status: 'success'}));
  }).error(function (e) {
    console.log(e);
  });

};

/**
 * Adds a collection to a collection area.
 * @param collId    the collection id
 * @param areaId    the area id
 * @param res
 */
function addArea(collId, areaId, res) {

  async.series(
    {
      create: function (callback) {
        db.AreaTarget.create(
          {
            CollectionId: collId,
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
        db.AreaTarget.findAll(
          {
            where: {
              CollectionId: collId
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
      res.end(JSON.stringify({status: 'success', areaTargets: result.areaList}));

    }
  );
}

/**
 * Adds collection to a collection area after first
 * checking for a existing associatoin then returns
 * new area list.
 * @param req
 * @param res
 */
exports.addAreaTarget = function (req, res) {

  var collId = req.params.collId;
  var areaId = req.params.areaId;

  async.series(
    {
      // Check to see if tag is already associated
      // with area.
      check: function (callback) {

        db.AreaTarget.find(
          {
            where: {
              CollectionId: collId,
              AreaId: areaId
            }
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
      // if new
      if (result.check === null) {

        addArea(collId, areaId, res);

      }
      // if not new, just return the current list.
      else {
        db.AreaTarget.findAll(
          {
            where: {
              CollectionId: collId
            }
          },
          {attributes: ['AreaId']}
        ).then = function (areas) {
          // JSON response
          res.setHeader('Content-Type', 'application/json');
          res.setHeader('Access-Control-Allow-Origin', '*');
          res.end(JSON.stringify({status: 'exists', areaTargets: areas}));
        };
      }

    });

};

/**
 * Removes the association between a collection and a collection
 * area.  Returns new area list after completion.
 * @param req
 * @param res
 */
exports.removeAreaTarget = function (req, res) {

  var collId = req.params.collId;
  var areaId = req.params.areaId;

  async.series(
    {
      create: function (callback) {
        db.AreaTarget.destroy({
          where: {
            AreaId: areaId,
            CollectionId: collId
          }

        }).then(function (result) {
            callback(null, result);
          })
          .error(function (err) {
            console.log(err);
          });
      },
      areaList: function (callback) {
        db.AreaTarget.findAll(
          {
            where: {
              CollectionId: collId
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
      res.end(JSON.stringify({status: 'success', areaTargets: result.areaList}));

    });
};

/**
 * Retrieves data for a single collection by collection id.
 * @param req
 * @param res
 */
exports.byId = function (req, res) {

  var collId = req.params.id;

  async.parallel({
      getCollection: function (callback) {
        db.Collection.find(
          {
            where: {
              id: collId
            }
          }).then(function (result) {
          callback(null, result);
        });
      },
      getCategory: function (callback) {
        db.CategoryTarget.find(
          {
            where: {
              CollectionId: collId
            }
          }).then(function (result) {
          callback(null, result);
        });
      },
      getAreas: function (callback) {
        db.AreaTarget.findAll({
          where: {
            CollectionId: collId
          }
        }).then(function (result) {
          callback(null, result);
        });
      }
    },
    function (err, result) {
      if (err !== null) {
        console.log(err);
      }

      var response = {};
      var areas = [];
      if (result.getCollection !== null) {
        response.id = result.getCollection.id;
        response.title = result.getCollection.title;
        response.description = result.getCollection.description;
        response.dates = result.getCollection.dates;
        response.items = result.getCollection.items;
        response.ctype = result.getCollection.ctype;
        response.url = result.getCollection.url;
        response.browseType = result.getCollection.browseType;
        response.repoType = result.getCollection.repoType;
        response.image = result.getCollection.image;
        response.restricted = result.getCollection.restricted;
      }

      if (result.getCategory !== null) {
        response.category = result.getCategory.CategoryId;
      }
      if (result.getAreas !== null) {
        for (var i = 0; i < result.getAreas.length; i++) {
          areas[0] = result.getAreas[i].AreaId;
        }
        response.areas = areas;
      }

      // JSON response
      res.setHeader('Content-Type', 'application/json');
      res.setHeader('Access-Control-Allow-Origin', '*');
      res.end(JSON.stringify(response));
    });
};


/**
 * Updates metadata and associations for a single collection.
 * @param req
 * @param res
 */
exports.update = function (req, res) {

  var id = req.body.id;
  var title = req.body.title;
  var url = req.body.url;
  var browseType = req.body.browseType;
  var description = req.body.description;
  var dates = req.body.dates;
  var items = req.body.items;
  var ctype = req.body.ctype;
  var repoType = req.body.repoType;
  var restricted = req.body.restricted;
  var category = req.body.category;

  res.setHeader('Content-Type', 'application/json');
  res.setHeader('Access-Control-Allow-Origin', '*');

  async.series({
      updateCollection: function (callback) {
        db.Collection.update({

            title: title,
            url: url,
            browseType: browseType,
            description: description,
            dates: dates,
            items: items,
            ctype: ctype,
            repoType: repoType,
            restricted: restricted
          },
          {
            where: {
              id: id
            }
          }).then(function (result) {
          callback(null, result);
        }).error(function (err) {
          callback(err, null);
          console.log(err);
        });
      },
      checkCategory: function (callback) {
        db.CategoryTarget.find({
          where: {
            CollectionId: id
          }
        }).then(function (result) {
            callback(null, result);
          })
          .error(function (err) {
            callback(err, null);
            console.log(err);
          });
      }
    },
    function (err, result) {
      if (err !== undefined && err !== null) {
        res.end(JSON.stringify({status: 'failed'}));
        console.log(err);
      }
      // If no category exists for this collection,
      // add new entry.
      if (result.checkCategory === null) {
        db.CategoryTarget.create({CollectionId: id, CategoryId: category})
          .then(function () {
            // JSON response
            res.end(JSON.stringify({status: 'success'}));

          }).catch(function (err) {
          console.log(err);
        });
        // If category does exist, update to the current value.
      } else {
        db.CategoryTarget.update({
            CategoryId: category
          },
          {
            where: {
              CollectionId: id
            }
          }).then(
          function () {
            // JSON response
            res.end(JSON.stringify({status: 'success'}));

          }).catch(
          function (err) {
            console.log(err);
          });
      }
    });

};

/**
 * Deletes a collection.
 * @param req
 * @param res
 */
exports.delete = function (req, res) {

  var id = req.body.id;

  db.Collection.destroy({
    where: {
      id: id
    }
  }).then(function () {
    // JSON response
    res.setHeader('Content-Type', 'application/json');
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.end(JSON.stringify({status: 'success'}));
  }).catch(function (err) {
    console.log(err);
  });
};


/**
 * Adds a new collection with title field metadata
 * and creates the collection association with the
 * collection area.
 * @param req
 * @param res
 */
exports.add = function (req, res) {


  var title = req.body.title;
  var areaId = req.body.areaId;
  var newCollectionId;


  async.series({
      addCollection: function (callback) {
        db.Collection.create({
          title: title
        }).then(function (coll) {
          newCollectionId = coll.id;
          callback(null, coll);
        }).catch(function (err) {
          console.log(err);
        });
      },
      addArea: function (callback) {
        db.AreaTarget.create({
          CollectionId: newCollectionId,
          AreaId: areaId
        }).then(function (result) {
          callback(null, result);
        }).catch(function (err) {
          callback(err);
        });
      },
      collections: function (callback) {
        db.AreaTarget.findAll({
          where: {
            AreaId: areaId
          },
          include: [db.Collection],
          order: [[db.Collection, 'title', 'ASC']]
        }).then(function (colls) {
          callback(null, colls);
        }).catch(function (err) {
          callback(err);
        });
      }
    }, function (err, results) {
      if (err) {
        console.log(err);
      }
      // JSON response
      res.setHeader('Content-Type', 'application/json');
      res.setHeader('Access-Control-Allow-Origin', '*');
      res.end(JSON.stringify({status: 'success', id: newCollectionId, collections: results.collections}));
    }
  );

};


/**
 * Image upload. Reads multipart form data and creates
 * thumbnail image. Writes thumbnail and full size image to
 * directories in the configuration's image path directory.
 * @param req
 * @param res
 * @param config
 */
exports.updateImage = function (req, res, config) {

  //https://github.com/danialfarid/ng-file-upload
  // https://github.com/danialfarid/ng-file-upload/wiki/node.js-example

  // paths for imagemagick and image dirctory
  var convert = config.convert,
    identify = config.identify,
    imagePath = config.taggerImageDir;

  var fs = require('fs'),
    multiparty = require('multiparty'),
    magick = require('imagemagick');


  magick.identify.path = identify;
  magick.convert.path = convert;


  var form = new multiparty.Form();
  var imageName;
  var id;
  form.parse(req, function (err, fields, files) {

    if (files.file !== undefined) {
      try {
        // read in the temp file from the upload
        fs.readFile(files.file[0].path, function (err, data) {
          if (err !== null) {
            console.log(err);
            res.end();
          }
          imageName = files.file[0].originalFilename;
          id = fields.id;
          if (!imageName) {
            res.redirect('/');
            res.end();

          } else {
            // use imagemagick to transform the full image to thumbnail.
            // write to thumb directory
            var fullPath = imagePath + '/full/' + imageName;
            var thumbPath = imagePath + '/thumb/' + imageName;
            fs.writeFile(fullPath, data, function (err) {
              if (err) {
                console.log(err);
                res.end();
              }
              else {
                magick.resize({
                    srcPath: fullPath,
                    dstPath: thumbPath,
                    width: 200

                  },
                  /*jshint unused:false */
                  function (err, stdout, stderr) {
                    if (err) {
                      console.log(err);
                    }
                    // update database even if the conversion fails
                    updateDb(id);
                  });
              }
            });
          }

        });
      } catch (err) {
        console.log(err);
      }
    } else {
      console.log('No image files were received. Aborting upload.');
      res.end();
    }
  });


  /**
   * Updates the data base with new image information.
   * @param id
   */
  function updateDb(id) {
    db.Collection.update(
      {
        image: imageName
      },
      {
        where: {
          id: id
        }
      }
      /*jshint unused:false*/
    ).then(function (result) {
        // JSON response
        res.setHeader('Content-Type', 'application/json');
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.end(JSON.stringify({status: 'success'}));
      }
    ).catch(function (err) {
        console.log(err);
      }
    );

  }
};


/**
 * Retrieves the tags associated with a single collection. Used by
 * both admin interface and public REST API.
 * @param req
 * @param res
 */
exports.tagsForCollection = function (req, res) {

  var collId = req.params.collId;

  db.TagTarget.findAll(
    {
      where: {
        CollectionId: collId
      },
      include: [db.Tag],
      attributes: ['"Tags.name"', 'id']
    }).then(function (tags) {
    // JSON response
    res.setHeader('Content-Type', 'application/json');
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.end(JSON.stringify(tags));

  }).catch(function (err) {
    console.log(err);
    res.setHeader('Content-Type', 'application/json');
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.end(JSON.stringify({status: 'failed'}));
  });

};

/**
 * Retrieves the types associated with a single collection.  Used by
 * both admin interface and public REST API.
 * @param req
 * @param res
 */
exports.typesForCollection = function (req, res) {

  var collId = req.params.collId;

  db.ItemContentTarget.findAll(
    {
      where: {
        CollectionId: collId
      },
      include: [db.ItemContent]
    }
  ).then(function (types) {
      // JSON response
      res.setHeader('Content-Type', 'application/json');
      res.setHeader('Access-Control-Allow-Origin', '*');
      res.end(JSON.stringify(types));
    })
    .catch(function (err) {
      console.log(err);
      res.setHeader('Content-Type', 'application/json');
      res.setHeader('Access-Control-Allow-Origin', '*');
      res.end(JSON.stringify({status: 'failed'}));
    });

};

/**
 * Retrieves a list of all collections for the public API.
 * @param req
 * @param res
 */
exports.allCollections = function (req, res) {

  db.Collection.findAll({
    order: [['title', 'ASC']]
  }).then(function (collections) {
    // JSON response
    res.setHeader('Content-Type', 'application/json');
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.end(JSON.stringify(collections));

  }).catch(function (err) {
    console.log(err);

  });
};

/**
 * Retrieves single collection information for the public API.
 * @param req
 * @param res
 */
exports.collectionById = function (req, res) {

  var collId = req.params.id;

  async.series({
      collection: function (callback) {

        db.Collection.find(
          {
            where: {
              id: collId
            }
          }).then(
          function (data) {
            callback(null, data);
          }).catch(
          function (err) {
            // trigger  error callback
            callback(err);
          });

      },
      categories: function (callback) {

        db.CategoryTarget.find(
          {
            where: {
              CollectionId: collId
            },
            include: [db.Category]
          }).then(
          function (data) {
            callback(null, data);
          }).catch(
          function (err) {
            callback(err);
          });

      },
      itemTypes: function (callback) {

        db.ItemContentTarget.findAll(
          {
            where: {
              CollectionId: collId
            },
            include: [db.ItemContent]
          }
        ).then(
          function (data) {
            callback(null, data);
          }).catch(
          function (err) {
            callback(err);
          });
      }
    },
    function (err, result) {
      if (err) {
        console.log(err);
        res.setHeader('Content-Type', 'application/json');
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.end(JSON.stringify({status: 'failed', reason: err}));
      } else {
        // JSON response
        res.setHeader('Content-Type', 'application/json');
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.end(JSON.stringify(result));
      }
    }
  );

};

/**
 * Retrieves list of collection by area ID for the public API.
 * @param req
 * @param res
 */
exports.collectionsByArea = function (req, res) {

  var areaId = req.params.id;

  db.sequelize.query('Select * from Collections c LEFT JOIN AreaTargets at on c.id=at.CollectionId where at.AreaId = ? order by c.title',
    {
      replacements: [areaId],
      type: db.Sequelize.QueryTypes.SELECT
    }).then(
    function (collections) {
      // JSON response
      res.setHeader('Content-Type', 'application/json');
      res.setHeader('Access-Control-Allow-Origin', '*');
      res.end(JSON.stringify(collections));

    }).catch(function (err) {
    console.log(err);
  });
};

/**
 * Retrieves a list of collections by subject and area for the public API.
 * @param req
 * @param res
 */
exports.collectionsBySubject = function (req, res) {

  var subjectId = req.params.id;
  var areaId = req.params.areaId;

  db.sequelize.query('Select * from TagTargets tt LEFT JOIN Tags t on tt.TagId = t.id LEFT JOIN Collections c ' +
    'on tt.CollectionId = c.id LEFT JOIN AreaTargets at on c.id=at.CollectionId where tt.TagId = ? and at.AreaId = ?' +
    'order by c.title',
    {
      replacements: [subjectId, areaId],
      type: db.Sequelize.QueryTypes.SELECT
    }).then(
    function (collections) {
      // JSON response
      res.setHeader('Content-Type', 'application/json');
      res.setHeader('Access-Control-Allow-Origin', '*');
      res.end(JSON.stringify(collections));

    }).catch(function (err) {
    console.log(err);
  });
};

exports.allCollectionsByCategory = function (req, res) {

  var categoryId = req.params.id;

  db.sequelize.query('Select * from Collections c left join CategoryTargets ct on ct.CollectionId = c.id where ct.CategoryId = ? order by c.title',
  {
    replacements: [categoryId],
    type: db.Sequelize.QueryTypes.SELECT
  }).then(function(collections) {
    // JSON response
    res.setHeader('Content-Type', 'application/json');
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.end(JSON.stringify(collections));

  }).catch(function (err) {
    console.log(err);
  });

};

/**
 * Retrieves collections by subject (from all areas)
 */
exports.allCollectionsBySubject = function (req, res) {

  var subjectId = req.params.id;

  db.sequelize.query('Select * from TagTargets tt LEFT JOIN Tags t on tt.TagId = t.id LEFT JOIN Collections c ' +
    'on tt.CollectionId = c.id where tt.TagId = ? order by c.title',
    {
      replacements: [subjectId],
      type: db.Sequelize.QueryTypes.SELECT

    }).then(
    function (collections) {
      // JSON response
      res.setHeader('Content-Type', 'application/json');
      res.setHeader('Access-Control-Allow-Origin', '*');
      res.end(JSON.stringify(collections));

    }).catch(function (err) {
    console.log(err);
  });
};


/**
 * Returns a JSON list of objects retrieved from the eXist
 * database host for the public API.  The objects contain the
 * query term (title) and count.
 *
 * {
 *   item: {
 *     title: "1906",
 *     count: "4"
 * }
 *
 * @param req
 * @param res
 */
exports.browseList = function (req, res) {

  var http = require('http');
  var collection = req.params.collection;

  var options = {
    headers: {
      accept: 'application/json'
    },
    // Since this Node app is already serving as proxy, there's
    // no need to proxy again through a public host like libmedia.
    host: 'exist.willamette.edu',
    port: 8080,
    path: '/exist/apps/METSALTO/api/BrowseList.xquery?collection=' + collection,
    method: 'GET'
  };


  // If no error, handle response.
  function handleResponse(response) {

    var str = '';
    response.on('data', function (chunk) {
      // Add data as it returns.
      str += chunk;
    });

    response.on('end', function () {
      res.setHeader('Content-Type', 'application/json');
      res.setHeader('Access-Control-Allow-Origin', '*');
      res.end(str);

    });
  }

  // The eXist collections API returns a list of objects.
  var request = http.request(options, handleResponse);

  request.on('error', function (e) {
    console.log(e);
    request.end();
  });


  request.end();
};



