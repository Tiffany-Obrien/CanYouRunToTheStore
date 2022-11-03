var { Schema, model } = require('mongoose');

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