const express = require('express');
const router = express.Router();
const item = require('../Controllers/itemControllers');

router.post('/', item.addItem);

router.get('/', item.getItem);

router.delete('/:id', item.deleteItem);

module.exports = router;