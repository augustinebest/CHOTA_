const express = require('express');
const router = express.Router();
const passport = require('passport');
const userController = require('../Controllers/userControllers');
var jwt = require('jsonwebtoken');
const checkAuth = require('../functions/checkAuth');
const secret = 'secretkey';


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
    const token = jwt.sign({email : req.user.email,image :req.user.image, username: req.user.username}, secret, {expiresIn: '24hr'});
    res.redirect('localhost://3000/auth/facebook' + token );
})

// For Facebook

router.get('/facebook', passport.authenticate('facebook', { 
    scope: ['user_friends', 'manage_pages', 'email'] 
    
}), function(req,res){
    res.send(req);
})

// Callback route for redirect
router.get('/facebook/redirect', passport.authenticate('facebook'), (req, res) => {
    // console.log(req.user);
    const token = jwt.sign({email : req.user.email,image :req.user.image, username: req.user.username}, secret, {expiresIn: '24hr'});
    res.json({tokengotten: token} );
})


// User Add Interest
router.post('/select', checkAuth.AuthMiddeWare, userController.userAddInterest);
router.post('/select', checkAuth.AuthMiddeWare, userController.addFriend);

// local signup
router.post('/signup', userController.signup);
router.post('/login', userController.login);

module.exports = router;