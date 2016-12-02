/**
 * Created by mspalti on 12/1/16.
 */

const utils = {};

utils.sendResponse = function(res, data) {
  res.setHeader('Content-Type', 'application/json');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.end(JSON.stringify(data));

};

module.exports = utils;
