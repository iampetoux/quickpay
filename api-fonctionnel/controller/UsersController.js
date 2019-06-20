var bcrypt  = require('bcrypt'),
    jwt     = require('jsonwebtoken'),
    User = require('../models/users'),
    jwt_decode = require('jwt-decode'),
    //stripe = require('stripe')('pk_test_hlC7NqP41x0IIAWPCBbOoLgA00te54NVdC');
    stripe = require('stripe')('sk_test_JkLY9qfOJ8viaL1Ij1c8Qkcy00lbB8ZvFw');

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
                        password: bcrypt.hashSync(req.body.password, 10),
                        picture: ""
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
                        token: jwt.sign({email: user.email, _id: user._id, admin: user.admin}, 'secret')
                    });
                } else {
                    res.status(400).json({message: 'Authentication failed. Invalid username.'});
                }
            }
        )
    },

    profile: function(req, res) {
        if (req.headers.token != null) {
            var email = jwt_decode(req.headers.token).email;
            User.findOne({
                email: email
            }, function(err, user) {
                if (user)
                    res.send(user)
                else
                    res.send({message: "Profile not found."});
            })
        } else {
            console.log(req.headers);
            res.send({message: "Access to profile forbidden ! You need to send the authentication token."})
        }
    },

    listUsers: function(req, res){

        User.find()
        .select('_id email picture')
        .exec()
        .then(function(err, user){
            if (err) {
                res.send(err);
            }
            res.json({user});
        })
    },

    updateProfile: function(req, res) {
        if (req.headers.token != null) {
            var id = jwt_decode(req.headers.token)._id;
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
        if (req.headers.token != null) {
            var email = jwt_decode(req.headers.token)._id;
            User.findOne({
                _id: id
            }, function(err, user) {
                if (user) {
                    if (req.body.password == null) {
                        res.send({message: "Update password failed. Your current password field is empty."})
                    } else if (req.body.new_password == null) {
                        res.send({message: "Update password failed. Your new password field is empty."})
                    } else {
                        if (!user.comparePassword(req.body.password)) {
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

    delete: function(req, res) {
        if (req.headers.token != null) {
            var admin = jwt_decode(req.headers.token).admin;
            var id = jwt_decode(req.headers.token)._id;
            if (id == req.body.id)
                res.send("You cannot delete your own account, go unregister !");
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
        if (req.headers.token != null) {
            var id = jwt_decode(req.headers.token)._id
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
        if (req.headers.token != null) {
            console.log(req.headers);
            let id = jwt_decode(req.headers.token)._id
            User.findOne({
                _id: id
            }, function(err, user) {
                if (req.file) {
                    user.picture = req.file.path
                    user.save();
                    res.send(user);
                    //user.save();
                }
            })
        } else {
            res.send({message: "fail"});
        }
            //})
        //} else {
        //    res.send({message: "not connected"});
        //}
    },

    transaction: function(req, res) {
        stripe.tokens.create({
            card: {
              number: '4242424242424242',
              exp_month: 12,
              exp_year: 2020,
              cvc: '123'
            }
        }).then(function(result, err) {
            if (err) {
              res.send(err);
            }
            const tokenId = result["id"];
            return stripe.charges.create({
                amount: req.body.amount,
                currency: 'eur',
                source: tokenId,
                description: 'Test payment'
            }).then(resultat => res.status(200).json(resultat)); 
        }); 
    }
}