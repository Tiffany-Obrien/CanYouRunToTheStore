const mongoose = require('mongoose');
const dateFormat = require('../utils/dateFormat');

const { Schema, model } = mongoose;

const listSchema = new Schema({
    createdAt: {
        type: Date,
        default: Date.now
        get: (timestamp) => dateFormat(timestamp);
    },
    name: {
        type: String,
    },
    store: {
        type: String,
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