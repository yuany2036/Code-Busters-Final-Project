import React from 'react';
import styles from '../card/Card.module.scss';
import CardButton from './CardButton';

const TvShowCard = ({ title, posterPath }) => {
  const posterUrl = `https://image.tmdb.org/t/p/w500${posterPath}`;

  return (
    <div className={styles.card}>
      <img className={styles.card_poster} src={posterUrl} alt={title} />
      <div className={styles.card_details}>
        <h2 className={styles.card_title}>{title}</h2>
      </div>
      <CardButton />
    </div>
  );
};

export default TvShowCard;
