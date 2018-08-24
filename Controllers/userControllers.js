const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20');
const FacebookStrategy = require('passport-facebook').Strategy;
const keys = require('../config/keys');
const User = require('../Models/User');
const bcrypt = require('bcrypt');
const secret = require('../functions/secret');
const jwt = require('jsonwebtoken');

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
//     // Check if the User already exists in the database
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

// Search for a user 
exports.searchUser = (req, res) => {
    const userId = { _id: req.body.userid };
    User.find(userid)
    .exec()
    .then(user => {
        if(user) {
            console.log(user);
        } else {
            console.log('This user does not exist!');
        }
    })
    .catch();
}

// local signup
exports.signup = (req, res, next) => {
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
                        res.status(201).json({message: 'This username already exists!'});
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
                                    console.log({err: err});
                                });
                            }
                        })
                        
                    }
                })
                .catch();
            }
        })
        .catch(err => {
            console.log({err: err});
        }); 
    }
    
}

exports.login = (req, res, next) => {
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
                    res.status(200).json({message: 'You have logged in successfully!' + token});
                }
            }
        });
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

// adding friends
exports.addFriend = (req, res, next) => {
    console.log('Yay');
}