var express = require('express');
var usersController = require('../controller/UsersController');
const multer = require('multer');
const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, './uploads/');
    },
    filename: function(req, file, cb) {
        cb(null, file.originalname);
    }
})
const upload = multer({storage:storage});

exports.user = (function(){
    var user = express.Router();

    user.route('/register/').post(usersController.register);
    user.route('/login/').post(usersController.login);
    user.route('/profile/').get(usersController.profile);
    user.route('/users').get(usersController.listUsers);
    user.route('/users').put(usersController.updateProfile);
    user.route('/users/password').put(usersController.updatePassword);
    user.route('/users/').delete(usersController.delete);
    user.route('/unregister/').delete(usersController.unregister);
    user.post("/profile/photo", upload.single("filename"), usersController.addPhoto);
    user.route('/accountToken').post(usersController.account_token);
    user.route('/accountStripe').post(usersController.account_stripe);
    user.route('/transaction').post(usersController.transaction);
    user.route('/createStripeUser').post(usersController.createStripeUser);
    user.route('/transfer').post(usersController.transfer);
    //user.route('/profile/photo').post(upload.single("foo-bar"),usersController.addPhoto);

    return user;
})();