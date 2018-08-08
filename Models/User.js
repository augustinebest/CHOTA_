const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = mongoose.Schema({
   g_username: { type: String, default: null },
   googleId: { type: String, default: null },
   g_image: { type: String, default: null },
   f_username: { type: String, default: null },
   facebookId: { type: String, default: null },
   f_image: { type: String, default: null },
});


module.exports = mongoose.model('User', userSchema);