const TrendPlace = require('../Models/TrendingPlaces');
const Place = require('../Models/Places');

// we have a function that add places to Trending
const addPlaceToTrend = (req, res) => {
    Place.find().exec((err, places) => {
        if(err) res.status(304).jsom({message: err});
        const sortedPlaces = places.sort(function(a, b) {
            if(a.trendVol > b.trendVol) {
                return -1;
            } else {
                return 1;
            }
        });
        res.json(sortedPlaces);
    })
}

exports.getTendingPlace = (req, res, next) => {
    // TrendPlace.find().populate('placeId').exec((err, trends)=> {
    //     if(err) res.json({err:err});
    //     res.json(trends);
    // });
    addPlaceToTrend(req, res);
}

// oakconsult chota123