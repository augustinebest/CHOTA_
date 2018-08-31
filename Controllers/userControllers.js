const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20');
const FacebookStrategy = require('passport-facebook').Strategy;
const keys = require('../config/keys');
const User = require('../Models/User');
const bcrypt = require('bcrypt');
const secret = require('../functions/secret');
const jwt = require('jsonwebtoken');
const mailer = require('../functions/mailer');

passport.serializeUser((user, done) => {
    done(null, user);
}) 

passport.deserializeUser((id, done) => {
    User.findById(id).exec()
    .then(user => {
        done(null, user);
    })
    .catch(err => {
        console.log(err);
    });
})

passport.use(new GoogleStrategy({
    callbackURL: '/auth/google/redirect',
    clientID: keys.google.clientID,
    clientSecret: keys.google.clientSecret
}, (req, accessToken, refreshToken, profile, done) => {
    // Check if the User already exists in the database
    User.findOne({googleId: profile.id})
    .exec()
    .then(currentUser => {
        if(currentUser) {
            // console.log('This is the current User from google: ' + currentUser);
            done(null, currentUser);
        } else {
            const newUser = new User({
                username: profile.displayName,
                email: profile.emails[0].value,
                googleId: profile.id,
                image: profile._json.image.url
            });
            return newUser.save()
            .then(result => {
                console.log('New User created from google' + result);
                done(null, result);
            })
            .catch(err => {
                console.log(err);
            });
        }
    })
    .catch(err => {
        console.log(err);
    });
}));

// Facebook Authentication
passport.use(new FacebookStrategy({
    clientID: keys.facebook.clientID,
    clientSecret: keys.facebook.clientSecret,
    callbackURL: '/auth/facebook/redirect',
    profileFields: ['id', 'displayName', 'picture', 'emails']
}, (req, accessToken, refreshToken, profile, done) => {
     // Check if the User already exists in the database
    User.findOne({facebookId: profile.id})
    .exec()
    .then(currentUser => {
        if(currentUser) {
            done(null, currentUser);
        } else {
            const newUser = new User({
                username: profile.displayName,
                email: profile.emails[0].value,
                facebookId: profile.id,
                image: profile.photos[0].value
            });
            return newUser.save()
            .then(result => {
                console.log('New User created from facebook' + result);
                done(null, result);
            })
            .catch(err => {
                console.log(err);
            });
        }
    })
    .catch(err => {
        console.log(err);
    });
}))

// local signup
exports.signup = (req, res, next) => {
    try {
        if(req.body.password == null || req.body.username == null || req.body.email == null) {
            res.status(404).json({message: 'Fill the required fields'});
        } else {
            User.findOne({email: req.body.email})
            .then(result => {
                if(result) {
                    res.status(201).json({message: 'This email already exists!'});
                } else {
                    User.findOne({username: req.body.username})
                    .then(username => {
                        if(username) {
                            res.status(202).json({message: 'This username already exists!'});
                        } else {
                            bcrypt.hash(req.body.password, 10, (err, hash) => {
                                if(err) res.status(203).json(err);
                                else {
                                    const user = new User({
                                        email: req.body.email,
                                        username: req.body.username,
                                        password: hash
                                    });
                                    user.save()
                                    .then(user => {
                                        res.status(200).json({message: 'This user have been registered'});
                                    })
                                    .catch(err => {
                                        res.status(205).json({err: err});
                                    });
                                }
                            })
                            
                        }
                    })
                    .catch(err => {
                        res.status(208).json({err: err});
                    });
                }
            })
            .catch(err => {
                console.log({err: err});
            }); 
        }
    } catch(error) {
        res.status(307).json({error: error});
    }
    
    
}

// login
exports.login = (req, res, next) => {
    try {
        if(req.body.email == null || req.body.password == null) {
            res.status(201).json({message: 'Fill the required fields'});
        } else {
            User.findOne({email: req.body.email}).select('email password username').exec(function(err, currentUser) {
                if(err) res.status(202).json({err: err});
                if(!currentUser) {
                    res.status(404).json({message: 'This user does not exist!'});
                } else {
                    const checkPassword = bcrypt.compareSync(req.body.password, currentUser.password);
                    if(!checkPassword) {
                        res.status(402).json({message: 'email or password invalid!'});
                    } else {
                        var token = jwt.sign({email: currentUser.email, id: currentUser._id}, secret.key, {expiresIn: '12h'});
                        res.status(200).json({message: 'You have logged in successfully!', token: token});
                    }
                }
            });
        }
    } catch(error) {
        res.status(308).json({error: error});
    }
}

