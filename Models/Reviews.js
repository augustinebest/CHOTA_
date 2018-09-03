const mongoose = require('mongoose');

const reviewSchema = mongoose.Schema({
    commentBody : { type: String, required: true },
    date: { type: Date, default: Date.now },
    user_id: { type:String, required:true }
});


module.exports = mongoose.model('Reviews', reviewSchema);