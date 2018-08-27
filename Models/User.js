const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    username: { type: String},
    email: {type: String, 
        unique: true,
        match: /[a-zs0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/
    },
    image: { type: String, default:'../uploads/1.jpg' },
    facebookId: { type: String},
    googleId: { type: String},
    interest: [{ type: mongoose.Schema.Types.ObjectId }],
    friends: [{ type: mongoose.Schema.Types.ObjectId }],
    password: {type:String, required:true}
});


module.exports = mongoose.model('User', userSchema);