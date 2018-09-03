const express = require('express');
const router = express.Router();
const passport = require('passport');
const userController = require('../Controllers/userControllers');
var jwt = require('jsonwebtoken');
const checkAuth = require('../functions/checkAuth');
const secret = 'secretkey';
const upload = require('../functions/uploads');

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
// router.post('/select', checkAuth.AuthMiddeWare, userController.addFriend);

// local signup
router.post('/create', userController.signup);
router.post('/signin', userController.login);
router.get('/profile/:user_id', checkAuth.AuthMiddeWare, userController.userProfil);
router.patch('/profile/:user_id/edit', checkAuth.AuthMiddeWare, upload.upload.single('image'), userController.editProfile);
router.get('/search/:user_id', userController.searchUser);
router.post('/profile/:user_id/follow', checkAuth.AuthMiddeWare, userController.addFriend);
router.post('/profile/:user_id/unfollow', checkAuth.AuthMiddeWare, userController.unfollowFriends);
router.post('/recoverpassword', userController.userForgotPassword);
router.post('/recover', userController.getUserToken);

module.exports = router;