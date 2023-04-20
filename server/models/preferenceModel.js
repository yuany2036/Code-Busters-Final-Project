const { Schema, model } = require("mongoose");

const preferencesSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
    },
    bookLover: Boolean,
    movieWatcher: Boolean,
    genres: [String]
});

module.exports = model('Preferences', preferencesSchema);