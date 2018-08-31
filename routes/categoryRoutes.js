const express = require('express');
const router = express.Router();
const category = require('../Controllers/categoryControllers');
// const checkAuth = require('../functions/secret');

router.post('/', category.addCategory);
router.get('/',  category.getAllCategories);
router.get('/search/:category', category.getACategory);
router.get('/get/:category', category.getCategory);

module.exports = router;