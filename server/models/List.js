const mongoose = require('mongoose');

const { Schema, model } = mongoose;

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
});

const listSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'user',
    },
    email: {
        type: String
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    listAuthor: {
        type: String,
        required: true,
        trim: true,
    },
    listName: {
        type: String,
        required: true,
        trim: true,
    },
    items: [itemSchema],
    notes: [noteSchema]
});

const List = mongoose.model('List', listSchema);

module.exports = List;