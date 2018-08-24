const express = require('express');
const router = express.Router();
const reviewController = require('../Controllers/reviewsControllers');

router.post('/add', reviewController.addReview);
router.post('/', reviewController.getAllReviewsOnAPlace);

module.exports = router;