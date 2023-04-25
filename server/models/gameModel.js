const { Schema, model } = require("mongoose");

const gameSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
    },
    games: [
        {
            id: Number,
            poster_path: String,
            title: String,
            status: {
                type: String,
                enum: ['Finished', 'To Play'],
                default: 'To Play',
            },
            genres: Array,
        },
    ],
});


module.exports = model("Game", gameSchema);