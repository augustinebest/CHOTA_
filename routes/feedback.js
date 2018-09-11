const express = require('express');
const router = express.Router();
const feedback = require('../Controllers/feedbackController');

router.post('/', feedback.addFeedback);
router.get('/', feedback.getAllFeedback);
router.get('/:name', feedback.searchFeedback);

module.exports = router;