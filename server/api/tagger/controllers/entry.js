'use strict';


exports.login = function(req, res) {
  res.render('login', {
    title: 'Login'
  });
};
