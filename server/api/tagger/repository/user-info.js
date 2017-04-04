/**
 * Created by mspalti on 4/4/17.
 */
/*
 * Copyright (c) 2016.
 *
 *     This program is free software: you can redistribute it and/or modify
 *     it under the terms of the GNU General Public License as published by
 *     the Free Software Foundation, either version 3 of the License, or
 *     (at your option) any later version.
 *
 *     This program is distributed in the hope that it will be useful,
 *     but WITHOUT ANY WARRANTY; without even the implied warranty of
 *     MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 *     GNU General Public License for more details.
 *
 *     You should have received a copy of the GNU General Public License
 *     along with this program.  If not, see <http://www.gnu.org/licenses/>.
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

  if (config.useAuth) {
    name = req.user._json.displayName;
    picture = req.user._json.image.url;
    areaId = req.user.areaId;
  }
  else {
    name = 'Development User';
    picture = '/resources/images/dev/homer.jpg';
    areaId = 0;
  }

  utils.sendResponse(res, {name: name, picture: picture, areaId: areaId});

};
