import React, { useState, useEffect } from 'react';
import MovieCard from '../card/MovieCard';
import styles from '../card/Card.module.scss';
import axios from 'axios';

const MoviesList = () => {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await axios.get('/movies/popular');
        setMovies(response.data.slice(0, 20));
      } catch (error) {
        console.error('Error fetching movies:', error);
      }
    };
    fetchMovies();
  }, []);

  return (
    <div>
      <h1 className={styles.top_h1}>Top Movies at the moment</h1>
      <div className={styles.explore}>
        {movies.map((movie) => (
          <MovieCard
            key={movie.id}
            id={movie.id}
            title={movie.title}
            posterPath={movie.poster_path}
          />
        ))}
      </div>
    </div>
  );
};

export default MoviesList;
