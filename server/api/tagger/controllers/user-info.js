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

/**
 * Created by mspalti on 12/9/16.
 */
'use strict';

const repository = require('../repository/user-info');
const utils = require('../utils/response-utility');

/**
 * Returns user info from the Express session.
 * @param req
 * @param res
 */
exports.returnUserInfo = function (req, res, config) {
  repository.returnUserInfo(
    config,
    req,
    (data) => {
      utils.sendResponse(res, data);
    });

};
