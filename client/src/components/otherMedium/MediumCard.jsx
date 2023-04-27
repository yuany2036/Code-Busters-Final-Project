import React from 'react';
import styles from './MediumCard.module.scss';

const MediumCard = ({ movie }) => {
  return (
    <div className={styles.card_container}>
      <img
        src={`https://image.tmdb.org/t/p/w185/${movie.poster_path}`}
        alt={movie.title}
      />

      <h4 className={styles.card_container_title}>{movie.title}</h4>
    </div>
  );
};

export default MediumCard;
