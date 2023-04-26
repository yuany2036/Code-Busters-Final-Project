import React from 'react';
import styles from '../card/Card.module.scss';
import CardButton from './CardButton';

const BookCard = ({ authors, title, thumbnail }) => {
  return (
    <div className={styles.card}>
      <img className={styles.card_poster} src={thumbnail} alt={title} />
      <div className={styles.card_details}>
        <h2 className={styles.card_title}>{title}</h2>
        <p className={styles.author_p}>by {authors.join(', ')}</p>
      </div>

    <CardButton/>
    </div>
  );
};

export default BookCard;
