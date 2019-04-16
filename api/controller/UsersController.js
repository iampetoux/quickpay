var bcrypt  = require('bcrypt');
var jwt     = require('jsonwebtoken');
var User = require('../models/users');
let mongoose = require('mongoose');

var message = { ok: function() { return "Salut" } }

module.exports = {
    register: function(req, res){
        User.findOne({
            'email': req.body.email
        }, function(err, user) {
            if (user) {
                res.json({message: "Registration failed. The email is already taken."});
            } else {
                const user = new User({
                    _id: new mongoose.Types.ObjectId(),
                    name: req.body.name,
                    email: req.body.email,
                    password: bcrypt.hashSync(req.body.password, 10)
                });
                if (user.validateEmail(req.body.email)) {
                    user.save().then(result => {
                        console.log(result);
                    }).catch(err => console.log(err));
                    res.json({
                        message: "Registration success !",
                        register: user
                    });
                } else {
                    res.json({
                        message: "Registration failed. Incorrect email syntax."
                    })
                }
            }
        }
        )
    },

    login: function(req, res){
        User.findOne({
                email:req.body.email
            }, function(err, user) {
                if (err) {
                    res.send(err);
                }
                if (user) {
                    if (!user.comparePassword(req.body.password)) {
                        return res.status(401).json({message: 'Authentication failed. Invalid password.'});
                    }
                    return res.json({
                        login: req.body.email,
                        message: "Login successful !",
                        token: jwt.sign({email: user.email, _id: user._id}, 'secret')
                    });
                } else {
                    res.status(400).json({message: 'Authentication failed. Invalid username.'});
                }
            }
        )
    },

    listUser: function(req, res){
        User.find(function(err, user){
            if (err) {
                res.send(err);
            }
            res.json(user);
        })
    }
}