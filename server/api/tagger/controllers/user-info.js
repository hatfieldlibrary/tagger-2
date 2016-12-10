/**
 * Created by mspalti on 12/9/16.
 */
'use strict';

const utils = require('../utils/response-utility');

/**
 * Returns user info from the Express session.
 * @param req
 * @param res
 */
exports.returnUserInfo = function (req, res) {

  console.log(req.user)
  const name = req.user._json.name;
  const picture = req.user._json.picture;
  const areaId = req.user.areaId;

  utils.sendResponse(res, {name: name, picture: picture, areaId: areaId});

};
