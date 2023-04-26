import React from 'react';
import styles from '../card/Card.module.scss';
import { Icon } from '@iconify/react';


const MovieCard = ({ title, posterPath }) => {
  const posterUrl = `https://image.tmdb.org/t/p/w500${posterPath}`;

  return (
    <div className={styles.card}>
      <img className={styles.card_poster} src={posterUrl} alt={title} />
      <div className={styles.card_details}>
        <h2 className={styles.card_title}>{title}</h2>
      </div>
      <div className={styles.btn}>
        <button className={styles.outline}>
          <Icon icon="gg:details-more" color="#401d56" />
        </button>
        <button className={styles.fill}>
          <Icon icon="material-symbols:heart-plus-outline" color="white" />{' '}
        </button>
      </div>
    </div>
  );
};

export default MovieCard;
