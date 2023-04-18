const { Schema, model } = require("mongoose");

const bookSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
    },
    books: [
        {
            id: String,
            poster_path: Object,
            title: String,
            status: {
                type: String,
                enum: ['Read', 'To Read'],
                default: 'To Read',
            },
            genres: Array,
        },
    ],
});


module.exports = model("Book", bookSchema);