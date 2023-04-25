import React, { useState, useEffect } from 'react';
import MovieCard from '../card/MovieCard';
import styles from '../card/MovieCard.module.scss';

const MoviesList = () => {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await fetch(
          'https://api.themoviedb.org/3/discover/movie?api_key=ad6c50ff4b12daee4d3c2b875c8684fc&sort_by=popularity.desc'
        );
        const data = await response.json();
        setMovies(data.results.slice(0, 10));
      } catch (error) {
        console.error('Error fetching movies:', error);
      }
    };
    fetchMovies();
  }, []);

  return (
    <div>
      <h1 className={styles.top_movies}>Top Movies at the moment</h1>
      <div className={styles.explore_movies}>
        {movies.map((movie) => (
          <MovieCard
            key={movie.id}
            title={movie.title}
            posterPath={movie.poster_path}
          />
        ))}
      </div>
    </div>
  );
}

export default MoviesList;
