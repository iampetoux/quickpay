var bcrypt = require('bcrypt'),
    validator = require("email-validator");
const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    _id: mongoose.Types.ObjectId,
    name: String,
    email: {type: String, required:true},
    admin: Number,
    password: {type: String, required:true},
    picture: String
}, {versionKey: false // You should be aware of the outcome after set to false
})

userSchema.methods.comparePassword = function(pass) {
    return bcrypt.compareSync(pass, this.password);
};

userSchema.methods.validateEmail = function(email) {
    return validator.validate(email);
}

module.exports = mongoose.model('User', userSchema);
