import React, { useState } from 'react';
import axios from 'axios';

const Preferences = () => {
  const [bookLover, setBookLover] = useState(false);
  const [movieWatcher, setMovieWatcher] = useState(false);
  const [genres, setGenres] = useState([]);

  const handleBookLoverChange = (event) => {
    setBookLover(event.target.checked);
  };

  const handleMovieWatcherChange = (event) => {
    setMovieWatcher(event.target.checked);
  };

  const handleGenreChange = (event) => {
    const selectedGenres = Array.from(
      event.target.selectedOptions,
      (option) => option.value
    );
    setGenres(selectedGenres);
  };

  const handleSubmit = () => {
    const preferencesData = {
      bookLover,
      movieWatcher,
      genres,
    };

    // Send the preferences data to the server
    axios.post('/api/preferences', preferencesData)
      .then((response) => {
        console.log('Preferences stored successfully:', response.data);
        // Call recommendation logic with the stored preferences
      })
      .catch((error) => {
        console.error('Failed to store preferences:', error);
      });
  };

  return (
    <div>
      <h1>Preferences</h1>
      <p>Do you prefer books or movies?</p>
      <label>
        <input
          type="checkbox"
          checked={bookLover}
          onChange={handleBookLoverChange}
        />
        Book Lover
      </label>
      <label>
        <input
          type="checkbox"
          checked={movieWatcher}
          onChange={handleMovieWatcherChange}
        />
        Movie Watcher
      </label>
      <p>Select your favorite genres:</p>
      <select multiple value={genres} onChange={handleGenreChange}>
        <option value="fantasy">Fantasy</option>
        <option value="scienceFiction">Science Fiction</option>
        <option value="romance">Romance</option>
        {/* Add more genre options */}
      </select>
      <button onClick={handleSubmit}>Submit</button>
    </div>
  );
};

export default Preferences;
