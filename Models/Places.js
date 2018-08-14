const mongoose = require('mongoose');

const placeSchema = mongoose.Schema({
    name: { type: String },
    image: [],
    description: { type: String },
    ratings: { type: Number },
    reviews: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Reviews' }]
    // mapview: '',
});

module.exports = mongoose.model('Place', placeSchema);