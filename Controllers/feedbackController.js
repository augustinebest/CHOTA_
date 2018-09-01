const Feedback = require('../Models/feedback');

exports.addFeedback = (req, res, next) => {
    const commentBody = {commentBody: req.body.commentBody};
    try {
        if(req.body.commentBody == null || req.body.commentBody == '') {
            res.json({message: 'You have to fill the required field!'});
        } else {
            Feedback.create(commentBody, (err, feedback) => {
                if(err) res.status(308).json({message: 'error occurred while adding your feedback'});
                else {
                    res.status(200).json({message: 'Thank you for your feedback!'});
                }
            })
        }
    } catch(error) {
        res.status(409).json({error: error});
    } 
    
}

exports.getAllFeedback = (req, res, next) => {
    try {
        Feedback.find().exec((err, result) => {
            if(err) res.status(301).json({message: 'Error occurred in getting this posts!'});
            else {
                res.status(200).json({message: `There are ${result.length} feedbacks now!`, result: result});
            }
        })
    } catch(error) {
        res.status(409).json({error: error});
    }
    
}

exports.searchFeedback = (req, res, next) => {
    const name =  req.params.name;
    Feedback.find({'commentBody': {$regex: name, $options: 'i'}}).exec((err, result) => {
        if(err) res.status(509).json({err: err})
        res.status(200).json({result: result});
    })
}