const express = require('express');
const router = express.Router();
const trendingPlacesController = require('../Controllers/trendingPlaces');

router.get('/', trendingPlacesController.getTendingPlace);

module.exports = router;