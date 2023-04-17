const { Schema, model } = require("mongoose");

const movieSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
    },
    movies: [
        {
            id: Number,
            poster_path: String,
            title: String,
            status: {
                type: String,
                enum: ['Watched', 'To Watch'],
                default: 'To Watch',
            },
            genres: Array,
        },
    ],
});


module.exports = model("Movie", movieSchema);