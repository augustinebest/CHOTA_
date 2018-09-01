const mongoose = require('mongoose');

const FeedbackSchema = mongoose.Schema({
    commentBody: { type: String, require: true},
    date: { type: Date, default: Date.now}
});

module.exports = mongoose.model('Feedback', FeedbackSchema);