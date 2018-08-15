const express = require('express');
const router = express.Router();
const category = require('../Controllers/CategoryController');

router.post('/', category.addCategory);

module.exports = router;