const express = require('express');
const router = express.Router();
const category = require('../Controllers/categoryControllers');

router.post('/', category.addCategory);

module.exports = router;