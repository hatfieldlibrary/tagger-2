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
exports.returnUserInfo = function (req, res, config) {

  let name = '';
  let picture = '';
  let areaId = '';

  if (config.isAuth) {
    name = req.user._json.name;
    picture = req.user._json.picture;
    areaId = req.user.areaId;
  }
  else {
    name = 'Development User';
    picture = '/resources/images/dev/homer.jpg';
    areaId = 0;
  }

  utils.sendResponse(res, {name: name, picture: picture, areaId: areaId});

};
