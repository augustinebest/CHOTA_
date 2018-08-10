const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20');
const FacebookStrategy = require('passport-facebook').Strategy;
const keys = require('../config/keys');
const User = require('../Models/User');

passport.serializeUser((user, done) => {
    // console.log(user.id);
    done(null, user.id);
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
            console.log('This is the current User from google: ' + currentUser);
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
            console.log('This is the current User from facebook: ' + currentUser);
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
   console.log(profile);
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

// adding 