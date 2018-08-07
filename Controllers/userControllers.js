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
}, (accessToken, refreshToken, profile, done) => {
    // Check if the User already exists in the database
    User.findOne({googleId: profile.id})
    .exec()
    .then(currentUser => {
        if(currentUser) {
            console.log('This is the current User: ' + currentUser);
            done(null, currentUser);
        } else {
            const newUser = new User({
                username: profile.displayName,
                googleId: profile.id,
                image: profile._json.image.url
            });
            return newUser.save()
            .then(result => {
                console.log('New User created ' + result);
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
    profileFields: ['id', 'displayName', 'picture', 'email']
}, (accessToken, refreshToken, profile, done) => {
   console.log(profile);
}))