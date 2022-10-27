const mongoose = require('mongoose');
const dateFormat = require('../utils/dateFormat');

const { Schema, model } = mongoose;

const listSchema = new Schema({
    createdAt: {
        type: Date,
        default: Date.now
        get: (timestamp) => dateFormat(timestamp);
    },
    items: [
    {
        type: Schema.Types.ObjectId,
        ref: 'Item'
    }
    ]
});

const List = mongoose.model('List', listSchema);

module.exports = List;