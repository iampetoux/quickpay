var bcrypt  = require('bcrypt'),
    jwt     = require('jsonwebtoken'),
    User = require('../models/users'),
    jwt_decode = require('jwt-decode'),
    stripe = require('stripe')(process.env.PRIVATE_KEY);

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
                /*if (err) {
                    throw err; //res.send(err);
                }*/
                if (user) {
                    if (!user.comparePassword(req.body.password)) {
                        return res.status(401).json({message: 'Authentication failed. Invalid password.'});
                    }
                    return res.status(200).json({
                        login: req.body.email,
                        message: "Login successful !",
                        token: jwt.sign({email: user.email, _id: user._id, admin: user.admin}, 'secret')
                    });
                } else {
                    res.status(400).json({message: 'Authentication failed. Invalid password or username.'});
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
                    res.status(200).send(user)
                else
                    res.status(400).send({message: "Profile not found."});
            })
        } else {
            console.log(req.headers);
            res.status(400).send({message: "Access to profile forbidden ! You need to send the authentication token."})
        }
    },

    listUsers: function(req, res){

        User.find()
        .select('_id email picture')
        .exec()
        .then(function(user, err){
            if (err) {
                res.status(400).send(err);
            }
            res.status(200).json({user});
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
                res.status(200).json({token: jwt.sign({email: user.email, _id: user._id, admin: user.admin}, 'secret'),
                    message: "Update successful !"});
            })
        } else {
            res.status(400).send({message: "Update failed. You need to send the authentication token."});
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
                        res.status(400).send({message: "Update password failed. Your current password field is empty."})
                    } else if (req.body.new_password == null) {
                        res.status(400).send({message: "Update password failed. Your new password field is empty."})
                    } else {
                        if (!user.comparePassword(req.body.password)) {
                            return res.status(401).json({message: 'Update password failed. Current password is incorrect.'});
                        } else {
                            user.password = bcrypt.hashSync(req.body.new_password, 10);
                            user.save();
                            return res.status(200).json({message: "Update password success !"})
                        }
                    }
                }
            })
        } else {
            res.status(400).send({message: "Update password failed. You need to send the authentication token."});
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
                        res.status(200).send({message: "Delete successful !"})
                    } else
                        res.status(400).json({message:"Cannot delete. User not found."});
                })
            } else {
                res.status(400).send("Deletion failed. You are not admin !")
            }
        } else {
            res.status(400).send({message: "Deletion failed. You need to send the authentication token."});
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
                    res.status(200).send({message: "Unregister successful !"})
                } else
                    res.status(400).send({message: "Cannot unregister. This account doesn't exist."})
            });
        } else {
            res.status(400).send({message: "Unregistration failed. You need to send the authentication token."});
        }
    },

    addPhoto: function(req, res) {
        if (req.headers.token != null) {
            console.log(req.headers);
            let id = jwt_decode(req.headers.token)._id
            User.findOne({
                _id: id
            }, function(err, user) {
                if (err) {
                    res.send(err);
                }
                if (req.file) {
                    user.picture = req.file.path
                    user.save();
                    res.status(200).send(user);
                    //user.save();
                }
            })
        } else {
            res.status(400).send({message: "fail"});
        }
            //})
        //} else {
        //    res.send({message: "not connected"});
        //
    },

    account_token: function(req, res) {
        return stripe.tokens.create({
            account: {
                individual: {
                    first_name: 'Lucas',
                    last_name: 'CHEN'
                },
                tos_shown_and_accepted: true,
            },
        }).then(resultat => res.status(200).json(resultat))
        .catch(error => res.status(400).json(error));
    },

    account_stripe: function(req, res) {
        return stripe.accounts.create({
            country:'US',
            type:'custom',
            account_token: req.body.token,
        }).then(resultat => res.status(200).json(resultat))
        .catch(error => res.status(400).json(error));
    },

    transaction: function(req, res) {
        return stripe.charges.create({
            amount: req.body.amount,
            currency: 'eur',
            source: req.body.token,
            description: 'Test payment'
        }).then(resultat => res.status(200).json(resultat))
        .catch(error => res.status(400).json(error));
    },

    createStripeUser: function(req, res) {
        return stripe.customers.create({
            email: req.body.email,
            source: req.body.token
        }).then(resultat => res.status(200).json(resultat))
        .catch(error => res.status(400).json(error));
    },

    transfer: function(req, res) {
        return stripe.transfers.create({
            amount: req.body.amount,
            currency: 'eur',
            destination: req.body.destination
        }).then(resultat => res.status(200).json(resultat))
        .catch(error => res.status(400).json(error));
    }
}
