const mongoose = require('mongoose');

const trendPlaceSchema = mongoose.Schema({
    placeId: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Place' }]
});

module.exports = mongoose.model('trendingPlace', trendPlaceSchema);