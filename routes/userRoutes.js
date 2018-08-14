const express = require('express');
const router = express.Router();
const passport = require('passport');
const userController = require('../Controllers/userControllers');

// For google
router.get('/login', (req, res) => {
    res.render('login');
})

router.get('/signup', (req, res) => {
    res.render('signup');
})

router.get('/logout', (req, res) => {
    res.send('loging out...');
})

router.get('/google', passport.authenticate('google', {
    scope: ['profile', 'email']
}))

// Callback route for redirect
router.get('/google/redirect', passport.authenticate('google'), (req, res) => {
    res.redirect('/interest/');
})



// For Facebook

router.get('/facebook', passport.authenticate('facebook', { 
    scope: ['user_friends', 'manage_pages', 'email'] 
}))

// Callback route for redirect
router.get('/facebook/redirect', passport.authenticate('facebook'), (req, res) => {
    // console.log(req.user);
    res.redirect('/interest/');
})


// User Add Interest
router.post('/addInterest', userController.userAddInterest);

module.exports = router;