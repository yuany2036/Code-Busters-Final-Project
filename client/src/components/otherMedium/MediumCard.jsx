import React from 'react';
import styles from './MediumCard.module.scss';

const MediumCard = ({ movie, book }) => {
  const imageUrl = movie
    ? `https://image.tmdb.org/t/p/w185/${movie.poster_path}`
    : book.imageLinks?.thumbnail;

  const title = movie ? movie.title : book.title;

  return (
    <div className={styles.card_container}>
      <img src={imageUrl} alt={title} />
      <h4 className={styles.card_container_title}>{title}</h4>
    </div>
  );
};


export default MediumCard;
