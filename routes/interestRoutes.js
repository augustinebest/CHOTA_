const express = require('express');
const router = express.Router();
const checkAuth = require('../checkAuth/checkAuth');
const interestController = require('../Controllers/interestControllers');
const path = require('path');
const multer = require('multer');
// const upload = multer({ dest: 'uploads/' });

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: function(req, file, cb) {
        // cb(null, file.originalname);
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
 
router.post('/', upload.single('image'), interestController.addInterest);
router.get('/', interestController.getAllInterest);
router.delete('/:id', interestController.deleteInterest);

module.exports = router;