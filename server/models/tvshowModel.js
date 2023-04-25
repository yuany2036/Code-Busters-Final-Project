const { Schema, model } = require("mongoose");

const tvSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
    },
    series: [
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
            seasons: Array,
        },
    ],
});


module.exports = model("TV", tvSchema);