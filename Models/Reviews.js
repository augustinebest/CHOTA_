const mongoose = require('mongoose');

const reviewSchema = mongoose.Schema({
    commentBody : { type: String, required: true },
    placeId : { type: mongoose.Schema.Types.ObjectId, ref: 'Place' },
    date: { type: Date, default: Date.now }
});


module.exports = mongoose.model('Reviews', reviewSchema);