var express = require('express');
var usersController = require('../controller/UsersController');

exports.router = (function(){
    var Router = express.Router();

    Router.route('/register/').post(usersController.register);
    Router.route('/login/').post(usersController.login);
    Router.route('/listUser/').get(usersController.listUser);

    return Router;
})();