const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    username: { type: String},
    email: { type: String},
    image: { type: String},
    facebookId: { type: String},
    googleId: { type: String},
    interest: [{ type: mongoose.Schema.Types.ObjectId }],
    friends: [{ type: mongoose.Schema.Types.ObjectId }]
});


module.exports = mongoose.model('User', userSchema);