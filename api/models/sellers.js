var bcrypt = require('bcrypt'),
    validator = require("email-validator");
const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    _id: mongoose.Types.ObjectId,
    name: String,
    email: {type: String, required:true},
    password: {type: String, required:true},
    address: {type: String, required: true},
    siretNumber: {type: String, required: true},
    uniQRCode: {type: String, required: true},
    accountType: {type: String, required: true},

    picture: String,
    admin: Number,
}, {versionKey: false // You should be aware of the outcome data after set it to false
})

/** Older version made by Lucas */
// userSchema.methods.comparePassword = function(pass) {
//     return bcrypt.compareSync(pass, this.password);
// };

// userSchema.methods.validateEmail = function(email) {
//     return validator.validate(email);
// }

module.exports = mongoose.model('Sellers', userSchema);
