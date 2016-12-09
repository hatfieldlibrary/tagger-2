'use strict';


exports.login = function(req, res) {
  res.render(config.root +
    config.adminPath + 'login', {
    title: 'Login'
  });
};
