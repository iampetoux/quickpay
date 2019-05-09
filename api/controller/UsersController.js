var bcrypt  = require('bcrypt'),
    jwt     = require('jsonwebtoken'),
    User = require('../models/users');
    modelhelper = require('../models/model-helper')
var jwt_decode = require('jwt-decode');

let mongoose = require('mongoose');

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
                        admin: 0,
                        password: bcrypt.hashSync(req.body.password, 10)
                    });
                    if (user.modeHelper.validateEmail(req.body.email)) {
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
                    if (!user.modelHelper.comparePassword(req.body.password)) {
                        return res.status(401).json({message: 'Authentication failed. Invalid password.'});
                    }
                    return res.json({
                        login: req.body.email,
                        message: "Login successful !",
                        token: jwt.sign({email: user.email, _id: user._id, admin: user.admin}, 'secret')
                    });
                } else {
                    res.status(400).json({message: 'Authentication failed. Invalid username.'});
                }
            }
        )
    },

    profile: function(req, res) {
        if (req.header.token != null) {
            var email = jwt_decode(req.body.token).email;
            User.findOne({
                email: email
            }, function(err, user) {
                if (user)
                    res.send(user)
                else
                    res.send({message: "Profile not found."});
            })
        } else {
            res.send({message: "Access to profile forbidden ! You need to send the authentication token."})
        }
    },

    listUsers: function(req, res){
        User.find(function(err, user){
            if (err) {
                res.send(err);
            }
            res.json(user);
        })
    },

    updateProfile: function(req, res) {
        if (req.header.token != null) {
            var id = jwt_decode(req.body.token)._id;
            User.findOne({
                _id: id
            }, function (err, user) {
                if (err)
                    res.send(err);
                if (req.body.email != null)
                    user.email = req.body.email
                if (req.body.name != null)
                    user.name = req.body.name
                if (req.body.admin != null)
                    user.admin = req.body.admin
                user.save();
                res.json({token: jwt.sign({email: user.email, _id: user._id, admin: user.admin}, 'secret'),
                    message: "Update successful !"});
            })
        } else {
            res.send({message: "Update failed. You need to send the authentication token."});
        }
    },

    updatePassword: function(req, res) {
        if (req.header.token != null) {
            var email = jwt_decode(req.body.token)._id;
            User.findOne({
                _id: id
            }, function(err, user) {
                if (user) {
                    if (req.body.password == null) {
                        res.send({message: "Update password failed. Your current password field is empty."})
                    } else if (req.body.new_password == null) {
                        res.send({message: "Update password failed. Your new password field is empty."})
                    } else {
                        if (!user.modelHelper.comparePassword(req.body.password)) {
                            return res.status(401).json({message: 'Update password failed. Current password is incorrect.'});
                        } else {
                            user.password = bcrypt.hashSync(req.body.new_password, 10);
                            user.save();
                            return res.json({message: "Update password success !"})
                        }
                    }
                }
            })
        } else {
            res.send({message: "Update password failed. You need to send the authentication token."});
        }
    },

    deleteUser: function(req, res) {
        if (req.body.token != null) {
            var admin = jwt_decode(req.body.token).admin;
            var id = jwt_decode(req.body.token)._id;
            if (id == req.body.id)
                res.send("You cannot delete your own account, go to unregister section !");
            if (admin == 1) {
                User.findOne({
                    _id: req.body.id
                }, function (err, user) {
                    if (err)
                        res.send(err);
                    if (user != null) {
                        user.remove();
                        res.send({message: "Delete successful !"})
                    } else
                        res.json({message:"Cannot delete. User not found."});
                })
            } else {
                res.send("Deletion failed. You are not admin !")
            }
        } else {
            res.send({message: "Deletion failed. You need to send the authentication token."});
        }
    },

    unregister: function(req, res) {
        if (req.body.token != null) {
            var id = jwt_decode(req.body.token)._id
            User.findOne({
                _id: id
            }, function(err, user) {
                if (err)
                    res.send(err);
                if (user != null) {
                    user.remove();
                    res.send({message: "Unregister successful !"})
                } else
                    res.send({message: "Cannot unregister. This account doesn't exist."})
            });
        } else {
            res.send({message: "Unregistration failed. You need to send the authentication token."});
        }
    },

    addPhoto: function(req, res) {
        //if (req.headers.token != null) {
            //let id = jwt_decode(req.body.token)._id
            //User.findOne({
            //    _id: id
            //}, function(err, user) {
                if (req.file) {
                    console.log(req.file);
                    file = req.file
                    res.send(file)
                }
                if (err)
                    res.send(err);
                res.send({message:"ok"})
            //})
        //} else {
        //    res.send({message: "not connected"});
        //}
    }
}