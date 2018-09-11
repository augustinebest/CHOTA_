module.exports = (req, res, next) => {
    if(!req.user) {
        console.log('You are not logged in');
        res.redirect('/auth/login');
    } else {
        next();
    }
}