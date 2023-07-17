const express = require('express');
const requireAuth = require('../middleware/requireAuth');
const router = express.Router();

const Inventory = require('../models/inventory');

// router.use(requireAuth);

// Handle incoming GET requests to view all possible items
router.get('/', (req, res, next) => {
    Inventory.find(function (err, inventory) {
        if (err) {
            res.status(500).send('Error occured while fetching data')
            console.log(err);
        }
        else {
            res.json(inventory)
        }
    })
})

router.get('/shortage', async(req, res, next) => {
    try {
        const inventory = await Inventory.find({ $expr: { $lte: ['$quantity', '$threshold'] } });
        console.log(inventory);
        if(!inventory){
            res.status(400).json(inventory)
        }
        else{
            res.status(200).json(inventory)
            
        }
        
    } catch (error) {
        res.status(500).send('Error occured while fetching data')
    }
})

// Handle incoming specified GET requests to view single item
router.get('/:invId', async (req, res, next) => {
    Inventory.findById(req.params.invId)
        .exec()
        .then(inventory => {
            if (!inventory) {
                return res.status(404).json({
                    message: 'Item not found'
                })
            }
            res.status(200).json({
                inventory: inventory
            })
        })
        .catch(err => {
            res.status(500).json({
                error: err
            })
        })
})

// Handle incoming PATCH requests to modify inventory
router.patch('/:invId', (req, res, next) => {
    if (req.body.quantity < 0) {
        return res.status(400).json({
            error: 'Cannot have negative inventory'
        })
    }
    const id = req.params.invId;
    Inventory.updateOne({ _id: id }, { $set: { quantity: req.body.quantity } })
        .exec()
        .then(result => {

            res.status(200).json({
                message: 'Inventory Update'
            })
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            })
        })
})

// Handle incoming POST requests to create items
router.post('/', (req, res, next) => {
    const { description, quantity, floor, cell, threshold } = req.body;
    let inventory = new Inventory({ description: description, quantity: quantity, floor: floor, cell: cell, threshold: threshold })
    inventory.save()
        .then(inventory => {
            res.status(201).json({ 'message': 'Item added to inventory.', 'id': inventory._id })
        })
        .catch(err => {
            res.status(500).json({
                error: err
            })
        })
});

// Handle incoming DELETE requests to remove items
router.delete('/:invId', (req, res, next) => {
    Inventory.findByIdAndDelete(req.params.invId)
        .exec()
        .then(inventory => {
            if (!inventory) {
                return res.status(400).json({
                    message: 'Item does not exist'
                })
            }
            else {
                res.status(200).json({
                    message: 'Item deleted'
                })
            }
        })
        .catch(err => {
            res.status(500).json({
                error: err
            })
        })
});

module.exports = router;