var { Schema, model } = require('mongoose');

const noteSchema = new Schema({
    noteText: {
        type: String,
        required: true,
        minlength: 1,
        maxlength: 280,
    },
    noteAuthor: {
        type: String,
    }
})

const itemSchema = new Schema({
    itemText:{
        type: String,
        required: 'You forget to add your item!',
        minlength: 1,
        maxlength: 280,
        trim: true,
    },
    itemAuthor:{
        type: String,
    },
    createdAt: {
        type: Date,
        default: Date.now,
        },
    notes: [noteSchema],
});

const Item = model('Item', itemSchema);

module.exports = Item;