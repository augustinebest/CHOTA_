const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = mongoose.Schema({
   username: String,
   googleId: String,
   image: String
});


module.exports = mongoose.model('User', userSchema);