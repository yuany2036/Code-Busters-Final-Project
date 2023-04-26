const { Schema, model } = require('mongoose');

const preferencesSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
  bookLover: Boolean,
  movieWatcher: Boolean,
  genres: [
    {
      type: String, // Horror
      id: Number, // imdb id for genre
    },
  ],
});

module.exports = model('Preferences', preferencesSchema);
