import React from 'react';
import styles from '../card/Card.module.scss';
import { Icon } from '@iconify/react';

const BookCard = ({ authors, title, thumbnail }) => {
  return (
    <div className={styles.card}>
      <img className={styles.card_poster} src={thumbnail} alt={title} />
      <div className={styles.card_details}>
        <h2 className={styles.card_title}>{title}</h2>
        <p className={styles.author_p}>by {authors.join(', ')}</p>
        <div className={styles.btn}>
          <button className={styles.outline}>
            <Icon icon="gg:details-more" color="#401d56" />
          </button>
          <button className={styles.fill}>
            <Icon icon="material-symbols:heart-plus-outline" color="white" />{' '}
          </button>
        </div>
      </div>
    </div>
  );
};

export default BookCard;
