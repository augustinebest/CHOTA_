const express = require('express');
const router = express.Router();
const category = require('../Controllers/categoryControllers');
// const checkAuth = require('../functions/secret');
const path = require('path');
const multer = require('multer');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/places/');
    },
    filename: function(req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
});

const fileFilter = (req, file, cb) => {
    if(file.mimetype == 'image/jpeg' || file.mimetype == 'image/png') {
        cb(null, true);
    } else {
        cb(null, false);
    }
} 

const upload = multer({
    storage: storage,
    limits: {
    fileSize: 1024 * 1024 * 5
    },
    fileFilter: fileFilter
 });
 

router.post('/', upload.single('image'), category.addCategory);
router.get('/', category.getAllCategories);
router.get('/search/:category', category.getACategory);
router.delete('/', category.deleteAllCategory);

module.exports = router;