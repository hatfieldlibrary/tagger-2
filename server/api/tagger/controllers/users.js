'use strict';

const utils = require('../utils/response-utility');
const taggerDao = require('../dao/users.dao');

/**
 * Retrieves list of current users.
 * @param req
 * @param res
 */
exports.list = function (req, res) {

  taggerDao.findAllUsers().then(function (users) {
    utils.sendResponse(res, users);
  }).catch(function (e) {
    console.log(e);
  });

};

/**
 * Adds a new user.
 * @param req
 * @param res
 */
exports.add = function (req, res) {
  const name = req.body.name;
  const email = req.body.email;
  const area = req.body.area;

  taggerDao.createNewUser(name, email, area).then(function () {
    utils.sendResponse(res, {status: 'success'});
  }).catch(function (e) {
    console.log(e);
  });

};

/**
 * Deletes user.
 * @param req
 * @param res
 */
exports.delete = function (req, res) {
  const id = req.body.id;

  taggerDao.deleteUser(id).then(function () {
    utils.sendResponse(res, {status: 'success'});
  }).catch(function (err) {
    console.log(err);
  });

};

/**
 * Updates user information.
 * @param req
 * @param res
 */
exports.update = function (req, res) {
  const name = req.body.name;
  const email = req.body.email;
  const area = req.body.area;
  const id = req.body.id;

  taggerDao.updateUser(name, email, area, id).then(function () {
    utils.sendResponse(res, {status: 'success'});
  }).catch(function (err) {
    console.log(err);
  });

};
