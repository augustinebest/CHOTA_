const jwt = require('jsonwebtoken');
const secret = require('../functions/secret');

module.exports.AuthMiddeWare = (req, res, next) => {
    try {
        const token = req.headers.authorization;
        const decode = jwt.verify(token, secret.key)
            // if(err)throw err;
            req.userData = decode;
        
        next();
    } catch (error) {
        res.status(401).json({
            message: 'You are not authorized to access this routes!'
        });
    }
    // console.log('Yay');
} 