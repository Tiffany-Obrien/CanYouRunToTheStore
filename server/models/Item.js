var { Schema, model } = require('mongoose');
// ??? not sure if we will actually need to format date but added it just in case 
const dateFormat = require('../utils/dateFormat');

const itemSchema = new Schema({
    itemText:{
        type: String,
        required: 'You forget to add your item!',
        minlength: 1,
        maxlength: 280,
        trim: true,
    },
    createdAt: {
    type: Date,
    default: Date.now,
    get: (timestamp) => dateFormat(timestamp),
  },
    notes: [
        {
            noteText: {
                type: String,
                required: true,
                minlength: 1,
                maxlength: 280,
            },
        },
    ],
});

const Item = model('Item', itemSchema);

module.exports = Item;