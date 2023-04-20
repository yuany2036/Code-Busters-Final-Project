import React, { useState } from 'react';
import axios from 'axios';
import styles from './Preferences.module.scss';
import { useNavigate } from 'react-router-dom';

const Preferences = () => {
  const [bookLover, setBookLover] = useState(false);
  const [movieWatcher, setMovieWatcher] = useState(false);
  const [genres, setGenres] = useState([]);

  const navigate = useNavigate();
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

  const handleSubmit = async (event) => {
    event.preventDefault(); // prevent the form from reloading the page
    console.log('Submitting preferences...');
    try {
      const response = await axios.post('/preferences', {
        bookLover,
        movieWatcher,
        genres,
      });
      console.log('Preferences stored successfully:', response.data);
      if (response.status === 200) {
        alert('Your preferences were submitted');
        navigate('/explore');
      }
    } catch (error) {
      console.error('Failed to store preferences:', error);
    }
  };

  return (
    <div>
      <h1 className={styles.preferences_container}>Help us get to know you better</h1>
      <form onSubmit={handleSubmit}>
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
          {/* will add more genre options */}
        </select>
        <button className={styles.submit} type="submit">
          Submit
        </button>
      </form>
    </div>
  );
};

export default Preferences;
