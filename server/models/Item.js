var { Schema, model } = require('mongoose');

const itemSchema = new Schema({
    itemText:{
        type: String,
        required: 'You forget to add your item!',
        minlength: 1,
        maxlength: 280,
        trim: true,
    },
    comments: [
        {
            commentText: {
                type: String,
                required: true,
                minlength: 1,
                maxlength: 280,
            },
        },
    ],
    // would a createdAt value be helpful or annoying???
});

const Item = model('Item', itemSchema);

module.exports = Item;