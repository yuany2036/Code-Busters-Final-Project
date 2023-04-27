import React, { useEffect, useState } from 'react';
import MediumCard from './MediumCard';
import styles from './CrossUniverse.module.scss';

const CrossUniverse = ({ title }) => {
  const [movies, setMovies] = useState([]);

  const apiKey = 'ad6c50ff4b12daee4d3c2b875c8684fc';
  const movie_id = 76600; //avatar
  // const movie_id = 677179; //creed 3
  // const movie_id = 496243; //parasite
  const searchUrl = `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${title}`;

  const movieURL =
    'https://api.themoviedb.org/3/movie/popular?api_key=ad6c50ff4b12daee4d3c2b875c8684fc&language=en-US&page=1';

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await fetch(movieURL);
        const data = await response.json();
        setMovies(data.results.slice(0, 3));
      } catch (error) {
        console.error(error);
      }
    };

    fetchMovies();
  }, []);

  return (
    <div className={styles.medium_container}>
      <div className={styles.medium_container_left}>
        <h2 className={styles.medium_container_left_title}>How about..</h2>
        <div className={styles.medium_container_left_text}>
          <p>expanding your circle of interest?</p>
          <p> maybe even cross to the other side of the universe ... </p>
        </div>
        <div className={styles.arrow}></div>
      </div>
      <div className={styles.medium_container_right}>
        {movies.map((movie) => (
          <MediumCard key={movie.id} movie={movie} />
        ))}
      </div>
    </div>
  );
};

export default CrossUniverse;

