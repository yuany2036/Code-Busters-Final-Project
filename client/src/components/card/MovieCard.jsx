import React from 'react';
import styles from '../card/MovieCard.module.scss';

const MovieCard = ({ title, posterPath }) => {
  const posterUrl = `https://image.tmdb.org/t/p/w500${posterPath}`;

  return (
    <div className={styles.movie}>
      <img className={styles.movie_poster} src={posterUrl} alt={title} />
      <div className={styles.movie_details}>
        <h2 className={styles.movie_title}>{title}</h2>
      </div>
      <div className={styles.btn}>
        <button className={styles.outline}>Details</button>
        <button className={styles.fill}>Add</button>
      </div>
    </div>
  );
};

export default MovieCard;
