const mongoose = require('mongoose');

const FeedbackSchema = mongoose.Schema({
    name: { type: String, require: true},
    email: {type: String, 
        unique: true,
        match: /[a-zs0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/
    },
    commentBody: { type: String, require: true},
    date: { type: Date, default: Date.now}
});

module.exports = mongoose.model('Feedback', FeedbackSchema);