const mongoose = require('mongoose');

const reviewSchema = mongoose.Schema({
    commentBody : { type: String, required: true },
    placeId : { type: mongoose.Schema.Types.ObjectId, ref: 'Place' }
});


module.exports = mongoose.model('Reviews', reviewSchema);