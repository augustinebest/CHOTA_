const mongoose = require('mongoose');

const placeSchema = mongoose.Schema({
    name: { type: String },
    photos: [],
    description: { type: String },
    ratings: { type: Number },
    reviews: { type: mongoose.Types.Schema.ObjectId, ref: 'reviews' },
    mapview: '',
})

module.exports = mongoose.model('Place', placeSchema);