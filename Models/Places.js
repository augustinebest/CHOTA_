const mongoose = require('mongoose');

const placeSchema = mongoose.Schema({
    name: { type: String },
    image: [{ type: String }],
    description: { type: String },
    date: { type: Date, default: Date.now },
    ratings: { type: Number },
    reviews: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Reviews' }]
    // mapview: '',
});

module.exports = mongoose.model('Place', placeSchema);