// adding interest 
exports.userAddInterest = (req, res, next) => {
    // console.log(req.userData.id);
    User.findById(req.userData.id).exec((err, user) => {
        if(err) console.log(err);
        else {
            try {
                // console.log(user);
                const interest = [req.body.interest];
                const enter = user.interest.push(interest);
                
                if(enter) {
                    user.save();
                    res.status(203).json({message: 'Interest added succesfully!'});
                } else{
                    console.log('error occured while adding your interest!');
                }
            } catch(error) {
                res.status(404).json({message: 'Cannot find the required user!'});
            }
        }
    })
}

// User profile
exports.userProfile = (req, res, next) => {
    const user_id = {_id: req.params.user_id};
    try {
        User.findOne(user_id, 'username email image').exec((err, user) => {
            if(err) res.status(309).json({message: 'Unable to find this user!'});
            if(!user) {
                return res.status(304).json({message: 'This user does not exist!'});
            }
            res.status(200).json({user: user});
        })
        console.log(user_id)
    } catch(error) {
        res.status(408).json({error: error});
    }
}

exports.editProfile = (req, res, next) => {
    const user_id = {_id: req.params.user_id};
    const data = {
        username : req.body.username,
        // image : req.body.image
    }
    User.update(user_id, data).exec((err, result) => {
        if(err) res.status(301).json({message: err});
        if(!result) res.status(404).json({message: 'This user does not exists!'});
        res.json({message: 'This user have been updated!'});
    })
}

// follow friends
exports.addFriend = (req, res, next) => {
    // console.log('Yay');
    
}

// Unfollow friends
exports.unfollowFriends = (req, res, next) => {
    console.log('Yay!');
}

// Search for a user 
exports.searchUser = (req, res) => {
    const userId = req.params.user_id;
    try {
        User.find({'username': {$regex: userId, $options: 'i'}})
        .exec()
        .then(user => {
            if(user.length == 1) res.status(200).json({message: `we found ${user.length} user`, user: user});
            else {
                res.status(200).json({message: `we found ${user.length} users`, user: user})
            }
        })
        .catch(err => {
            res.status(404).json({err: 'User not found'});
        });
    } catch(error) {
        res.status(405).json({error: error});
    }
}

exports.userForgotPassword = (req, res, next) => {
    // res.json('Change your password')
    const email = {email:req.body.email};
    const update = Math.floor(9372+Math.random()*10000).toString();
    try {
        User.findOne(email).exec((err, user) => {
            if(err) {
                res.status(404).json({message: 'Error ocurred while getting this user!'});
            }
            if(!user) {
                res.status(404).json({message: 'This user cannot be found!'});
            }
            bcrypt.hash(update, 10, (err, hash) => {
                if (err) {
                    res.json({err: err});
                } else {
                    User.findOneAndUpdate(email, {token: hash}).exec((err) => {
                        if(err) res.json({err: err});
                        mailer.recoveryPassword(email.email, (err, info) => {
                            if(err) res.json({err: 'error occurred while sending this mail'});
                            else {
                                res.status(200).json({message: 'Please check your email on a link to add your new password!'});
                             }
                        }, hash);
                    })
                }
            })
        })
    } catch(error) {
        res.status(504).json({error: error});
    }
}

exports.getUserToken = (req, res, next) => {
    try {
        const password = { password: req.body.password };
        const c_password = { c_password: req.body.c_password };
        if(req.body.password == null || req.body.c_password == null || req.body.password == '' || req.body.c_password == '') {
            res.status(404).json({message: 'You have to fill the required field(s)'});
        } else {
            if (req.body.password != req.body.c_password) {
                res.status(404).json({message: 'Unmatched password!'});
            } else {
                const email = req.query.email;
                const token = req.query.token;
                    User.findOne({email: email}).exec((err, user)=> {
                        if(err) res.status(200).json({message: 'Error occurred while getting this user'});
                        if(user.token != token || user.email != email) {
                            res.status(404).json({message: 'This does not exist!'});
                        } else {
                            bcrypt.hash(req.body.password, 10, (err, hash) => {
                                if (err) {
                                    res.json({err: err});
                                } else {
                                    user.password = hash;
                                    user.save();
                                    res.status(200).json({message: 'Your password have been updated!'});
                                }
                            })
                        }
                    })
            }
        }
    } catch(error) {
        res.status(307).json(error);
    }
}