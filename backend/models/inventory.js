const mongoose = require('mongoose');

const inventorySchema = mongoose.Schema({
    id: mongoose.Schema.Types.ObjectId,
    description: {type: String, required: true},
    quantity: {type: Number, required: true},
    floor: {type: Number, required: true},
    cell: {type: Number, required: true},
    threshold: {type: Number, required: true},
});

module.exports = mongoose.model('Inventory', inventorySchema)