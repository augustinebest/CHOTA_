const Item = require('../Models/items');
const bodyparser = require('body-parser');

exports.addItem = (req, res) => {
    const item = new Item({
        name: req.body.name,
    });
    item.save()
    .then(result => {
        res.status(200).json(result);
    })
    .catch(err => {
        res.status(500).json({message: 'Cannot add item!'});
    });
}

exports.getItem = (req, res) => {
    Item.find({})
    .then(result => {
        res.status(200).json(result);
    })
    .catch(err => {
        res.status(404).json({message: 'Unable to find Items!'});
    });
}

exports.deleteItem = (req, res) => {
    const itemId = {_id : req.params.id};
    Item.remove(itemId)
    .then(result => {
        res.status(200).json({message: 'Item deleted Successfully!'});
    })
    .catch(err => {
        res.status(500).json({message: 'Unable to delete item!'});
    })
}