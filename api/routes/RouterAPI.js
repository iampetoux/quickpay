var express = require('express');
var usersController = require('../controller/UsersController');

exports.user = (function(){
    var user = express.Router();

    user.route('/register/').post(usersController.register);
    user.route('/login/').post(usersController.login);
    user.route('/profile/').get(usersController.profile);
    user.route('/list/users').get(usersController.listUsers);
    user.route('/update/profile').put(usersController.updateProfile);
    user.route('/update/password').put(usersController.updatePassword);
    user.route('/delete/').delete(usersController.delete);
    user.route('/unregister/').delete(usersController.unregister);

    return user;
})();