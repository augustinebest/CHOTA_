const express = require('express');
const router = express.Router();
const passport = require('passport');

// For google
router.get('/login', (req, res) => {
    res.render('login');
})

router.get('/logout', (req, res) => {
    res.send('loging out...');
})

router.get('/google', passport.authenticate('google', {
    scope: ['profile']
}))

// Callback route for redirect
router.get('/google/redirect', passport.authenticate('google'), (req, res) => {
    res.redirect('/profile/' + req.user._id);
})

// For Facebook

router.get('/facebook', passport.authenticate('facebook', { 
    scope: ['user_friends', 'manage_pages'] 
}))

// Callback route for redirect
router.get('/facebook/redirect', passport.authenticate('facebook'), (req, res) => {
    // res.redirect('/profile/' + req.user._id);
    res.send('You reached here');
})

module.exports = router;