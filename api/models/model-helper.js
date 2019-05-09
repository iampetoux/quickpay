
/**
 * 
 * Helpers that allow to validate some operations with the models
 */

var bcrypt = require('bcrypt'),
validator = require("email-validator");

let comparePassword = function(pass) {
    return bcrypt.compareSync(pass, this.password);
};

let validateEmail = function(email) {
    return validator.validate(email);
}

module.exports = {
    validateEmail, comparePassword
}